import type { FinalBrandSectionData } from "@/types/home";

interface FinalBrandSectionProps {
  section: FinalBrandSectionData;
}

export function FinalBrandSection({ section }: FinalBrandSectionProps) {
  return (
    <section className="bg-[#F7F2EE] px-4 py-7.5 text-[#63504A] sm:px-6 sm:py-9.5 lg:px-8 lg:py-10.5">
      <div className="mx-auto w-full max-w-[1100px]">
        <h2 className="w-full text-left font-manrope text-[68px] font-semibold uppercase leading-[0.9] tracking-[-0.03em] sm:text-[106px] lg:text-[179px] xl:text-[193px]">
          {section.title}
        </h2>
      </div>
    </section>
  );
}






