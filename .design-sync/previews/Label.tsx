import { Label, Input } from "jsyxi";

export const Default = () => (
  <div style={{ maxWidth: 320 }}>
    <Label htmlFor="email">Work email address</Label>
    <Input id="email" placeholder="you@company.com" />
  </div>
);
