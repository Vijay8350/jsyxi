import { Button } from "jsyxi";

export const Variants = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
    <Button variant="primary">Start free</Button>
    <Button variant="accent">Book a call</Button>
    <Button variant="secondary">Learn more</Button>
    <Button variant="ghost">Cancel</Button>
    <Button variant="danger">Delete</Button>
    <Button variant="outlineDanger">Remove</Button>
    <Button variant="link">View details</Button>
  </div>
);

export const Sizes = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
);

export const Disabled = () => (
  <div style={{ display: "flex", gap: 12 }}>
    <Button disabled>Disabled</Button>
    <Button variant="secondary" disabled>Disabled</Button>
  </div>
);
