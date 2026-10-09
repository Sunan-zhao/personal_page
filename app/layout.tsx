import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = buildMetadata(siteConfig);

// Safety net: if the page was somehow served over plain HTTP, jump to HTTPS.
const forceHttps = `if(location.protocol==='http:'&&location.hostname!=='localhost'&&location.hostname!=='127.0.0.1'){location.replace('https://'+location.host+location.pathname+location.search+location.hash)}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="min-h-screen bg-surface text-slate-100 antialiased">
        <Script
          id="force-https"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: forceHttps }}
        />
        {children}
      </body>
    </html>
  );
}
