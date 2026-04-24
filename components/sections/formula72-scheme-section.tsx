import Image from "next/image";
import type { Formula72SchemeSectionData } from "@/types/home";

type Formula72SchemeSectionProps = {
  section: Formula72SchemeSectionData;
};

const mobileLayout = [
  {
    imagePosition: "object-center",
    contentClass: "items-center pl-[45%] pr-6 pt-4 text-left",
    titleClass: "text-[2rem]",
    headingClass: "mt-7 text-[1.45rem]",
    textClass: "max-w-[12rem] text-[0.95rem]",
  },
  {
    imagePosition: "object-center",
    contentClass: "items-start justify-center pl-[18%] pr-[38%] text-right",
    titleClass: "",
    headingClass: "text-[1.45rem]",
    textClass: "max-w-[15rem] text-[0.95rem]",
  },
  {
    imagePosition: "object-center",
    contentClass: "items-start pl-[45%] pr-6 pt-[22%] text-left",
    titleClass: "",
    headingClass: "text-[1.45rem]",
    textClass: "max-w-[12rem] text-[0.95rem]",
  },
] as const;

export function Formula72SchemeSection({ section }: Formula72SchemeSectionProps) {
  return (
    <section id="formula72-scheme" className="relative w-full bg-[#F7F2EE]">
      <div className="md:hidden">
        <div className="relative left-1/2 flex w-screen -translate-x-1/2 flex-col">
          {section.items.map((item, index) => {
            const layout = mobileLayout[index] ?? mobileLayout[0];

            return (
              <article
                key={item.title}
                className="relative aspect-[1080/640] w-full overflow-hidden bg-[#E7DDD5]"
              >
                <Image
                  src={item.mobileImage}
                  alt={item.title}
                  fill
                  sizes="100vw"
                  loading="eager"
                  unoptimized
                  className={`${layout.imagePosition} object-cover`}
                />
                <div
                  className={`relative z-10 flex h-full flex-col text-[#63504A] ${layout.contentClass}`}
                >
                  {index === 0 ? (
                    <h2 className={`font-extrabold uppercase leading-none ${layout.titleClass}`}>
                      ФОРМУЛА72
                    </h2>
                  ) : null}
                  <div>
                    <h3 className={`font-extrabold uppercase leading-none ${layout.headingClass}`}>
                      {item.title}
                    </h3>
                    <p className={`mt-1 font-medium leading-[1.08] text-[#63504A]/90 ${layout.textClass}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="relative hidden aspect-[1920/1080] w-full overflow-hidden md:block">
        <div className="absolute inset-x-0 top-0 z-10 flex justify-center px-6 pt-8 sm:pt-10 lg:pt-12">
          <h2 className="text-center text-[clamp(5.5rem,10vw,11rem)] font-extrabold uppercase leading-none tracking-[-0.05em] text-[#63504A]">
            {section.title}
          </h2>
        </div>
        <Image
          src={section.image}
          alt={section.title || "Formula72 scheme"}
          fill
          sizes="100vw"
          loading="eager"
          unoptimized
          className="object-contain object-center"
        />
      </div>
    </section>
  );
}
