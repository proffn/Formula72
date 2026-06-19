import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { ClientErrorLogger } from "@/components/diagnostics/client-error-logger";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Формула72",
  icons: {
    icon: [
      { url: "/favicon.ico?v=5", type: "image/x-icon" },
      { url: "/favicon.png?v=5", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=5",
    apple: "/favicon.png?v=5",
  },
  description: "Контрактное производство и оптовая торговля Formula72.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru">
      <body className={manrope.variable}>
        <ClientErrorLogger />
        {children}
      </body>
    </html>
  );
}
