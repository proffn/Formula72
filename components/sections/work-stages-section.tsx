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
      className="bg-[#63504A] px-5 py-14 text-[#F7F2EE] sm:px-8 sm:py-16 lg:min-h-[100svh] lg:px-10 lg:py-16"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col lg:min-h-[calc(100svh-8rem)] lg:justify-center">
        <div className="max-w-3xl">
          <h2 className="text-[clamp(2rem,4vw,4.2rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.04em] text-[#F7F2EE]">
            {section.title}
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {section.stages.map((stage, index) => (
            <article
              key={`${stage.id}-${index}`}
              className="group grid min-h-[19rem] grid-rows-[8rem,1fr] rounded-[26px] border border-[rgba(255,255,255,0.04)] bg-[#63504A] p-5 shadow-[0_18px_34px_rgba(34,22,18,0.34)] transition duration-300 sm:min-h-[20rem] sm:grid-rows-[8.5rem,1fr] sm:p-6"
            >
              <div className="flex items-end justify-center">
                <div className="relative h-[7rem] w-full max-w-[10rem] sm:h-[7.5rem] sm:max-w-[10.5rem]">
                  <Image
                    src={stage.image}
                    alt={`Р­С‚Р°Рї ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    unoptimized={isRemoteAssetUrl(stage.image)}
                    className="object-contain object-center drop-shadow-[0_10px_24px_rgba(45,28,20,0.22)] transition duration-300 group-hover:translate-y-[-2px]"
                  />
                </div>
              </div>

              <div className="flex items-end justify-center">
                <p className="max-w-[16rem] text-center text-pretty text-[0.98rem] font-medium leading-[1.45] text-[rgba(247,242,238,0.9)] sm:text-[1rem]">
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

