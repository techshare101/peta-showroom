import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PETA Showroom | Universal Voice Layer",
  description: "Drop. Process. Transform. The frictionless audio intelligence layer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
