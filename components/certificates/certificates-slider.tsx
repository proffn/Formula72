"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import type { CertificateItemData } from "@/types/certificates";

type CertificatesSliderProps = {
  certificates: CertificateItemData[];
};

export function CertificatesSlider({ certificates }: CertificatesSliderProps) {
  const items = useMemo(
    () =>
      certificates
        .filter((item) => item.enabled && Boolean(item.image))
        .sort((left, right) => left.order - right.order),
    [certificates],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex] ?? items[0];
  const hasNavigation = items.length > 1;

  if (!active) {
    return null;
  }

  const goTo = (nextIndex: number) => {
    if (items.length <= 0) {
      return;
    }

    setActiveIndex((nextIndex + items.length) % items.length);
  };

  return (
    <section
      className="mx-auto w-full max-w-[1120px] px-4 pb-14 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8 lg:pb-20"
      tabIndex={0}
      aria-label="Слайдер сертификатов"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          goTo(activeIndex - 1);
        }

        if (event.key === "ArrowRight") {
          goTo(activeIndex + 1);
        }
      }}
    >
      <div>
        <div className="grid gap-5 lg:grid-cols-[4.8rem_minmax(0,1fr)_4.8rem] lg:items-center">
          {hasNavigation ? (
            <div className="order-2 flex justify-start lg:order-none lg:justify-center">
              <button
                type="button"
                aria-label="Предыдущий сертификат"
                onClick={() => goTo(activeIndex - 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#63504A]/16 bg-[#F7F2EE] text-[24px] leading-none text-[#63504A] shadow-[0_12px_28px_rgba(99,80,74,0.1)] transition duration-300 ease-out hover:-translate-y-[1px] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#63504A]/28"
              >
                <span aria-hidden="true">‹</span>
              </button>
            </div>
          ) : null}

          <div className="order-1 min-w-0 lg:order-none">
            <div className="relative mx-auto flex min-h-[440px] w-full items-center justify-center overflow-hidden sm:min-h-[620px] lg:min-h-[710px]">
              <Image
                key={active.id}
                src={active.image}
                alt={active.alt || active.title}
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 92vw, 760px"
                className="object-contain"
              />
            </div>
          </div>

          {hasNavigation ? (
            <div className="order-2 flex justify-end lg:order-none lg:justify-center">
              <button
                type="button"
                aria-label="Следующий сертификат"
                onClick={() => goTo(activeIndex + 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#63504A]/16 bg-[#F7F2EE] text-[24px] leading-none text-[#63504A] shadow-[0_12px_28px_rgba(99,80,74,0.1)] transition duration-300 ease-out hover:-translate-y-[1px] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#63504A]/28"
              >
                <span aria-hidden="true">›</span>
              </button>
            </div>
          ) : null}
        </div>

        {hasNavigation ? (
          <div className="mt-5 overflow-x-auto pb-2">
            <div className="flex min-w-max gap-3 px-1 sm:justify-center">
              {items.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Показать ${item.title}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => goTo(index)}
                    className={`relative h-[82px] w-[62px] shrink-0 overflow-hidden rounded-[10px] border bg-white transition duration-300 ease-out sm:h-[98px] sm:w-[74px] ${
                      isActive
                        ? "border-[#63504A] shadow-[0_12px_28px_rgba(99,80,74,0.18)]"
                        : "border-[#7C6259]/14 opacity-60 hover:-translate-y-[1px] hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      unoptimized
                      sizes="74px"
                      className="object-contain p-1.5"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
