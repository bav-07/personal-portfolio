import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bavaharsan Nagarajah | Software Engineer Portfolio",
  description:
    "Portfolio of Bavaharsan Nagarajah, a software engineer crafting modern web experiences with TypeScript, React, and cloud-native tooling.",
  keywords: [
    "Software Engineer",
    "Portfolio",
    "React",
    "TypeScript",
    "Next.js",
    "Frontend",
    "Product Engineer",
  ],
  authors: [{ name: "Bavaharsan Nagarajah" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
