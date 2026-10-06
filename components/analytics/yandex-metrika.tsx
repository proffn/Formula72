"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

type MetrikaFunction = {
  (...args: unknown[]): void;
  a?: unknown[][];
  l?: number;
};

declare global {
  interface Window {
    ym?: MetrikaFunction;
    __formula72Metrika?: Record<number, { lastUrl?: string }>;
  }
}

export function YandexMetrika({ counterId }: { counterId: number }) {
  const pathname = usePathname();
  const search = useSearchParams().toString();

  useEffect(() => {
    if (!pathname) return;

    if (!window.ym) {
      const queue: MetrikaFunction = (...args) => {
        (queue.a ??= []).push(args);
      };
      queue.l = Date.now();
      window.ym = queue;
    }

    const counters = (window.__formula72Metrika ??= {});
    if (!counters[counterId]) {
      counters[counterId] = {};
      window.ym(counterId, "init", {
        ssr: true,
        webvisor: true,
        clickmap: true,
        ecommerce: "dataLayer",
        accurateTrackBounce: true,
        trackLinks: true,
        referrer: document.referrer,
        url: window.location.href,
        // Explicit hits count both the initial visit and App Router transitions.
        defer: true,
      });
    }

    const state = counters[counterId];
    const url = new URL(pathname, window.location.origin);
    url.search = search;
    const nextUrl = url.href;
    if (state.lastUrl === nextUrl) return;

    window.ym(counterId, "hit", nextUrl, {
      referer: state.lastUrl ?? document.referrer,
    });
    state.lastUrl = nextUrl;
  }, [counterId, pathname, search]);

  return (
    <Script
      id={`yandex-metrika-${counterId}`}
      src={`https://mc.yandex.ru/metrika/tag.js?id=${counterId}`}
      strategy="afterInteractive"
    />
  );
}
