import type { Metadata } from "next";
import "./globals.css";
import CursorGlow from "@/components/common/cursor-glow";

export const metadata: Metadata = {
  title: "Bavaharsan Nagarajah | Software Engineer Portfolio",
  description:
    "Portfolio of Bavaharsan Nagarajah, a software engineer crafting modern web experiences with TypeScript, Next.js, React and cloud-native tooling.",
  keywords: [
    "Software Engineer",
    "Portfolio",
    "Next.js",
    "TypeScript",
    "React",
    "Frontend",
    "Frontend Engineer",
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
      <head>
        <noscript>
          <style>{`
            /* Ensure all content is visible when JavaScript is disabled */
            * { 
              opacity: 1 !important; 
              transform: none !important;
              animation: none !important;
              transition: none !important;
            }
            
            /* Remove custom cursor styles when JS is disabled */
            body.has-custom-cursor,
            body.has-custom-cursor button,
            body.has-custom-cursor a,
            body.has-custom-cursor input,
            body.has-custom-cursor textarea,
            body.has-custom-cursor select {
              cursor: auto !important;
            }
            
            /* Hide the custom cursor element when JS is disabled */
            [data-cursor-glow] { display: none !important; }
            
            /* Ensure Framer Motion elements are visible */
            [data-projection-id] {
              opacity: 1 !important;
              transform: none !important;
            }
          `}</style>
        </noscript>
      </head>
      <body className="antialiased font-sans" suppressHydrationWarning={true}>
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
