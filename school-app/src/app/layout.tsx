import type { Metadata } from "next";
import "flatpickr/dist/flatpickr.css";
import "./globals.css";

import { roboto } from "./fonts";

export const metadata: Metadata = {
  title: "School App",
  description: "School Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body className="relative bg-brandark-100">{children}</body>
    </html>
  );
}
