import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Minimi dashboard</title>
        <link rel="icon" href="/icons/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
