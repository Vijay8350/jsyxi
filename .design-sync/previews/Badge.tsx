import { Badge } from "jsyxi";

export const Tones = () => (
  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
    <Badge tone="brand">Brand</Badge>
    <Badge tone="green">Published</Badge>
    <Badge tone="amber">Draft</Badge>
    <Badge tone="red">Suspended</Badge>
    <Badge tone="slate">Default</Badge>
    <Badge tone="blue">Info</Badge>
  </div>
);
