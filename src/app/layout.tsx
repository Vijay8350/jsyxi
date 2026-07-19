import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "jsyxi — No-code widgets & an agency growth engine",
    template: "%s · jsyxi",
  },
  description:
    "Build, embed, and measure no-code widgets — reviews, forms, popups, countdowns and more — and turn visitors into leads.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
