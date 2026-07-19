// Shared Tool definition types (client-safe — no server imports).
// A Tool's `configSchema` (stored on E5) drives the generic builder form; renderers consume config.

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "color"
  | "select"
  | "toggle"
  | "url"
  | "tel"
  | "email"
  | "datetime"
  | "image"
  | "list";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  group: string; // tab key
  default: unknown;
  help?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  itemFields?: FieldDef[]; // for type: "list"
  addLabel?: string;
  min?: number;
  max?: number;
};

export type TabDef = { key: string; label: string };

export type ToolConfigSchema = { tabs: TabDef[]; fields: FieldDef[] };

export type TemplateDef = {
  name: string;
  useCase?: string;
  industry?: string;
  preset: Record<string, unknown>;
};

export type ToolDef = {
  key: string;
  name: string;
  categorySlug: string;
  badges: string[];
  description: string;
  isAi: boolean;
  schema: ToolConfigSchema;
  defaultConfig: Record<string, unknown>;
  templates: TemplateDef[];
};

/** Build a defaultConfig object from a schema's field defaults. */
export function defaultsFromSchema(schema: ToolConfigSchema): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of schema.fields) out[f.key] = f.default;
  return out;
}
