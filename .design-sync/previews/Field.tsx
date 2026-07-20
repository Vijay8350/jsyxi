import { Field, Input, Select } from "jsyxi";

export const WithHint = () => (
  <div style={{ maxWidth: 380 }}>
    <Field label="Work email" htmlFor="fe" hint="We'll never share it.">
      <Input id="fe" placeholder="you@company.com" />
    </Field>
  </div>
);

export const WithError = () => (
  <div style={{ maxWidth: 380 }}>
    <Field label="Workspace name" htmlFor="fw" error="This name is already taken.">
      <Input id="fw" defaultValue="acme" />
    </Field>
  </div>
);

export const WithSelect = () => (
  <div style={{ maxWidth: 380 }}>
    <Field label="Plan" htmlFor="fp" hint="You can change this anytime.">
      <Select id="fp" defaultValue="pro">
        <option value="free">Free</option>
        <option value="pro">Pro</option>
      </Select>
    </Field>
  </div>
);
