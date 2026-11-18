// A small subset of Node's util.inspect, so console.log output in the browser
// looks like the Node output the lesson examples were recorded with.
export function inspect(value: unknown, depth = 0, nested = false, seen = new Set<unknown>()): string {
  if (typeof value === 'string') return nested ? `'${value.replaceAll("'", "\\'")}'` : value;
  if (typeof value === 'number') return Object.is(value, -0) ? '-0' : String(value);
  if (typeof value === 'bigint') return `${value}n`;
  if (value === null || value === undefined || typeof value === 'boolean' || typeof value === 'symbol') return String(value);
  if (typeof value === 'function') {
    const src = Function.prototype.toString.call(value);
    return src.startsWith('class') ? `[class ${value.name || '(anonymous)'}]` : `[Function: ${value.name || '(anonymous)'}]`;
  }
  if (seen.has(value)) return '[Circular *1]';
  if (depth > 2) return Array.isArray(value) ? '[Array]' : '[Object]';
  seen.add(value);
  try {
    const inner = (v: unknown) => inspect(v, depth + 1, true, seen);
    if (Array.isArray(value)) return value.length ? `[ ${value.map(inner).join(', ')} ]` : '[]';
    if (value instanceof Map) return `Map(${value.size}) ${value.size ? `{ ${[...value].map(([k, v]) => `${inner(k)} => ${inner(v)}`).join(', ')} }` : '{}'}`;
    if (value instanceof Set) return `Set(${value.size}) ${value.size ? `{ ${[...value].map(inner).join(', ')} }` : '{}'}`;
    if (value instanceof Error) return value.stack ?? `${value.name}: ${value.message}`;
    const name = (value as object).constructor?.name;
    const entries = Object.entries(value as object).map(([k, v]) => `${/^[A-Za-z_$][\w$]*$/.test(k) ? k : `'${k}'`}: ${inner(v)}`);
    const prefix = name && name !== 'Object' ? `${name} ` : '';
    return entries.length ? `${prefix}{ ${entries.join(', ')} }` : `${prefix}{}`;
  } finally {
    seen.delete(value);
  }
}
