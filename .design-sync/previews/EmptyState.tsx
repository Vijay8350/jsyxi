import { EmptyState, Button } from "jsyxi";

export const Default = () => (
  <div style={{ maxWidth: 480, border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff" }}>
    <EmptyState
      icon={
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      }
      title="No widgets yet"
      description="Create your first widget to start collecting reviews and capturing leads."
      action={<Button>Create widget</Button>}
    />
  </div>
);

export const NoAction = () => (
  <div style={{ maxWidth: 480, border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff" }}>
    <EmptyState title="No results" description="Try a different search term." />
  </div>
);
