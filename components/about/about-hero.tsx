"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type { AboutPageData } from "@/types/about";

type AboutHeroProps = {
  page: AboutPageData;
};

const MAIN_LOGO_SRC = "/images/home/hero/logo1.png";

export function AboutHero({ page }: AboutHeroProps) {
  const [logoSrc, setLogoSrc] = useState(page.logo || MAIN_LOGO_SRC);

  useEffect(() => {
    setLogoSrc(page.logo || MAIN_LOGO_SRC);
  }, [page.logo]);

  return (
    <header className="mx-auto grid w-full max-w-[760px] grid-cols-[1fr_auto] items-start gap-4 px-4 pt-8 sm:px-6 lg:px-0 lg:pt-12">
      <Link href="/" aria-label="Formula72" className="relative block h-12 w-24 sm:h-14 sm:w-28">
        {logoSrc ? (
          <Image
            src={logoSrc}
            alt="Formula72"
            fill
            priority
            unoptimized
            className="object-contain object-left"
            onError={() => {
              if (logoSrc !== MAIN_LOGO_SRC) {
                setLogoSrc(MAIN_LOGO_SRC);
              }
            }}
          />
        ) : null}
      </Link>

      <Link
        href={page.backButtonHref || "/"}
        className="rounded-full border border-[#63504A]/16 bg-white/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[#63504A] shadow-[0_10px_24px_rgba(99,80,74,0.1)] transition duration-300 hover:-translate-y-[1px] hover:bg-white hover:shadow-[0_16px_30px_rgba(99,80,74,0.14)]"
      >
        {page.backButtonLabel}
      </Link>

      <div className="col-span-2 pt-8 text-center sm:pt-10">
        <h1 className="text-[clamp(2.35rem,8.4vw,4.8rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.055em] text-[#63504A]">
          {page.title}
        </h1>
        <p className="mt-4 text-[clamp(1rem,2.7vw,1.55rem)] font-light uppercase leading-tight tracking-[-0.03em] text-[#8A746D]">
          {page.subtitle}
        </p>
      </div>
    </header>
  );
}
