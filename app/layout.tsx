import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taylor Morgan | Software Engineer Portfolio",
  description:
    "Portfolio of Taylor Morgan, a software engineer crafting modern web experiences with TypeScript, React, and cloud-native tooling.",
  keywords: [
    "Software Engineer",
    "Portfolio",
    "React",
    "TypeScript",
    "Next.js",
    "Frontend",
    "Product Engineer",
  ],
  authors: [{ name: "Taylor Morgan" }],
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
