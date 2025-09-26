import type { Metadata } from "next";
import "./globals.css";
import CursorGlow from "@/components/common/cursor-glow";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';

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
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('portfolio-theme') || 
                    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
                  document.documentElement.setAttribute('data-theme', theme);
                  // Set global variable for React component to read synchronously
                  window.__PORTFOLIO_THEME__ = theme;
                } catch (e) {
                  // Fallback to dark if localStorage isn't available
                  document.documentElement.setAttribute('data-theme', 'dark');
                  window.__PORTFOLIO_THEME__ = 'dark';
                }
              })();
            `,
          }}
        />
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
            
            /* Hide the theme toggle when JS is disabled */
            .site-header__toggle { display: none !important; }
            
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
