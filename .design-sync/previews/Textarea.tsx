import { Textarea } from "jsyxi";

export const Default = () => (
  <div style={{ maxWidth: 380 }}>
    <Textarea placeholder="Tell us about your project…" />
  </div>
);

export const Filled = () => (
  <div style={{ maxWidth: 380 }}>
    <Textarea defaultValue={"We need a Shopify store with a reviews widget and a launch countdown timer."} />
  </div>
);
