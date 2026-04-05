import type { FinalBrandSectionData } from "@/types/home";
import { Container } from "@/components/ui/container";

interface FinalBrandSectionProps {
  section: FinalBrandSectionData;
}

export function FinalBrandSection({ section }: FinalBrandSectionProps) {
  return (
    <section className="bg-[#F7F2EE] py-10 text-[#63504A] sm:py-12 lg:py-14">
      <Container className="px-0 sm:px-0 lg:px-0 overflow-hidden">
        <h2 className="w-[calc(100%+0.045em)] -translate-x-[0.045em] text-left font-manrope text-[83px] font-semibold uppercase leading-[0.9] tracking-[-0.035em] sm:text-[129px] lg:text-[219px] xl:text-[235px]">
          {section.title}
        </h2>
      </Container>
    </section>
  );
}
