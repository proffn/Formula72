import Image from "next/image";
import type { WorkStagesSectionData } from "@/types/home";

type WorkStagesSectionProps = {
  section: WorkStagesSectionData;
};

export function WorkStagesSection({ section }: WorkStagesSectionProps) {
  return (
    <section
      id="work-stages"
      className="relative z-[1] bg-[#63504A] px-2.5 py-11 text-[#F7F2EE] sm:px-8 sm:py-13 lg:min-h-[100svh] lg:px-10 lg:py-13"
    >
      <div className="mx-auto flex max-w-[1100px] flex-col lg:min-h-[calc(100svh-6.5rem)] lg:justify-center">
        <div className="max-w-[820px]">
          <h2 className="text-[clamp(2rem,3.2vw,3.36rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.04em] text-[#F7F2EE]">
            {section.title}
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-3.5 lg:grid-cols-3 lg:gap-4">
          {section.stages.map((stage, index) => (
            <article
              key={`${stage.id}-${index}`}
              className="group relative grid min-h-[18.4rem] grid-rows-[9.7rem,1fr] overflow-hidden rounded-[18px] border border-[rgba(255,255,255,0.04)] bg-[#63504A] p-3 shadow-[0_14px_27px_rgba(34,22,18,0.34)] transition duration-300 sm:min-h-[16rem] sm:grid-rows-[6.8rem,1fr] sm:rounded-[21px] sm:p-5"
            >
              <span className="pointer-events-none absolute left-3.5 top-3.5 z-10 text-[1.75rem] font-extrabold leading-none tracking-normal text-[#F7F2EE] sm:left-5 sm:top-3.5 sm:text-[clamp(1.8rem,2.8vw,2.6rem)]">
                {stage.number}
              </span>

              <div className="flex items-center justify-center pt-8">
                <div className="relative h-[7.4rem] w-full max-w-[7.6rem] sm:h-[6rem] sm:max-w-[8.4rem]">
                  <Image
                    src={stage.image}
                    alt={`Этап ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    loading="eager"
                    unoptimized
                    className="object-contain object-center drop-shadow-[0_8px_18px_rgba(45,28,20,0.22)] transition duration-300 group-hover:translate-y-[-2px]"
                  />
                </div>
              </div>

              <div className="flex items-start justify-center px-0.5 pt-4">
                <p className="max-w-[10.4rem] text-center text-pretty text-[0.68rem] font-medium leading-[1.36] text-[rgba(247,242,238,0.9)] sm:max-w-[12.8rem] sm:text-[0.82rem] sm:leading-[1.38]">
                  {stage.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


