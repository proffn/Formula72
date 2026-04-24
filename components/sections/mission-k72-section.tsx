import type { MissionK72SectionData } from "@/types/home";

type MissionK72SectionProps = {
  section: MissionK72SectionData;
};

export function MissionK72Section({ section }: MissionK72SectionProps) {
  return (
    <section
      id="mission-k72"
      className="relative flex w-full bg-[#F7F2EE] px-4 py-5 text-[#4B2E22] sm:px-6 sm:py-6 lg:min-h-[100svh] lg:px-8 lg:py-5 xl:px-10"
    >
      <div className="mx-auto flex w-full max-w-[1520px] lg:min-h-[calc(100svh-2.5rem)] lg:items-center">
        <div className="grid w-full gap-3.5 lg:grid-cols-[416px_minmax(0,960px)] lg:grid-rows-[auto_auto] lg:gap-x-0 lg:gap-y-2.5">
          <div className="lg:col-start-2 lg:row-start-1 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-3">
            <h2 className="text-[clamp(2rem,4.2vw,3.9rem)] font-black leading-[0.88] tracking-[-0.06em]">
              {section.title}
            </h2>
            <p className="mt-2.5 max-w-[320px] text-[clamp(0.82rem,0.95vw,1.08rem)] font-extrabold uppercase leading-[1.04] tracking-[-0.03em] text-[#74635B] sm:mt-3 lg:mt-0 lg:justify-self-start lg:pb-1">
              {section.leadText}
            </p>
          </div>

          <div className="lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:pt-4">
            <div className="relative aspect-[0.6047] h-full min-h-[340px] overflow-hidden bg-[#EDE0D5] lg:h-[688px] lg:min-h-0 lg:w-[416px]">
              <img
                src={section.leftMainImage}
                alt={section.title}
                width={520}
                height={860}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="relative lg:col-start-2 lg:row-start-2 lg:self-end">
            {section.sideLabel ? (
              <span className="pointer-events-none absolute right-[-0.3rem] top-[-2.9rem] hidden origin-top-right rotate-90 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#C7B7AE] xl:block">
                {section.sideLabel}
              </span>
            ) : null}

            <div className="grid gap-3.5 md:grid-cols-3 md:gap-0 lg:grid-cols-[repeat(3,320px)]">
              {section.items.map((item, index) => (
                <article
                  key={`${item.title}-${index}`}
                  className="grid h-full grid-rows-[auto_minmax(0,1fr)] lg:w-[320px]"
                >
                  <div className="flex h-full flex-col justify-center border border-[rgba(75,46,34,0.12)] bg-[#F7F2EE] px-4 py-3.5 sm:px-5 md:min-h-[88px] md:px-3 lg:min-h-[76px] lg:px-3.5 lg:py-4">
                    <h3 className="text-[0.98rem] font-extrabold uppercase leading-none tracking-[-0.035em] text-[#4B2E22] lg:text-[1.05rem]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[0.82rem] font-medium leading-[1.16] text-[#74635B] lg:text-[0.84rem]">
                      {item.text}
                    </p>
                  </div>

                  <div className="relative min-h-[190px] border-x border-b border-[rgba(75,46,34,0.12)] bg-[#EADCCF] md:min-h-[220px] lg:h-[420px] lg:min-h-0 lg:w-[320px]">
                    <img
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={580}
                      loading="eager"
                      decoding="async"
                      className="absolute inset-0 h-full w-full"
                      style={{ objectFit: "cover" }}
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


