import Link from "next/link";

import type { LeadCtaSectionData } from "@/types/home";
import { Container } from "@/components/ui/container";

interface LeadCtaSectionProps {
  section: LeadCtaSectionData;
}

export function LeadCtaSection({ section }: LeadCtaSectionProps) {
  return (
    <section className="bg-[#F7F2EE] pt-9 pb-14 text-[#63504A] sm:pt-11 sm:pb-16 lg:pt-12 lg:pb-18">
      <Container className="px-0 sm:px-0 lg:px-0">
        <h2 className="max-w-[980px] text-left font-manrope text-[35px] font-semibold leading-[0.94] tracking-[-0.05em] sm:text-[48px] lg:text-[70px]">
          {section.title}
        </h2>
        <p className="mt-4 max-w-[920px] text-left text-[17px] leading-[1.35] text-[#7A6862] sm:text-[20px] lg:mt-5 lg:text-[25px] lg:leading-[1.32]">
          {section.description}
        </p>
        <Link
          href={section.buttonLink}
          className="mt-7 inline-flex min-h-12 items-center justify-center rounded-[10px] bg-[#8C6246] px-7 py-3 text-center font-manrope text-[13px] font-semibold uppercase tracking-[0.12em] text-[#F7F2EE] transition hover:bg-[#74513A] sm:min-h-14 sm:px-10 sm:text-[14px] lg:mt-8"
        >
          {section.buttonText}
        </Link>
      </Container>
    </section>
  );
}
