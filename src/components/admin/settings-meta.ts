// Editable S-* register surfaced in /admin/settings (§7). Mirrors DEFAULTS keys in
// src/lib/settings.ts (which is not modifiable, so the display list lives here).

export type SettingField = { key: string; label: string; hint?: string; later?: boolean };

export const SETTING_FIELDS: SettingField[] = [
  { key: "S-VIEW-DEDUP", label: "View dedup window", hint: "Minutes a repeat view is ignored" },
  { key: "S-CACHE", label: "Embed cache TTL", hint: "Minutes" },
  { key: "S-RECOVERY", label: "Soft-delete recovery", hint: "Days before purge" },
  { key: "S-RAW-RETENTION", label: "Raw event retention", hint: "Days" },
  { key: "S-TZ-DEFAULT", label: "Default timezone" },
  { key: "S-CURRENCY-DEFAULT", label: "Default currency" },
  { key: "S-GST-RATE", label: "GST rate", hint: "4-dp fraction, e.g. 0.1800" },
  { key: "S-FILE-IMG-MAX", label: "Max image size", hint: "Bytes" },
  { key: "S-FILE-DOC-MAX", label: "Max document size", hint: "Bytes" },
  { key: "S-FILE-DOC-COUNT", label: "Max documents", hint: "Count" },
  { key: "S-TEXT-NAME-MAX", label: "Max name length", hint: "Characters" },
  { key: "S-TEXT-LONG-MAX", label: "Max long-text length", hint: "Characters" },
  { key: "S-DUNNING", label: "Dunning window", hint: "Days", later: true },
  { key: "S-TICKET-REOPEN", label: "Ticket reopen window", hint: "Days", later: true },
];

export const SETTING_KEYS = SETTING_FIELDS.map((f) => f.key);
