import Image from "next/image";
import type { MissionK72SectionData } from "@/types/home";

type MissionK72SectionProps = {
  section: MissionK72SectionData;
};

export function MissionK72Section({ section }: MissionK72SectionProps) {
  return (
    <section
      id="mission-k72"
      className="relative flex w-full bg-[#F7F2EE] px-4 py-8 text-[#4B2E22] sm:px-6 sm:py-10 lg:min-h-[100svh] lg:px-8 lg:py-10 xl:px-10"
    >
      <div className="mx-auto flex w-full max-w-[1720px] lg:min-h-[calc(100svh-5rem)] lg:items-center">
        <div className="grid w-full gap-5 lg:grid-cols-[520px_minmax(0,1200px)] lg:grid-rows-[auto_auto] lg:gap-x-0 lg:gap-y-4">
          <div className="lg:col-start-2 lg:row-start-1 lg:grid lg:grid-cols-[1.12fr_0.88fr] lg:items-end lg:gap-4">
            <h2 className="text-[clamp(2.5rem,5.6vw,5.4rem)] font-black leading-[0.9] tracking-[-0.06em]">
              {section.title}
            </h2>
            <p className="max-w-[420px] text-[clamp(1rem,1.25vw,1.55rem)] font-extrabold uppercase leading-[1.06] tracking-[-0.03em] text-[#74635B] lg:justify-self-start lg:pb-2">
              {section.leadText}
            </p>
          </div>

          <div className="lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:pt-6">
            <div className="relative aspect-[0.6047] h-full min-h-[420px] overflow-hidden bg-[#EDE0D5] lg:h-[860px] lg:min-h-0 lg:w-[520px]">
              <Image
                src={section.leftMainImage}
                alt={section.title}
                fill
                sizes="(max-width: 1023px) 100vw, 520px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="relative lg:col-start-2 lg:row-start-2 lg:self-end">
            {section.sideLabel ? (
              <span className="pointer-events-none absolute right-[-0.4rem] top-[-4rem] hidden origin-top-right rotate-90 text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-[#C7B7AE] xl:block">
                {section.sideLabel}
              </span>
            ) : null}

            <div className="grid gap-5 md:grid-cols-3 md:gap-0 lg:grid-cols-[repeat(3,400px)]">
              {section.items.map((item, index) => (
                <article
                  key={`${item.title}-${index}`}
                  className="grid h-full grid-rows-[auto_minmax(0,1fr)] lg:w-[400px]"
                >
                  <div className="flex h-full flex-col justify-center border border-[rgba(75,46,34,0.12)] bg-[#F7F2EE] px-4 py-[1.2rem] sm:px-5 md:min-h-[116px] md:px-3 lg:min-h-[104px] lg:px-4 lg:py-[1.45rem]">
                    <h3 className="text-[1.26rem] font-extrabold uppercase leading-none tracking-[-0.035em] text-[#4B2E22] lg:text-[1.36rem]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[1.04rem] font-medium leading-[1.18] text-[#74635B] lg:text-[1.06rem]">
                      {item.text}
                    </p>
                  </div>

                  <div className="relative min-h-[220px] border-x border-b border-[rgba(75,46,34,0.12)] bg-[#EADCCF] md:min-h-[250px] lg:h-[580px] lg:min-h-0 lg:w-[400px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 33vw, 400px"
                      className="object-cover"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
