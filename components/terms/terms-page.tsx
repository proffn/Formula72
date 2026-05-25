import Image from "next/image";
import Link from "next/link";

import type { TermsPageData } from "@/types/terms";
import { TermsHero } from "./terms-hero";
import { TermsSectionCard } from "./terms-section-card";

type TermsPageProps = {
  page: TermsPageData;
  logoSrc?: string;
};

export function TermsPage({ page, logoSrc = "/images/home/hero/logo3.png" }: TermsPageProps) {
  const sections = page.sections
    .filter((section) => section.enabled)
    .sort((left, right) => left.order - right.order);

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F2EE] font-manrope text-[#63504A]">
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.88),transparent_70%)]" />
        <div className="pointer-events-none absolute left-[-14rem] top-36 h-[28rem] w-[28rem] rounded-full bg-white/56 blur-3xl" />
        <div className="pointer-events-none absolute right-[-16rem] top-[34rem] h-[30rem] w-[30rem] rounded-full bg-[#E8D8CF]/38 blur-3xl" />

        <div className="relative">
          <div className="mx-auto w-full max-w-[1120px] px-4 py-5 sm:px-6 lg:px-8">
            <header className="flex items-center justify-between gap-4">
              <Link
                href="/"
                aria-label="На главную"
                className="relative block h-[54px] w-[132px] transition duration-300 ease-out hover:-translate-y-[1px] hover:scale-[1.02]"
              >
                <Image
                  src={logoSrc}
                  alt="Formula72"
                  fill
                  priority
                  unoptimized
                  className="object-contain object-left"
                />
              </Link>
              <Link
                href="/"
                className="rounded-full border border-[#63504A]/14 bg-white/60 px-4 py-2 text-[12px] font-bold uppercase tracking-normal text-[#63504A] shadow-[0_12px_28px_rgba(99,80,74,0.1)] transition duration-300 ease-out hover:-translate-y-[1px] hover:bg-white hover:shadow-[0_16px_34px_rgba(99,80,74,0.14)]"
              >
                На главную
              </Link>
            </header>
          </div>
          <TermsHero title={page.title} />
          <div className="mx-auto flex w-full max-w-[1160px] flex-col gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
            {sections.map((section) => (
              <TermsSectionCard key={section.id} section={section} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
