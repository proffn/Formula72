import type { FinalBrandSectionData } from "@/types/home";

interface FinalBrandSectionProps {
  section: FinalBrandSectionData;
}

export function FinalBrandSection({ section }: FinalBrandSectionProps) {
  return (
    <section className="bg-[#F7F2EE] px-4 py-8 text-[#63504A] sm:px-6 sm:py-10 lg:px-8 lg:py-11">
      <div className="mx-auto w-full max-w-[1100px] overflow-hidden">
        <h2 className="w-[calc(100%+0.045em)] -translate-x-[0.045em] text-left font-manrope text-[71px] font-semibold uppercase leading-[0.9] tracking-[-0.035em] sm:text-[111px] lg:text-[189px] xl:text-[203px]">
          {section.title}
        </h2>
      </div>
    </section>
  );
}
