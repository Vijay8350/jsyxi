import { Alert } from "jsyxi";

export const Tones = () => (
  <div style={{ display: "grid", gap: 12, maxWidth: 460 }}>
    <Alert tone="info" title="Heads up">Your free trial ends in 3 days.</Alert>
    <Alert tone="success" title="Saved">Your changes are live on the site.</Alert>
    <Alert tone="warning" title="Approaching limit">You've used 90% of your monthly views.</Alert>
    <Alert tone="error" title="Payment failed">We couldn't process your card — please update it.</Alert>
  </div>
);

export const WithoutTitle = () => (
  <div style={{ maxWidth: 460 }}>
    <Alert tone="info">A plain informational message with no bold heading.</Alert>
  </div>
);
