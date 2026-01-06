import "./globals.css";

export const metadata = {
  title: "VMC Civic Issue Monitor",
  description: "AI Geo-Fenced Civic Monitoring System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">
        {children}
      </body>
    </html>
  );
}
