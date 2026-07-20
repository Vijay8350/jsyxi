import { SubmitButton } from "jsyxi";

export const Default = () => (
  <form>
    <SubmitButton>Save changes</SubmitButton>
  </form>
);

export const Secondary = () => (
  <form>
    <SubmitButton variant="secondary" pendingText="Saving…">Publish</SubmitButton>
  </form>
);
