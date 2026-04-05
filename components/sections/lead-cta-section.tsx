import Link from "next/link";

import type { LeadCtaSectionData } from "@/types/home";

interface LeadCtaSectionProps {
  section: LeadCtaSectionData;
}

export function LeadCtaSection({ section }: LeadCtaSectionProps) {
  return (
    <section className="bg-[#F7F2EE] px-4 pt-7 pb-11 text-[#63504A] sm:px-6 sm:pt-9 sm:pb-13 lg:px-8 lg:pt-10 lg:pb-14">
      <div className="mx-auto w-full max-w-[1100px]">
        <h2 className="max-w-[784px] text-left font-manrope text-[28px] font-semibold leading-[0.94] tracking-[-0.05em] sm:text-[38px] lg:text-[56px]">
          {section.title}
        </h2>
        <p className="mt-3 max-w-[736px] text-left text-[14px] leading-[1.34] text-[#7A6862] sm:text-[16px] lg:mt-4 lg:text-[20px] lg:leading-[1.3]">
          {section.description}
        </p>
        <Link
          href={section.buttonLink}
          className="mt-6 inline-flex min-h-10 items-center justify-center rounded-[8px] bg-[#8C6246] px-6 py-2.5 text-center font-manrope text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F7F2EE] transition hover:bg-[#74513A] sm:min-h-11 sm:px-8 sm:text-[12px] lg:mt-6"
        >
          {section.buttonText}
        </Link>
      </div>
    </section>
  );
}
