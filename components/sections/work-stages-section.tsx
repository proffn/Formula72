import Image from "next/image";
import { isRemoteAssetUrl } from "@/lib/api";
import type { WorkStagesSectionData } from "@/types/home";

type WorkStagesSectionProps = {
  section: WorkStagesSectionData;
};

export function WorkStagesSection({ section }: WorkStagesSectionProps) {
  return (
    <section
      id="work-stages"
      className="relative z-[1] bg-[#63504A] px-5 py-11 text-[#F7F2EE] sm:px-8 sm:py-13 lg:min-h-[100svh] lg:px-10 lg:py-13"
    >
      <div className="mx-auto flex max-w-[1100px] flex-col lg:min-h-[calc(100svh-6.5rem)] lg:justify-center">
        <div className="max-w-[820px]">
          <h2 className="text-[clamp(2rem,3.2vw,3.36rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.04em] text-[#F7F2EE]">
            {section.title}
          </h2>
        </div>

        <div className="mt-6 grid gap-3.5 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {section.stages.map((stage, index) => (
            <article
              key={`${stage.id}-${index}`}
              className="group grid min-h-[15.2rem] grid-rows-[6.4rem,1fr] rounded-[21px] border border-[rgba(255,255,255,0.04)] bg-[#63504A] p-4 shadow-[0_14px_27px_rgba(34,22,18,0.34)] transition duration-300 sm:min-h-[16rem] sm:grid-rows-[6.8rem,1fr] sm:p-5"
            >
              <div className="flex items-end justify-center">
                <div className="relative h-[5.6rem] w-full max-w-[8rem] sm:h-[6rem] sm:max-w-[8.4rem]">
                  <Image
                    src={stage.image}
                    alt={`Этап ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    unoptimized={isRemoteAssetUrl(stage.image)}
                    className="object-contain object-center drop-shadow-[0_8px_18px_rgba(45,28,20,0.22)] transition duration-300 group-hover:translate-y-[-2px]"
                  />
                </div>
              </div>

              <div className="flex items-end justify-center">
                <p className="max-w-[12.8rem] text-center text-pretty text-[0.8rem] font-medium leading-[1.38] text-[rgba(247,242,238,0.9)] sm:text-[0.82rem]">
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


