"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { ComparisonColumnData, ProsConsSectionData } from "@/types/home";

type ProsConsSectionProps = {
  section: ProsConsSectionData;
};

function formatSectionTitle(title: string) {
  return title
    .replace("Плюсы и минусы готовых ", "Плюсы и минусы готовых\n")
    .replace("рецептур и создание своего ", "рецептур и создание своего\n");
}

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
      className="relative bg-[#F7F2EE] px-5 py-8 text-[#63504A] sm:px-8 sm:py-9 lg:min-h-[100svh] lg:px-10 lg:py-7 xl:py-8"
    >
      <div className="mx-auto flex max-w-[1100px] flex-col lg:min-h-[calc(100svh-3.5rem)] lg:justify-center">
        <div className="max-w-[980px] pb-4 sm:pb-0">
          <h2 className="text-[clamp(2rem,2.85vw,3.22rem)] font-extrabold leading-[0.94] tracking-[-0.04em] sm:whitespace-pre-line">
            <span className="whitespace-pre-line sm:hidden">{`Плюсы и минусы
готовых рецептур
и создание своего
уникального продукта`}</span>
            <span className="hidden sm:inline">{formatSectionTitle(section.sectionTitle)}</span>
          </h2>
        </div>

        <div className="mt-5.5 grid gap-3.5 md:mt-6 md:grid-cols-2 md:gap-4.5 lg:mt-6 lg:gap-4.5 xl:mt-7">
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
      className={`rounded-[26px] border border-[rgba(99,80,74,0.1)] ${cardTone} p-4 shadow-[0_18px_50px_rgba(99,80,74,0.08)] backdrop-blur-[2px] sm:p-5 lg:flex lg:h-full lg:flex-col lg:p-[22px] xl:p-6`}
    >
      <h3 className="text-[clamp(1.28rem,1.66vw,1.88rem)] font-extrabold uppercase tracking-[-0.03em]">
        {column.title}
      </h3>

      <div ref={advantagesRef} className="mt-4.5 border-t border-[rgba(99,80,74,0.12)] pt-3.5">
        <SectionList title={column.advantagesTitle} items={column.advantages} marker="+" accent="positive" />
      </div>

      <div className="mt-6 border-t border-[rgba(99,80,74,0.12)] pt-3.5">
        <SectionList
          title={column.disadvantagesTitle}
          items={column.disadvantages}
          marker="-"
          accent="negative"
        />
      </div>

      {column.buttonText && column.buttonLink ? (
        <div className="mt-auto pt-7">
          <Link
            href={column.buttonLink}
            className="inline-flex min-h-10 w-full items-center justify-center rounded-[8px] bg-[#63504A] px-5 py-2.5 text-center font-manrope text-[0.72rem] font-bold uppercase tracking-[0.08em] text-[#F7F2EE] shadow-[0_10px_24px_rgba(69,53,47,0.14)] transition duration-300 ease-out hover:-translate-y-[1px] hover:scale-[1.02] hover:bg-[#52403a] hover:shadow-[0_16px_30px_rgba(69,53,47,0.2)] active:translate-y-0 active:scale-[0.99] focus-visible:bg-[#52403a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#63504A]/25 sm:text-[0.76rem]"
          >
            {column.buttonText}
          </Link>
        </div>
      ) : null}
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
      <h4 className="text-[0.94rem] font-bold leading-none tracking-[-0.02em] sm:text-[1rem]">{title}</h4>
      <ul className="mt-2.5 space-y-2.5 sm:space-y-2.5">
        {items.map((item, index) => (
          <li
            key={`${marker}-${index}-${item}`}
            className="grid grid-cols-[26px,1fr] items-start gap-2.5 sm:grid-cols-[30px,1fr] sm:gap-2.5"
          >
            <span
              aria-hidden="true"
              className={`inline-flex h-[22px] w-[22px] items-center justify-center rounded-full text-[0.76rem] font-semibold leading-none ${markerClass} sm:h-[26px] sm:w-[26px] sm:text-[0.82rem]`}
            >
              {marker}
            </span>
            <span className="text-[0.82rem] font-medium leading-[1.36] text-[#63504A] sm:text-pretty sm:text-[0.86rem] lg:text-[0.88rem]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}









