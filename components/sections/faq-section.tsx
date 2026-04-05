"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { FaqSectionData } from "@/types/home";

interface FaqSectionProps {
  section: FaqSectionData;
}

export function FaqSection({ section }: FaqSectionProps) {
  const activeCategories = useMemo(
    () => section.categories.filter((category) => category.items.some((item) => item.isActive)),
    [section.categories],
  );

  const orderedCategories = useMemo(() => {
    const next = [...activeCategories];

    if (next.length >= 3) {
      [next[1], next[2]] = [next[2], next[1]];
    }

    return next;
  }, [activeCategories]);

  const [openId, setOpenId] = useState<string | null>(() => {
    const firstCategory = orderedCategories[0];
    const firstItem = firstCategory?.items.find((item) => item.isActive);

    return firstItem ? `${firstCategory.id}-${firstItem.id}` : null;
  });

  return (
    <section className="bg-[#F7F2EE] px-4 pt-18 pb-18 text-[#63504A] sm:px-6 sm:pt-18 sm:pb-22 lg:px-8 lg:pt-22 lg:pb-24">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="border-b border-[#E6D9CF] pb-6 sm:pb-7 lg:pb-8">
          <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:gap-5">
            <div className="faq-heading-number flex-none self-start font-manrope text-[160px] font-medium leading-[0.78] tracking-[-0.08em] text-[#8C6246] sm:text-[187px] lg:w-[205px] lg:self-center lg:text-[216px]">
              {section.bigNumber}
            </div>

            <div className="faq-heading-copy min-w-0 flex-1 lg:max-w-[860px]">
              <h2 className="font-manrope text-[42px] font-semibold leading-[0.88] tracking-[-0.05em] sm:text-[52px] lg:text-[56px]">
                {section.title}
              </h2>
              <p className="mt-5 max-w-[820px] text-[18px] leading-[1.35] text-[#7A6862] sm:text-[19px] sm:leading-[1.4] lg:text-[21px] lg:leading-[1.32]">
                {section.description}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:mt-7 lg:grid-cols-2 lg:gap-5">
          {orderedCategories.slice(0, 2).map((category) => (
            <FaqCategoryCard
              key={category.id}
              category={category}
              openId={openId}
              onToggle={(id) => setOpenId((current) => (current === id ? null : id))}
            />
          ))}

          {orderedCategories[2] ? (
            <FaqCategoryCard
              category={orderedCategories[2]}
              openId={openId}
              onToggle={(id) => setOpenId((current) => (current === id ? null : id))}
            />
          ) : (
            <div className="hidden lg:block" />
          )}

          <div className="rounded-[18px] border border-[#E6D9CF] bg-[#FBF4ED] px-5 py-5 shadow-[0_14px_40px_rgba(99,80,74,0.06)] sm:px-6 sm:py-6">
            <div className="flex h-full flex-col items-start justify-between gap-5">
              <div className="space-y-2">
                <p className="font-manrope text-[24px] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[28px]">
                  {section.ctaTitle}
                </p>
                <p className="max-w-[30ch] text-sm leading-6 text-[#7A6862] sm:text-base sm:leading-7">
                  {section.ctaText}
                </p>
              </div>

              <Link
                href={section.ctaButtonLink}
                className="inline-flex items-center justify-center rounded-[10px] bg-[#8C6246] px-5 py-3 text-sm font-medium text-[#F7F2EE] transition hover:bg-[#74513A]"
              >
                {section.ctaButtonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FaqCategoryCardProps {
  category: FaqSectionData["categories"][number];
  openId: string | null;
  onToggle: (id: string) => void;
}

function FaqCategoryCard({ category, openId, onToggle }: FaqCategoryCardProps) {
  const activeItems = category.items.filter((item) => item.isActive);

  return (
    <div className="rounded-[18px] border border-[#E6D9CF] bg-[#FBF7F2] shadow-[0_14px_40px_rgba(99,80,74,0.05)]">
      <div className="border-b border-[#E8DDD4] px-5 py-3.5 sm:px-6">
        <h3 className="font-manrope text-base font-semibold leading-tight sm:text-[18px]">
          {category.title}
        </h3>
      </div>

      <div className="px-4 py-2 sm:px-5 sm:py-3">
        {activeItems.map((item) => {
          const itemId = `${category.id}-${item.id}`;
          const isOpen = openId === itemId;

          return (
            <div key={itemId} className="border-b border-[#EFE4DC] last:border-b-0">
              <button
                type="button"
                onClick={() => onToggle(itemId)}
                className="grid w-full grid-cols-[32px_minmax(0,1fr)_18px] items-start gap-3 py-3 text-left sm:grid-cols-[36px_minmax(0,1fr)_20px]"
                aria-expanded={isOpen}
              >
                <span className="pt-0.5 text-[13px] font-medium tracking-[0.08em] text-[#9A7D6D] sm:text-sm">
                  {item.number}
                </span>
                <span className="text-sm leading-6 text-[#63504A] sm:text-[15px] sm:leading-7">
                  {item.question}
                </span>
                <span
                  className={`pt-0.5 text-base leading-none text-[#8C6246] transition ${
                    isOpen ? "translate-x-1" : ""
                  }`}
                >
                  &rarr;
                </span>
              </button>

              <div
                className={`grid overflow-hidden transition-[grid-template-rows,opacity,padding-bottom] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] pb-3 opacity-100" : "grid-rows-[0fr] pb-0 opacity-0"
                }`}
              >
                <div className="min-h-0 pl-[44px] pr-6 sm:pl-[50px] sm:pr-8">
                  <p className="text-sm leading-6 text-[#7A6862] sm:text-[15px] sm:leading-7">
                    {item.answer ||
                      "Ответ уточняется. Нажмите на кнопку рядом, и мы подробно расскажем все детали по вашему запросу."}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
