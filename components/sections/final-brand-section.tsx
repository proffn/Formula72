import type { FinalBrandSectionData } from "@/types/home";

interface FinalBrandSectionProps {
  section: FinalBrandSectionData;
}

export function FinalBrandSection({ section }: FinalBrandSectionProps) {
  return (
    <section className="bg-[#F7F2EE] px-4 py-7.5 text-[#63504A] sm:px-6 sm:py-9.5 lg:px-8 lg:py-10.5">
      <div className="mx-auto w-full max-w-[1100px]">
        <h2 className="w-full text-left font-manrope text-[clamp(3.4rem,15.8vw,12.1rem)] font-semibold uppercase leading-[0.88] tracking-[-0.045em]">
          {section.title}
        </h2>
      </div>
    </section>
  );
}






