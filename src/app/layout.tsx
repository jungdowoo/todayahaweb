import type { Metadata } from "next";
import { AdSenseScript } from "@/components/AdSenseScript";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getAdsenseClientId } from "@/lib/adsense";
import { siteConfig, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - 생활 상식 퀴즈`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "ko_KR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClientId = getAdsenseClientId();

  return (
    <html lang="ko" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'system';
                  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        {adsenseClientId && (
          <AdSenseScript clientId={adsenseClientId} />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()).replace(/</g, "\\u003c") }}
        />
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
