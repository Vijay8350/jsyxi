import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const SITE_TITLE = "jsyxi — No-code widgets & an agency growth engine";
const SITE_DESCRIPTION =
  "Build, embed, and measure no-code widgets — reviews, forms, popups, countdowns and more — and turn visitors into leads.";

const metadataBase = new URL(SITE_URL);
const socialImage = new URL("/og.png", metadataBase);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: SITE_TITLE,
    template: "%s · jsyxi",
  },
  description: SITE_DESCRIPTION,
  applicationName: "jsyxi",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "jsyxi",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: socialImage,
        width: 1731,
        height: 909,
        alt: "jsyxi — turn more visits into moments that convert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [socialImage],
  },
  creator: "jsyxi",
  publisher: "jsyxi",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
