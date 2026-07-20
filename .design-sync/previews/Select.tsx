import { Select } from "jsyxi";

export const Default = () => (
  <div style={{ maxWidth: 320 }}>
    <Select defaultValue="pro">
      <option value="free">Free</option>
      <option value="starter">Starter</option>
      <option value="pro">Pro</option>
      <option value="agency">Agency</option>
    </Select>
  </div>
);

export const Disabled = () => (
  <div style={{ maxWidth: 320 }}>
    <Select defaultValue="free" disabled>
      <option value="free">Free</option>
    </Select>
  </div>
);
