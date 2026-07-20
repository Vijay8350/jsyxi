import { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter, Button, Badge } from "jsyxi";

export const Complete = () => (
  <div style={{ maxWidth: 420 }}>
    <Card>
      <CardHeader>
        <CardTitle>Pro plan</CardTitle>
        <CardDescription>Everything you need to grow your store.</CardDescription>
      </CardHeader>
      <CardBody>
        <p style={{ fontSize: 14, color: "#475569", margin: 0 }}>
          10 widgets · 100k monthly views · priority support and free installation.
        </p>
      </CardBody>
      <CardFooter>
        <Button size="sm">Upgrade</Button>
      </CardFooter>
    </Card>
  </div>
);

export const WithBadge = () => (
  <div style={{ maxWidth: 420 }}>
    <Card>
      <CardHeader>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <CardTitle>Homepage Countdown</CardTitle>
          <Badge tone="green">Published</Badge>
        </div>
      </CardHeader>
      <CardBody>
        <p style={{ fontSize: 14, color: "#475569", margin: 0 }}>520 views this period.</p>
      </CardBody>
    </Card>
  </div>
);

export const Simple = () => (
  <div style={{ maxWidth: 420 }}>
    <Card>
      <CardBody>A simple card with just a body — the base surface for grouping content.</CardBody>
    </Card>
  </div>
);
