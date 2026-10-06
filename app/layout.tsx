import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { YandexMetrika } from "@/components/analytics/yandex-metrika";
import { ClientErrorLogger } from "@/components/diagnostics/client-error-logger";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const configuredCounterId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
const metrikaId = configuredCounterId && /^\d+$/.test(configuredCounterId)
  ? Number(configuredCounterId)
  : 0;

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
        {Number.isSafeInteger(metrikaId) && metrikaId > 0 ? (
          <>
            <Suspense fallback={null}>
              <YandexMetrika counterId={metrikaId} />
            </Suspense>
            <noscript>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://mc.yandex.ru/watch/${metrikaId}`}
                  style={{ position: "absolute", left: "-9999px" }}
                  alt=""
                />
              </div>
            </noscript>
          </>
        ) : null}
      </body>
    </html>
  );
}
