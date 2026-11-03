export interface InvalidResultValue {
  tableName: string;
  rowLabel: string;
  columnName: string;
  value: string;
  reason: string;
}

const JSON_PATH_PATTERN = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\[\d+\]){2,}$/;

function invalidReason(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (trimmed === '[object Object]') return 'object rendered as [object Object]';

  const objectOrArray = (trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'));
  if (objectOrArray) {
    try {
      JSON.parse(trimmed);
      return 'serialized JSON object or array';
    } catch {
      return 'JSON-like object or array text';
    }
  }

  if (JSON_PATH_PATTERN.test(trimmed)) {
    return 'JSON property path rendered instead of a result value';
  }

  return undefined;
}

export function findInvalidResultValues(rows: Record<string, string>[]): InvalidResultValue[] {
  return rows.flatMap((row) => {
    const value = String(row.Value ?? '');
    const reason = invalidReason(value);
    if (!reason) return [];
    return [{
      tableName: String(row.TableName ?? ''),
      rowLabel: String(row.RowLabel ?? ''),
      columnName: String(row.ColumnName ?? ''),
      value,
      reason,
    }];
  });
}