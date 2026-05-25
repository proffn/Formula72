import Image from "next/image";
import Link from "next/link";

import type { CertificatesPageData } from "@/types/certificates";
import { CertificatesIntro } from "./certificates-intro";
import { CertificatesSlider } from "./certificates-slider";

type CertificatesPageProps = {
  page: CertificatesPageData;
  logoSrc?: string;
};

export function CertificatesPage({
  page,
  logoSrc = "/images/home/hero/logo3.png",
}: CertificatesPageProps) {
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

          <CertificatesIntro
            title={page.title}
            description={page.description}
            buttonLabel={page.buttonLabel}
            buttonHref={page.buttonHref}
          />
          <CertificatesSlider certificates={page.certificates} />
        </div>
      </div>
    </main>
  );
}
