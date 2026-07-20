import { StatTile } from "jsyxi";

export const Grid = () => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 700 }}>
    <StatTile label="Total views" value="12,480" hint="+18% vs last month" tone="brand" />
    <StatTile label="Active widgets" value="7" tone="green" />
    <StatTile label="Open leads" value="23" hint="4 new today" tone="amber" />
  </div>
);

export const Single = () => (
  <div style={{ maxWidth: 240 }}>
    <StatTile label="Monthly revenue" value="₹1,49,900" hint="paid plan" tone="slate" />
  </div>
);
