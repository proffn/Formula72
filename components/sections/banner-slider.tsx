"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { isRemoteAssetUrl } from "@/lib/api";
import type { BannerItem } from "@/types/home";

type BannerSliderProps = {
  banners: BannerItem[];
};

export function BannerSlider({ banners }: BannerSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = banners.length;

  useEffect(() => {
    if (total <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [total]);

  const goTo = (index: number) => {
    setActiveIndex((index + total) % total);
  };

  const getBannerLayoutClasses = (textPosition: BannerItem["textPosition"]) => {
    if (textPosition === "left-top") {
      return {
        container:
          "items-start justify-start px-6 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10 lg:px-[42px] lg:py-[30px] min-[1920px]:px-[59px] min-[1920px]:py-[42px]",
        content:
          "max-w-[17rem] sm:max-w-[22rem] md:max-w-[28rem] lg:max-w-[700px] min-[1920px]:max-w-[980px]",
        title:
          "whitespace-pre-line lg:whitespace-pre text-[clamp(2.275rem,4.33875vw,5.213rem)] font-bold leading-[0.9] lg:text-[82.9px] min-[1920px]:text-[116.7px]",
        subtitle:
          "mt-0 whitespace-pre-line lg:whitespace-pre text-[clamp(0.641rem,1.714vw,2.94rem)] font-medium leading-[1.02] lg:mt-[24px] lg:text-[46.8px] min-[1920px]:mt-[34px] min-[1920px]:text-[66px]",
      };
    }

    return {
      container:
        "items-center justify-end px-6 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10 lg:px-[123px] lg:py-[34px] min-[1920px]:px-[173px] min-[1920px]:py-[48px]",
      content:
        "max-w-[15rem] sm:max-w-[21rem] md:max-w-[26rem] lg:max-w-[473px] min-[1920px]:max-w-[691px]",
      title:
        "text-[clamp(2.25rem,4.4vw,5.4375rem)] font-bold leading-[0.9] lg:text-[87px] min-[1920px]:text-[122px]",
      subtitle:
        "mt-7 whitespace-pre-line lg:whitespace-pre text-[clamp(1rem,2vw,2.5625rem)] font-medium uppercase leading-[1.04] lg:mt-[45px] lg:text-[41px] min-[1920px]:mt-[63px] min-[1920px]:text-[58px]",
    };
  };

  return (
    <section id="banners" className="relative w-full">
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="relative aspect-[1366/768] w-full flex-none">
              {(() => {
                const layout = getBannerLayoutClasses(banner.textPosition);

                return (
                  <>
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                sizes="100vw"
                unoptimized={isRemoteAssetUrl(banner.image)}
                className="object-contain object-center"
              />
              <div
                className={`absolute inset-0 ${
                  banner.textColor === "light"
                    ? "bg-[linear-gradient(90deg,rgba(43,24,18,0.18)_0%,rgba(43,24,18,0.08)_42%,rgba(43,24,18,0.1)_100%)]"
                    : "bg-[linear-gradient(90deg,rgba(255,247,238,0.08)_0%,rgba(255,247,238,0.04)_100%)]"
                }`}
              />

              <div
                className={`absolute inset-0 flex ${layout.container}`}
              >
                <div
                  className={`${layout.content} text-left ${
                    banner.textColor === "light" ? "text-white" : "text-[#63504A]"
                  }`}
                >
                  <h3
                    className={`uppercase tracking-[-0.03em] ${layout.title}`}
                  >
                    {banner.title}
                  </h3>
                  {banner.subtitle ? (
                    <p
                      className={`tracking-[-0.02em] ${layout.subtitle}`}
                    >
                      {banner.subtitle}
                    </p>
                  ) : null}
                </div>
              </div>
                  </>
                );
              })()}
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 sm:px-5 lg:px-7">
          <SliderArrow direction="prev" onClick={() => goTo(activeIndex - 1)} />
          <SliderArrow direction="next" onClick={() => goTo(activeIndex + 1)} />
        </div>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center justify-center gap-2 rounded-full bg-[rgba(247,242,238,0.35)] px-3 py-2 backdrop-blur-sm sm:bottom-6">
          {Array.from({ length: total }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Перейти к слайду ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 ${
                index === activeIndex ? "w-8 bg-foreground" : "w-2 bg-foreground/35 hover:bg-foreground/55"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type SliderArrowProps = {
  direction: "prev" | "next";
  onClick: () => void;
};

function SliderArrow({ direction, onClick }: SliderArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Предыдущий слайд" : "Следующий слайд"}
      className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(247,242,238,0.72)] text-foreground shadow-soft transition duration-300 hover:bg-[rgba(247,242,238,0.9)] focus-visible:bg-[rgba(247,242,238,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25 sm:h-12 sm:w-12"
    >
      <span aria-hidden="true" className="text-lg leading-none">
        {direction === "prev" ? "←" : "→"}
      </span>
    </button>
  );
}
