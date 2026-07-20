/**
 * feature.config.json schema (§5.6). Decouples baselines from UI grid headers
 * via columnMap and holds the simulation polling contract.
 */
import { z } from 'zod';

export const SimulationConfigSchema = z.object({
  pollObject: z.string().min(1),
  successText: z.string().min(1),
  failureText: z.string().min(1),
  pollIntervalMs: z.number().int().positive(),
  maxWaitMs: z.number().int().positive(),
});

export const ResultsExtractionSchema = z.object({
  mode: z.enum(['domTable', 'download']),
  domTableObject: z.string().optional().default(''),
  downloadTrigger: z.string().optional().default(''),
  outputFileName: z.string().min(1),
  columnMap: z.record(z.string(), z.string()),
  sortBy: z.array(z.string()).default([]),
});

export const FeatureConfigSchema = z.object({
  feature: z.string().min(1),
  module: z.string().min(1),
  serial: z.boolean().default(false),
  reuseAuthState: z.boolean().default(true),
  testdata: z.object({
    format: z.literal('csv'),
    files: z.record(z.string(), z.string()),
    joinKey: z.array(z.string()).default(['TC_ID', 'IterationID']),
  }),
  simulation: SimulationConfigSchema,
  resultsExtraction: ResultsExtractionSchema,
  cleanup: z
    .object({ deleteCreatedProjects: z.boolean().default(true) })
    .default({ deleteCreatedProjects: true }),
});

export type FeatureConfig = z.infer<typeof FeatureConfigSchema>;
export type SimulationConfig = z.infer<typeof SimulationConfigSchema>;
export type ResultsExtractionConfig = z.infer<typeof ResultsExtractionSchema>;
