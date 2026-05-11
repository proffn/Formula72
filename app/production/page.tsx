import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import {
  getHomePageData,
  getProductionVideoPage,
  mapProductionVideoPage,
} from "@/lib/queries";

export const metadata: Metadata = {
  title: "Производство | Formula72",
  description: "Видео о производстве Formula72.",
};

export const dynamic = "force-dynamic";

export default async function ProductionPage() {
  const [homeData, productionSection] = await Promise.all([
    getHomePageData(),
    getProductionVideoPage().catch(() => null),
  ]);
  const videoPage = mapProductionVideoPage(productionSection);
  const logoImage = homeData.siteHeader.logoImage || "/images/home/hero/logo1.png";

  return (
    <>
      <main className="min-h-screen overflow-hidden bg-[#F7F2EE] text-[#63504A]">
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.86),transparent_62%)]" />
          <div className="absolute left-[-14rem] top-20 h-[30rem] w-[30rem] rounded-full bg-[#E8D8CF]/40 blur-3xl" />
          <div className="absolute right-[-12rem] top-80 h-[28rem] w-[28rem] rounded-full bg-white/60 blur-3xl" />

          <div className="relative mx-auto w-full max-w-[1120px] px-4 py-5 sm:px-6 lg:px-8">
            <header className="flex items-center justify-between gap-4">
              <Link
                href="/"
                aria-label="На главную"
                className="relative block h-[54px] w-[132px] transition duration-300 ease-out hover:-translate-y-[1px] hover:scale-[1.02]"
              >
                <Image
                  src={logoImage}
                  alt="Formula72"
                  fill
                  priority
                  unoptimized
                  className="object-contain object-left"
                />
              </Link>
              <Link
                href="/"
                className="rounded-full border border-[#63504A]/14 bg-white/56 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.04em] text-[#63504A] shadow-[0_12px_28px_rgba(99,80,74,0.1)] transition duration-300 ease-out hover:-translate-y-[1px] hover:bg-white hover:shadow-[0_16px_34px_rgba(99,80,74,0.14)]"
              >
                На главную
              </Link>
            </header>

            <section className="pb-8 pt-14 sm:pb-10 sm:pt-[4.5rem] lg:pt-20">
              <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#8D7770]">
                Производство
              </p>
              <h1 className="mt-4 max-w-[980px] text-[clamp(2rem,4.6vw,4.2rem)] font-bold uppercase leading-[0.94] tracking-[-0.05em] text-[#63504A]">
                {videoPage.title}
              </h1>
              <p className="mt-5 max-w-[760px] text-[16px] leading-[1.65] text-[#6F5A54]/82 sm:text-[18px]">
                {videoPage.description}
              </p>
            </section>

            <section className="mb-14 rounded-[28px] border border-[#7C6259]/12 bg-white/76 p-3 shadow-[0_24px_70px_rgba(99,80,74,0.12)] backdrop-blur sm:p-4 lg:mb-[4.5rem]">
              <div className="overflow-hidden rounded-[22px] bg-[#352A26]">
                <video
                  src={videoPage.videoUrl}
                  poster={videoPage.posterImage}
                  controls
                  playsInline
                  preload="metadata"
                  className="aspect-video w-full bg-[#352A26] object-contain"
                >
                  Ваш браузер не поддерживает воспроизведение видео.
                </video>
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter section={homeData.footer} />
    </>
  );
}
