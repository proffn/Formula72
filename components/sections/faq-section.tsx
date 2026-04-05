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
    <section className="bg-[#F7F2EE] px-4 pt-14 pb-14 text-[#63504A] sm:px-6 sm:pt-14 sm:pb-18 lg:px-8 lg:pt-18 lg:pb-19">
      <div className="mx-auto w-full max-w-[1100px]">
        <div className="border-b border-[#E6D9CF] pb-5 sm:pb-6 lg:pb-6">
          <div className="flex flex-col gap-3 sm:gap-3 lg:flex-row lg:items-center lg:gap-4">
            <div className="faq-heading-number flex-none self-start font-manrope text-[128px] font-medium leading-[0.78] tracking-[-0.08em] text-[#8C6246] sm:text-[150px] lg:w-[164px] lg:self-center lg:text-[172px]">
              {section.bigNumber}
            </div>

            <div className="faq-heading-copy min-w-0 flex-1 lg:max-w-[688px]">
              <h2 className="font-manrope text-[34px] font-semibold leading-[0.88] tracking-[-0.05em] sm:text-[42px] lg:text-[45px]">
                {section.title}
              </h2>
              <p className="mt-4 max-w-[656px] text-[15px] leading-[1.34] text-[#7A6862] sm:text-[15px] sm:leading-[1.36] lg:text-[17px] lg:leading-[1.3]">
                {section.description}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3.5 lg:mt-6 lg:grid-cols-2 lg:gap-4">
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

          <div className="rounded-[15px] border border-[#E6D9CF] bg-[#FBF4ED] px-4 py-4 shadow-[0_12px_32px_rgba(99,80,74,0.06)] sm:px-5 sm:py-5">
            <div className="flex h-full flex-col items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="font-manrope text-[19px] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[22px]">
                  {section.ctaTitle}
                </p>
                <p className="max-w-[28ch] text-[13px] leading-5 text-[#7A6862] sm:text-[14px] sm:leading-6">
                  {section.ctaText}
                </p>
              </div>

              <Link
                href={section.ctaButtonLink}
                className="inline-flex items-center justify-center rounded-[9px] bg-[#8C6246] px-4 py-2.5 text-[13px] font-medium text-[#F7F2EE] transition hover:bg-[#74513A]"
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
    <div className="rounded-[15px] border border-[#E6D9CF] bg-[#FBF7F2] shadow-[0_12px_32px_rgba(99,80,74,0.05)]">
      <div className="border-b border-[#E8DDD4] px-4 py-3 sm:px-5">
        <h3 className="font-manrope text-[15px] font-semibold leading-tight sm:text-[16px]">
          {category.title}
        </h3>
      </div>

      <div className="px-3.5 py-1.5 sm:px-4.5 sm:py-2.5">
        {activeItems.map((item) => {
          const itemId = `${category.id}-${item.id}`;
          const isOpen = openId === itemId;

          return (
            <div key={itemId} className="border-b border-[#EFE4DC] last:border-b-0">
              <button
                type="button"
                onClick={() => onToggle(itemId)}
                className="grid w-full grid-cols-[28px_minmax(0,1fr)_16px] items-start gap-2.5 py-2.5 text-left sm:grid-cols-[32px_minmax(0,1fr)_18px]"
                aria-expanded={isOpen}
              >
                <span className="pt-0.5 text-[11px] font-medium tracking-[0.08em] text-[#9A7D6D] sm:text-[12px]">
                  {item.number}
                </span>
                <span className="text-[13px] leading-5 text-[#63504A] sm:text-[14px] sm:leading-6">
                  {item.question}
                </span>
                <span
                  className={`pt-0.5 text-[15px] leading-none text-[#8C6246] transition ${
                    isOpen ? "translate-x-1" : ""
                  }`}
                >
                  &rarr;
                </span>
              </button>

              <div
                className={`grid overflow-hidden transition-[grid-template-rows,opacity,padding-bottom] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] pb-2.5 opacity-100" : "grid-rows-[0fr] pb-0 opacity-0"
                }`}
              >
                <div className="min-h-0 pl-[38px] pr-5 sm:pl-[44px] sm:pr-6">
                  <p className="text-[13px] leading-5 text-[#7A6862] sm:text-[14px] sm:leading-6">
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
