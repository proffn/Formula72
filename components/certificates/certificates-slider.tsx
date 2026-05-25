"use client";

import Image from "next/image";
import type { PointerEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const swipeStartX = useRef<number | null>(null);
  const swipeStartY = useRef<number | null>(null);
  const didSwipe = useRef(false);
  const goTo = useCallback(
    (nextIndex: number) => {
      if (items.length <= 0) {
        return;
      }

      setActiveIndex((nextIndex + items.length) % items.length);
    },
    [items.length],
  );
  const active = items[activeIndex] ?? items[0];
  const hasNavigation = items.length > 1;
  const swipeProps = {
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      if (!hasNavigation || event.pointerType !== "touch") {
        return;
      }

      swipeStartX.current = event.clientX;
      swipeStartY.current = event.clientY;
      didSwipe.current = false;
    },
    onPointerCancel: () => {
      swipeStartX.current = null;
      swipeStartY.current = null;
    },
    onPointerUp: (event: PointerEvent<HTMLElement>) => {
      if (!hasNavigation || event.pointerType !== "touch") {
        return;
      }

      const startX = swipeStartX.current;
      const startY = swipeStartY.current;
      swipeStartX.current = null;
      swipeStartY.current = null;

      if (startX === null || startY === null) {
        return;
      }

      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;

      if (Math.abs(deltaX) < 42 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) {
        return;
      }

      didSwipe.current = true;
      goTo(deltaX > 0 ? activeIndex - 1 : activeIndex + 1);
    },
  };

  useEffect(() => {
    if (!isPreviewOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPreviewOpen(false);
      }

      if (event.key === "ArrowLeft") {
        goTo(activeIndex - 1);
      }

      if (event.key === "ArrowRight") {
        goTo(activeIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, goTo, isPreviewOpen]);

  if (!active) {
    return null;
  }

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
            <div className="hidden lg:order-none lg:flex lg:justify-center">
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
            <div className="relative mx-auto">
              {hasNavigation ? (
                <button
                  type="button"
                  aria-label="Предыдущий сертификат"
                  onClick={() => goTo(activeIndex - 1)}
                  className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#63504A]/16 bg-[#F7F2EE]/90 text-[22px] leading-none text-[#63504A] shadow-[0_12px_28px_rgba(99,80,74,0.1)] transition duration-300 ease-out hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#63504A]/28 lg:hidden"
                >
                  <span aria-hidden="true">‹</span>
                </button>
              ) : null}

              <button
                type="button"
                aria-label={`Открыть ${active.title} на весь экран`}
                onClick={(event) => {
                  if (didSwipe.current) {
                    event.preventDefault();
                    didSwipe.current = false;
                    return;
                  }

                  setIsPreviewOpen(true);
                }}
                className="relative mx-auto flex min-h-[440px] w-full touch-pan-y cursor-zoom-in items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#63504A]/28 sm:min-h-[620px] lg:min-h-[710px]"
                {...swipeProps}
              >
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
              </button>

              {hasNavigation ? (
                <button
                  type="button"
                  aria-label="Следующий сертификат"
                  onClick={() => goTo(activeIndex + 1)}
                  className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#63504A]/16 bg-[#F7F2EE]/90 text-[22px] leading-none text-[#63504A] shadow-[0_12px_28px_rgba(99,80,74,0.1)] transition duration-300 ease-out hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#63504A]/28 lg:hidden"
                >
                  <span aria-hidden="true">›</span>
                </button>
              ) : null}
            </div>
          </div>

          {hasNavigation ? (
            <div className="hidden lg:order-none lg:flex lg:justify-center">
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

      {isPreviewOpen ? (
        <div
          className="fixed inset-0 z-[100] flex min-h-screen flex-col bg-[#F7F2EE] px-4 py-4 text-[#63504A] sm:px-6 sm:py-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Предпросмотр ${active.title}`}
        >
          <div className="flex items-center justify-end">
            <button
              type="button"
              aria-label="Закрыть предпросмотр"
              onClick={() => setIsPreviewOpen(false)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#63504A]/16 bg-white/78 text-[28px] leading-none text-[#63504A] shadow-[0_12px_28px_rgba(99,80,74,0.12)] transition duration-300 ease-out hover:-translate-y-[1px] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#63504A]/28"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className="grid min-h-0 flex-1 gap-4 py-4 lg:mx-auto lg:w-full lg:max-w-[1160px] lg:grid-cols-[4.8rem_minmax(0,1fr)_4.8rem] lg:items-center">
            {hasNavigation ? (
              <div className="hidden lg:flex lg:justify-center">
                <button
                  type="button"
                  aria-label="Предыдущий сертификат"
                  onClick={() => goTo(activeIndex - 1)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[#63504A]/16 bg-white/78 text-[24px] leading-none text-[#63504A] shadow-[0_12px_28px_rgba(99,80,74,0.12)] transition duration-300 ease-out hover:-translate-y-[1px] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#63504A]/28"
                >
                  <span aria-hidden="true">‹</span>
                </button>
              </div>
            ) : null}

            <div className="order-1 min-h-0 min-w-0 lg:order-none">
              <div
                className="relative mx-auto h-full min-h-[65vh] w-full max-w-[920px] touch-pan-y sm:min-h-[74vh]"
                {...swipeProps}
              >
                <Image
                  key={`preview-${active.id}`}
                  src={active.image}
                  alt={active.alt || active.title}
                  fill
                  priority
                  unoptimized
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </div>

            {hasNavigation ? (
              <div className="hidden lg:flex lg:justify-center">
                <button
                  type="button"
                  aria-label="Следующий сертификат"
                  onClick={() => goTo(activeIndex + 1)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[#63504A]/16 bg-white/78 text-[24px] leading-none text-[#63504A] shadow-[0_12px_28px_rgba(99,80,74,0.12)] transition duration-300 ease-out hover:-translate-y-[1px] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#63504A]/28"
                >
                  <span aria-hidden="true">›</span>
                </button>
              </div>
            ) : null}
          </div>

          {hasNavigation ? (
            <div className="flex justify-center gap-4 pb-4">
              <button
                type="button"
                aria-label="Предыдущий сертификат"
                onClick={() => goTo(activeIndex - 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#63504A]/16 bg-white/78 text-[24px] leading-none text-[#63504A] shadow-[0_12px_28px_rgba(99,80,74,0.12)] transition duration-300 ease-out hover:-translate-y-[1px] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#63504A]/28 lg:hidden"
              >
                <span aria-hidden="true">‹</span>
              </button>
              <button
                type="button"
                aria-label="Следующий сертификат"
                onClick={() => goTo(activeIndex + 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#63504A]/16 bg-white/78 text-[24px] leading-none text-[#63504A] shadow-[0_12px_28px_rgba(99,80,74,0.12)] transition duration-300 ease-out hover:-translate-y-[1px] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#63504A]/28 lg:hidden"
              >
                <span aria-hidden="true">›</span>
              </button>
            </div>
          ) : null}

          {hasNavigation ? (
            <div className="overflow-x-auto pb-1">
              <div className="flex min-w-max gap-3 px-1 sm:justify-center">
                {items.map((item, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={`preview-thumb-${item.id}`}
                      type="button"
                      aria-label={`Показать ${item.title}`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => goTo(index)}
                      className={`relative h-[74px] w-[56px] shrink-0 overflow-hidden rounded-[10px] border bg-white transition duration-300 ease-out sm:h-[88px] sm:w-[66px] ${
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
                        sizes="66px"
                        className="object-contain p-1.5"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
