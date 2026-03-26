"use client";

import { useEffect, useRef } from "react";
import type { ComparisonColumnData, ProsConsSectionData } from "@/types/home";

type ProsConsSectionProps = {
  section: ProsConsSectionData;
};

export function ProsConsSection({ section }: ProsConsSectionProps) {
  const advantagesRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const syncAdvantagesHeight = () => {
      const isDesktop = window.innerWidth >= 1024;

      advantagesRefs.current.forEach((element) => {
        if (!element) {
          return;
        }

        element.style.minHeight = isDesktop ? "0px" : "";
      });

      if (!isDesktop) {
        return;
      }

      const maxHeight = advantagesRefs.current.reduce((currentMax, element) => {
        if (!element) {
          return currentMax;
        }

        return Math.max(currentMax, element.scrollHeight);
      }, 0);

      advantagesRefs.current.forEach((element) => {
        if (!element) {
          return;
        }

        element.style.minHeight = `${maxHeight}px`;
      });
    };

    syncAdvantagesHeight();

    const resizeObserver = new ResizeObserver(() => {
      syncAdvantagesHeight();
    });

    advantagesRefs.current.forEach((element) => {
      if (element) {
        resizeObserver.observe(element);
      }
    });

    window.addEventListener("resize", syncAdvantagesHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", syncAdvantagesHeight);
    };
  }, [section]);

  return (
    <section
      id="pros-cons"
      className="relative bg-[#F7F2EE] px-5 py-10 text-[#63504A] sm:px-8 sm:py-12 lg:min-h-[100svh] lg:px-10 lg:py-10 xl:py-12"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col lg:min-h-[calc(100svh-5rem)] lg:justify-center">
        <div className="max-w-4xl">
          <h2 className="text-balance text-[clamp(2rem,3.5vw,4rem)] font-extrabold leading-[0.94] tracking-[-0.04em]">
            {section.sectionTitle}
          </h2>
        </div>

        <div className="mt-7 grid gap-4 md:mt-8 md:grid-cols-2 md:gap-5 lg:mt-8 lg:gap-6 xl:mt-9">
          <ComparisonCard
            column={section.leftColumn}
            tone="warm"
            advantagesRef={(element) => {
              advantagesRefs.current[0] = element;
            }}
          />
          <ComparisonCard
            column={section.rightColumn}
            tone="light"
            advantagesRef={(element) => {
              advantagesRefs.current[1] = element;
            }}
          />
        </div>
      </div>
    </section>
  );
}

type ComparisonCardProps = {
  column: ComparisonColumnData;
  tone: "warm" | "light";
  advantagesRef?: (element: HTMLDivElement | null) => void;
};

function ComparisonCard({ column, tone, advantagesRef }: ComparisonCardProps) {
  const cardTone =
    tone === "warm"
      ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.44)_0%,rgba(255,255,255,0.22)_100%)]"
      : "bg-[linear-gradient(180deg,rgba(255,255,255,0.66)_0%,rgba(255,255,255,0.34)_100%)]";

  return (
    <article
      className={`rounded-[28px] border border-[rgba(99,80,74,0.1)] ${cardTone} p-5 shadow-[0_20px_60px_rgba(99,80,74,0.08)] backdrop-blur-[2px] sm:p-6 lg:flex lg:h-full lg:flex-col lg:p-7 xl:p-8`}
    >
      <h3 className="text-[clamp(1.6rem,2vw,2.35rem)] font-extrabold uppercase tracking-[-0.03em]">
        {column.title}
      </h3>

      <div ref={advantagesRef} className="mt-6 border-t border-[rgba(99,80,74,0.12)] pt-5">
        <SectionList title={column.advantagesTitle} items={column.advantages} marker="+" accent="positive" />
      </div>

      <div className="mt-6 border-t border-[rgba(99,80,74,0.12)] pt-5">
        <SectionList
          title={column.disadvantagesTitle}
          items={column.disadvantages}
          marker="-"
          accent="negative"
        />
      </div>
    </article>
  );
}

type SectionListProps = {
  title: string;
  items: string[];
  marker: "+" | "-";
  accent: "positive" | "negative";
};

function SectionList({ title, items, marker, accent }: SectionListProps) {
  const markerClass =
    accent === "positive"
      ? "bg-[rgba(99,80,74,0.08)] text-[#63504A]"
      : "bg-[rgba(99,80,74,0.06)] text-[#8B766D]";

  return (
    <div>
      <h4 className="text-[1.1rem] font-bold leading-none tracking-[-0.02em] sm:text-[1.2rem]">{title}</h4>
      <ul className="mt-4 space-y-3 sm:space-y-3.5">
        {items.map((item, index) => (
          <li
            key={`${marker}-${index}-${item}`}
            className="grid grid-cols-[32px,1fr] items-start gap-3 sm:grid-cols-[36px,1fr] sm:gap-3.5"
          >
            <span
              aria-hidden="true"
              className={`inline-flex h-[28px] w-[28px] items-center justify-center rounded-full text-[0.95rem] font-semibold leading-none ${markerClass} sm:h-[32px] sm:w-[32px]`}
            >
              {marker}
            </span>
            <span className="text-pretty text-[0.96rem] font-medium leading-[1.45] text-[#63504A] sm:text-[1rem] lg:text-[1.03rem]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
