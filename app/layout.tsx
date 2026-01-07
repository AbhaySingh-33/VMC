import "./globals.css";
import PWAInstaller from "@/components/PWAInstaller";
import { LanguageProvider } from "@/lib/language-context";

export const metadata = {
  title: "VMC CiviSense - Civic Issue Monitoring",
  description: "AI-Based Geo-Fenced Civic Issue Monitoring System for Vadodara Municipal Corporation",
  manifest: "/manifest.json",
  themeColor: "#10b981",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "VMC CiviSense"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10b981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="VMC CiviSense" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="bg-slate-900 text-white">
        <LanguageProvider>
          {children}
          <PWAInstaller />
        </LanguageProvider>
      </body>
    </html>
  );
}
