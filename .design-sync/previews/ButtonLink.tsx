import { ButtonLink } from "jsyxi";

export const Variants = () => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
    <ButtonLink href="#">Get started</ButtonLink>
    <ButtonLink href="#" variant="accent">Book a call</ButtonLink>
    <ButtonLink href="#" variant="secondary">Documentation</ButtonLink>
    <ButtonLink href="#" variant="ghost">Pricing</ButtonLink>
    <ButtonLink href="#" variant="link">Learn more</ButtonLink>
  </div>
);

export const Sizes = () => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
    <ButtonLink href="#" size="sm">Small</ButtonLink>
    <ButtonLink href="#" size="md">Medium</ButtonLink>
    <ButtonLink href="#" size="lg">Large</ButtonLink>
  </div>
);
