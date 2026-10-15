import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grand Velora Hotel",
  description:
    "Experience comfort, elegance, and exceptional hospitality at Grand Velora Hotel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}