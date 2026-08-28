import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/api/media/"],
      disallow: [
        "/admin/",
        "/app/",
        "/api/",
        "/e/",
        "/embed/",
        "/login",
        "/signup",
        "/forgot",
        "/reset",
        "/verify",
        "/2fa",
      ],
    },
    sitemap: "https://jsyxi.com/sitemap.xml",
    host: "https://jsyxi.com",
  };
}
