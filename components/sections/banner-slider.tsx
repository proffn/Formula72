"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import type {
  BannerContentAlign,
  BannerContentVerticalAlign,
  BannerSectionData,
  BannerSlideData,
} from "@/types/home";

type BannerSliderProps = {
  section: BannerSectionData;
};

export function BannerSlider({ section }: BannerSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const banners = useMemo(
    () =>
      (section.banners ?? [])
        .filter((banner) => banner.enabled)
        .sort((left, right) => {
          const leftOrder = left.order ?? Number.MAX_SAFE_INTEGER;
          const rightOrder = right.order ?? Number.MAX_SAFE_INTEGER;

          if (leftOrder !== rightOrder) {
            return leftOrder - rightOrder;
          }

          return left.title.localeCompare(right.title, "ru");
        }),
    [section.banners],
  );

  const total = banners.length;

  useEffect(() => {
    setActiveIndex(0);
  }, [total]);

  useEffect(() => {
    if (!section.enabled || total <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, section.autoplayDelay);

    return () => window.clearInterval(interval);
  }, [section.autoplayDelay, section.enabled, total]);

  if (!section.enabled || total === 0) {
    return null;
  }

  const goTo = (index: number) => {
    setActiveIndex((index + total) % total);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];

    if (!touch) {
      return;
    }

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];
    touchStartRef.current = null;

    if (!start || !touch) {
      return;
    }

    const diffX = touch.clientX - start.x;
    const diffY = touch.clientY - start.y;

    if (Math.abs(diffX) < 42 || Math.abs(diffX) < Math.abs(diffY) * 1.2) {
      return;
    }

    goTo(activeIndex + (diffX < 0 ? 1 : -1));
  };

  return (
    <section id="banners" className="relative left-1/2 w-screen -translate-x-1/2 sm:left-auto sm:w-full sm:translate-x-0">
      <div
        className="relative w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {banners.map((banner) => (
            <BannerSlide key={banner.id} banner={banner} />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-3 sm:flex sm:px-5 lg:px-7">
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
              className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#63504A]/25 ${
                index === activeIndex
                  ? "w-8 bg-[#63504A]"
                  : "w-2 bg-[#63504A]/35 hover:bg-[#63504A]/55"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BannerSlide({ banner }: { banner: BannerSlideData }) {
  const isFirstBanner = banner.id === "banner-1" || banner.order === 1;
  const isSecondBanner = banner.id === "banner-2" || banner.order === 2;
  const titleText =
    isSecondBanner && !banner.title.includes("\n")
      ? banner.title.replace(/\s+/, "\n")
      : banner.title;
  const containerAlign = getContainerAlignClasses(banner.contentVerticalAlign);
  const contentAlign = getContentAlignClasses(banner.contentAlign, isSecondBanner);
  const overlayClass =
    banner.textColor === "light"
      ? "bg-[linear-gradient(90deg,rgba(43,24,18,0.32)_0%,rgba(43,24,18,0.12)_44%,rgba(43,24,18,0.24)_100%)]"
      : "bg-[linear-gradient(90deg,rgba(255,247,238,0.12)_0%,rgba(255,247,238,0.04)_100%)]";
  const textColorClass = banner.textColor === "light" ? "text-[#F7F2EE]" : "text-[#63504A]";
  const mobileImage = banner.mobileImage || banner.image;

  return (
    <div
      className="relative h-[90vw] w-full flex-none sm:h-auto sm:aspect-[1366/768]"
    >
      <div className="absolute inset-0 overflow-hidden sm:hidden">
        <Image
          src={mobileImage}
          alt={banner.title}
          fill
          sizes="100vw"
          loading="eager"
          unoptimized
          className="object-cover object-center"
        />
      </div>
      <Image
        src={banner.image}
        alt={banner.title}
        fill
        sizes="100vw"
        loading="eager"
        unoptimized
        className="hidden object-cover object-center sm:block"
      />

      <div className={`absolute inset-0 ${overlayClass}`} />

      <div
        className={`absolute inset-0 flex ${
          isFirstBanner ? "px-6 pt-6 pb-7" : isSecondBanner ? "px-0 py-5" : "px-5 py-5"
        } ${
          isSecondBanner
            ? "sm:px-0 sm:py-8 md:px-0 md:py-10 lg:px-0 lg:py-[30px] min-[1920px]:px-0 min-[1920px]:py-[42px]"
            : "sm:px-8 sm:py-8 md:px-10 md:py-10 lg:px-[42px] lg:py-[30px] min-[1920px]:px-[59px] min-[1920px]:py-[42px]"
        } ${containerAlign}`}
      >
        <div
          className={`${contentAlign} ${textColorClass} ${isFirstBanner ? "max-w-[13.75rem]" : ""} ${
            isSecondBanner ? "w-[46%] max-w-none pl-[1.32rem] pr-3 text-left sm:w-[46%] sm:max-w-none sm:pl-[1.98rem] sm:pr-4 md:pl-[2.64rem] md:pr-6 lg:pl-[3.3rem] lg:pr-8 2xl:pl-[5.28rem] 2xl:pr-10" : ""
          }`}
          style={!isSecondBanner ? { maxWidth: banner.textMaxWidth || undefined } : undefined}
        >
          <h3
              className={`whitespace-pre-line sm:whitespace-pre font-bold uppercase leading-[0.92] tracking-[-0.055em] sm:tracking-[-0.04em] ${
                isFirstBanner
                  ? "text-[1.63rem] sm:text-[clamp(2.54rem,4.97vw,5.88rem)]"
                  : "text-[1.62rem] sm:text-[clamp(2.54rem,4.97vw,5.88rem)]"
              }`}
          >
            {titleText}
          </h3>

          {banner.subtitle ? (
            <p
                className={`whitespace-pre-line sm:whitespace-pre font-medium uppercase leading-[1.1] tracking-[-0.02em] sm:mt-5 ${
                  isFirstBanner
                    ? "mt-2.5 text-[0.71rem] sm:text-[clamp(1.08rem,2.15vw,2.75rem)]"
                    : "mt-3 text-[0.75rem] sm:mt-12 sm:text-[clamp(1.2rem,2.4vw,3.06rem)]"
                }`}
            >
              {banner.subtitle}
            </p>
          ) : null}

          {banner.description ? (
            <p className="mt-3 whitespace-pre-line text-[0.86rem] leading-[1.35] text-current/88 sm:mt-4 sm:max-w-[32rem] sm:text-[1rem]">
              {banner.description}
            </p>
          ) : null}

          {banner.buttonLabel && banner.buttonHref ? (
            <Link
              href={banner.buttonHref}
              className={`mt-5 inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] transition duration-300 ease-out hover:-translate-y-[1px] hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] sm:mt-7 sm:min-h-12 sm:px-6 ${
                banner.textColor === "light"
                  ? "border-[#F7F2EE]/42 bg-[rgba(247,242,238,0.08)] text-[#F7F2EE] hover:bg-[rgba(247,242,238,0.16)]"
                  : "border-[#63504A]/22 bg-[rgba(247,242,238,0.54)] text-[#63504A] hover:bg-[rgba(247,242,238,0.82)]"
              }`}
            >
              {banner.buttonLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function getContainerAlignClasses(verticalAlign: BannerContentVerticalAlign) {
  if (verticalAlign === "top") {
    return "items-start";
  }

  if (verticalAlign === "bottom") {
    return "items-end";
  }

  return "items-center";
}

function getContentAlignClasses(contentAlign: BannerContentAlign, isSecondBanner = false) {
  if (isSecondBanner) {
    return "ml-auto flex h-full flex-col items-start justify-center text-left";
  }

  if (contentAlign === "center") {
    return "mx-auto flex w-full flex-col items-center text-center";
  }

  if (contentAlign === "right") {
    return "ml-auto flex w-full flex-col items-end text-right";
  }

  return "mr-auto flex w-full flex-col items-start text-left";
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
      className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(247,242,238,0.72)] text-[#63504A] shadow-[0_14px_30px_rgba(69,53,47,0.18)] transition duration-300 ease-out hover:-translate-y-[1px] hover:scale-[1.04] hover:bg-[rgba(247,242,238,0.9)] focus-visible:bg-[rgba(247,242,238,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#63504A]/25 sm:h-12 sm:w-12"
    >
      <span aria-hidden="true" className="text-lg leading-none">
        {direction === "prev" ? "←" : "→"}
      </span>
    </button>
  );
}
