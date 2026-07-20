// Sync-only shim: replaces next/link for the standalone bundle so ButtonLink/Logo
// render a plain <a> (no Next router context needed in Claude Design).
import * as React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Link({ href, children, prefetch, replace, scroll, shallow, passHref, legacyBehavior, locale, ...rest }: any) {
  const h = typeof href === "string" ? href : "#";
  return (
    <a href={h} {...rest}>
      {children}
    </a>
  );
}
