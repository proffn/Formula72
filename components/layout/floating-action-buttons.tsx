"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { FloatingContactData } from "@/types/home";

type FloatingActionButtonsProps = {
  section: FloatingContactData;
};

type FloatingItem = {
  id: string;
  label: string;
  href: string;
  kind: "telegram" | "person" | "vk" | "phone";
};

export function FloatingActionButtons({ section }: FloatingActionButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hideAtPageEnd, setHideAtPageEnd] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const items = useMemo<FloatingItem[]>(() => {
    const next: FloatingItem[] = [];

    if (section.telegramUrl?.trim()) {
      next.push({
        id: "telegram",
        label: section.telegramLabel,
        href: section.telegramUrl,
        kind: "telegram",
      });
    }

    if (section.maxUrl?.trim()) {
      next.push({
        id: "max",
        label: section.maxLabel,
        href: section.maxUrl,
        kind: "person",
      });
    }

    if (section.vkUrl?.trim()) {
      next.push({
        id: "vk",
        label: section.vkLabel,
        href: section.vkUrl,
        kind: "vk",
      });
    }

    if (section.phoneUrl?.trim()) {
      next.push({
        id: "phone",
        label: section.phoneLabel,
        href: section.phoneUrl,
        kind: "phone",
      });
    }

    return next;
  }, [
    section.maxLabel,
    section.maxUrl,
    section.phoneLabel,
    section.phoneUrl,
    section.telegramLabel,
    section.telegramUrl,
    section.vkLabel,
    section.vkUrl,
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 320);

      const viewportBottom = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const isMobile = window.innerWidth < 640;
      setHideAtPageEnd(isMobile && pageHeight - viewportBottom < 140);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown, { passive: true });
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shouldShowManagerButton = section.enabled && items.length > 0;
  const shouldShowTopButton = section.showScrollTop && showScrollTop;

  if ((!shouldShowManagerButton && !shouldShowTopButton) || hideAtPageEnd) {
    return null;
  }

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed right-4 bottom-4 z-30 flex flex-col items-end gap-3 sm:right-5 sm:bottom-5 lg:right-6 lg:bottom-6"
    >
      {shouldShowManagerButton ? (
        <div className="pointer-events-auto flex flex-col items-end gap-3">
          <div
            className={`w-[min(18rem,calc(100vw-2rem))] origin-bottom-right rounded-[22px] border border-[rgba(99,80,74,0.12)] bg-[rgba(247,242,238,0.96)] p-3.5 shadow-[0_18px_42px_rgba(69,53,47,0.18)] backdrop-blur-sm transition duration-200 sm:w-[17.5rem] ${
              isOpen
                ? "translate-y-0 scale-100 opacity-100"
                : "pointer-events-none translate-y-2 scale-[0.98] opacity-0"
            }`}
          >
            {section.buttonLabel ? (
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8A766F]">
                {section.buttonLabel}
              </p>
            ) : null}

            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-center gap-3 rounded-[16px] border border-[rgba(99,80,74,0.1)] bg-[#F7F2EE] px-3.5 py-3 text-[14px] font-medium leading-[1.2] text-[#63504A] transition hover:border-[rgba(99,80,74,0.18)] hover:bg-[#F2E9E2]"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#63504A] text-[#F7F2EE] shadow-[0_8px_18px_rgba(69,53,47,0.22)] transition group-hover:bg-[#4F403B] group-hover:shadow-[0_10px_22px_rgba(69,53,47,0.26)]">
                    {item.kind === "telegram" ? (
                      <TelegramGlyph />
                    ) : item.kind === "person" ? (
                      <PersonGlyph />
                    ) : item.kind === "vk" ? (
                      <VkGlyph />
                    ) : (
                      <PhoneGlyph />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            aria-label={section.buttonLabel || "Связь с менеджером"}
            aria-expanded={isOpen}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(247,242,238,0.12)] bg-[#63504A] text-[#F7F2EE] shadow-[0_20px_38px_rgba(69,53,47,0.28)] transition hover:bg-[#4F403B] hover:shadow-[0_22px_42px_rgba(69,53,47,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F2EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#63504A] sm:h-15 sm:w-15"
          >
            <MessageGlyph />
          </button>
        </div>
      ) : null}

      {shouldShowTopButton ? (
        <button
          type="button"
          onClick={handleScrollTop}
          aria-label="Наверх"
          className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(99,80,74,0.18)] bg-[rgba(247,242,238,0.96)] text-[#63504A] shadow-[0_18px_34px_rgba(69,53,47,0.2)] transition duration-200 hover:-translate-y-[1px] hover:border-[rgba(99,80,74,0.26)] hover:bg-[#F7F2EE] hover:shadow-[0_20px_38px_rgba(69,53,47,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#63504A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F2EE] sm:h-15 sm:w-15"
        >
          <ArrowUpGlyph />
        </button>
      ) : null}
    </div>
  );
}

function ArrowUpGlyph() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="drop-shadow-[0_1px_2px_rgba(99,80,74,0.22)]"
    >
      <path d="M12 19V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6 11L12 5L18 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MessageGlyph() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="drop-shadow-[0_1px_2px_rgba(247,242,238,0.18)]"
    >
      <path d="M6 18.5L6.9 15.4C5.67 14.22 5 12.67 5 10.9C5 7.09 8.13 4 12 4C15.87 4 19 7.09 19 10.9C19 14.71 15.87 17.8 12 17.8C10.79 17.8 9.65 17.49 8.66 16.95L6 18.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 10.75H15.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M8.5 13.35H13.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function TelegramGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="drop-shadow-[0_1px_2px_rgba(247,242,238,0.18)]"
    >
      <path d="M20.3 4.7L17.68 18.06C17.48 18.99 16.96 19.22 16.16 18.78L11.84 15.59L9.75 17.6C9.52 17.83 9.32 18.02 8.87 18.02L9.18 13.57L17.28 6.25C17.63 5.94 17.2 5.77 16.73 6.08L6.71 12.39L2.39 11.04C1.45 10.75 1.43 10.1 2.59 9.65L19.48 3.14C20.26 2.85 20.94 3.33 20.3 4.7Z" fill="currentColor" />
    </svg>
  );
}

function PersonGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="drop-shadow-[0_1px_2px_rgba(247,242,238,0.18)]"
    >
      <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill="currentColor" />
      <path d="M5.5 19.5C6.56 16.86 9.05 15 12 15C14.95 15 17.44 16.86 18.5 19.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function VkGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="drop-shadow-[0_1px_2px_rgba(247,242,238,0.18)]"
    >
      <path d="M4.67 7.73C4.82 14.92 8.42 19.25 14.72 19.25H15.08V15.13C17.39 15.35 19.13 17.03 19.83 19.25H23.08C22.19 16.02 19.85 14.24 18.39 13.55C19.85 12.7 21.9 10.62 22.39 7.73H19.43C18.79 10.07 16.91 12.15 15.08 12.35V7.73H12.12V15.82C10.27 15.36 7.94 13.12 7.84 7.73H4.67Z" fill="currentColor" />
    </svg>
  );
}

function PhoneGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="drop-shadow-[0_1px_2px_rgba(247,242,238,0.18)]"
    >
      <path d="M7.24 4.5H4.95C4.43 4.5 4 4.92 4 5.44C4 13.48 10.52 20 18.56 20C19.08 20 19.5 19.57 19.5 19.05V16.76C19.5 16.34 19.22 15.97 18.82 15.86L14.9 14.88C14.55 14.79 14.18 14.89 13.92 15.14L12.43 16.63C10.27 15.52 8.48 13.73 7.37 11.57L8.86 10.08C9.11 9.82 9.21 9.45 9.12 9.1L8.14 5.18C8.03 4.78 7.66 4.5 7.24 4.5Z" fill="currentColor" />
    </svg>
  );
}






