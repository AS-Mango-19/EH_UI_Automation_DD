/**
 * cleanup:orphans (§11) — sweep projects left behind by crashed runs. A crashed
 * run cannot reach its teardown, so created-but-never-deleted projects accumulate.
 *
 * We treat any project whose name carries our run-unique suffix convention
 * (contains "_<runId>" i.e. the auto-created naming) as sweepable, and delete via
 * the API. Discovery is app-specific, so the listing endpoint is an ASSUMPTION
 * you point at your real API.
 */
import type { CliFilters } from '../cli/args.js';
import { loadEnv } from '../../config/environments.js';
import { createApiContext } from './browser.js';
import { logger } from '../utils/logger.js';

// ASSUMPTION: GET /projects?owner=automation returns [{ id, name }]. Adjust to your API.
const LIST_PATH = '/projects?owner=automation';
const NAME_MARKER = /_\d{8}T\d{6}_[0-9a-f]{6}$/; // matches the ${runId} suffix shape

interface ApiProject {
  id: string | number;
  name: string;
}

export async function cleanupOrphansCommand(filters: CliFilters): Promise<number> {
  const env = loadEnv(filters.env || process.env.ENV || 'qa');
  const api = await createApiContext(env);
  try {
    const listUrl = `${env.apiBaseUrl.replace(/\/$/, '')}${LIST_PATH}`;
    const res = await api.fetch(listUrl, { method: 'GET' });
    if (!res.ok()) {
      logger.error(`cleanup:orphans — listing failed (${res.status()}). Point LIST_PATH at your real API.`);
      return 1;
    }
    const projects = (await res.json()) as ApiProject[];
    const orphans = projects.filter((p) => NAME_MARKER.test(String(p.name)));
    logger.info(`Found ${orphans.length} orphan project(s) of ${projects.length} listed.`);
    let deleted = 0;
    for (const p of orphans) {
      const delUrl = `${env.apiBaseUrl.replace(/\/$/, '')}/projects/${p.id}`;
      const del = await api.fetch(delUrl, { method: 'DELETE' });
      if (del.ok() || del.status() === 404) {
        deleted++;
        logger.info(`Deleted orphan project ${p.id} (${p.name}).`);
      } else {
        logger.warn(`Failed to delete project ${p.id}: ${del.status()}`);
      }
    }
    logger.info(`cleanup:orphans done — ${deleted}/${orphans.length} deleted.`);
    return 0;
  } catch (e) {
    logger.error(`cleanup:orphans error: ${(e as Error).message}`);
    return 1;
  } finally {
    await api.dispose();
  }
}
