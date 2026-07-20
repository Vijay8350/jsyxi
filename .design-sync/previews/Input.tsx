import { Input } from "jsyxi";

export const Default = () => (
  <div style={{ maxWidth: 320 }}>
    <Input placeholder="you@example.com" />
  </div>
);

export const Filled = () => (
  <div style={{ maxWidth: 320 }}>
    <Input defaultValue="Acme Agency" />
  </div>
);

export const Disabled = () => (
  <div style={{ maxWidth: 320 }}>
    <Input placeholder="Disabled input" disabled />
  </div>
);
