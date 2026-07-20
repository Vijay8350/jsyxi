import { Spinner, Button } from "jsyxi";

export const Sizes = () => (
  <div style={{ display: "flex", gap: 20, alignItems: "center", color: "#4f46e5" }}>
    <Spinner />
    <Spinner className="h-6 w-6" />
    <Spinner className="h-8 w-8" />
  </div>
);

export const InButton = () => (
  <Button disabled>
    <Spinner /> Saving…
  </Button>
);
