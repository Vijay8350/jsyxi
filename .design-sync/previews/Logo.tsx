import { Logo } from "jsyxi";

export const OnLight = () => (
  <div style={{ padding: 8 }}>
    <Logo />
  </div>
);

export const OnDark = () => (
  <div style={{ background: "#0f172a", padding: 24, borderRadius: 12, display: "inline-block" }}>
    <Logo light />
  </div>
);
