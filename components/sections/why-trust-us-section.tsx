import Image from "next/image";
import type { WhyTrustUsSectionData } from "@/types/home";

type WhyTrustUsSectionProps = {
  section: WhyTrustUsSectionData;
};

export function WhyTrustUsSection({ section }: WhyTrustUsSectionProps) {
  return (
    <section
      id="why-trust-us"
      className="bg-[#F7F2EE] px-5 py-11 text-[#63504A] sm:px-8 sm:py-13 lg:px-10 lg:py-16"
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="max-w-[860px]">
          <h2 className="text-[clamp(2rem,3.2vw,3.36rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.04em]">
            {section.title}
          </h2>
        </div>

        <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[minmax(0,0.9fr),minmax(0,1.1fr)] lg:items-stretch lg:gap-7">
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:h-full">
            {section.galleryItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="group relative aspect-[1/1.02] overflow-hidden rounded-[22px] bg-[rgba(255,255,255,0.7)] shadow-[0_14px_34px_rgba(99,80,74,0.12)] lg:aspect-auto lg:min-h-0"
              >
                <Image
                  src={item.image}
                  alt={`РџРѕС‡РµРјСѓ РґРѕРІРµСЂСЏСЋС‚ Formula72 ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1280px) 40vw, 25vw"
                  loading="eager"
                  unoptimized
                  className={`object-cover object-center transition duration-500 ${
                    item.hoverImage ? "opacity-100 group-hover:opacity-0" : ""
                  }`}
                />
                {item.hoverImage ? (
                  <Image
                    src={item.hoverImage}
                    alt={`РџРѕС‡РµРјСѓ РґРѕРІРµСЂСЏСЋС‚ Formula72 ${index + 1} hover`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1280px) 40vw, 25vw"
                    loading="eager"
                    unoptimized
                    className="object-cover object-center opacity-0 transition duration-500 group-hover:opacity-100"
                  />
                ) : null}
              </div>
            ))}
          </div>

          <div className="rounded-[24px] bg-[rgba(255,255,255,0.64)] px-5 py-5 shadow-[0_16px_42px_rgba(99,80,74,0.08)] sm:px-6 sm:py-6 lg:flex lg:h-full lg:flex-col lg:justify-center">
            <div className="space-y-5 text-[0.86rem] font-medium leading-[1.42] text-[rgba(99,80,74,0.9)] sm:text-[0.92rem]">
              <section className="border-b border-[rgba(99,80,74,0.12)] pb-4">
                <h3 className="text-[1.05rem] font-extrabold uppercase leading-none tracking-[-0.03em] text-[#63504A] sm:text-[1.16rem]">
                  {section.speedTitle}
                </h3>
                <p className="mt-3 text-pretty">
                  <span className="font-extrabold text-[#63504A]">{section.speedFormulaLabel}</span>{" "}
                  {section.speedText}
                </p>
                <p className="mt-2 font-bold text-[#63504A]">{section.speedFulfillmentText}</p>
              </section>

              <section className="border-b border-[rgba(99,80,74,0.12)] pb-4">
                <h3 className="text-[1.05rem] font-extrabold uppercase leading-none tracking-[-0.03em] text-[#63504A] sm:text-[1.16rem]">
                  {section.availabilityTitle}
                </h3>
                <p className="mt-3 text-pretty">
                  {section.availabilityText}
                </p>
                <p className="mt-2 text-[0.72rem] leading-[1.35] text-[rgba(99,80,74,0.68)] sm:text-[0.78rem]">
                  {section.availabilityNote}
                </p>
              </section>

              <section>
                <h3 className="text-[1.05rem] font-extrabold uppercase leading-none tracking-[-0.03em] text-[#63504A] sm:text-[1.16rem]">
                  {section.professionalismTitle}
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {section.points.map((point) => (
                    <li key={point.id} className="grid grid-cols-[7px,1fr] gap-3">
                      <span aria-hidden="true" className="mt-[0.54em] h-[5px] w-[5px] rounded-full bg-[#63504A]" />
                      <span>{point.text}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-pretty">
                  {section.professionalismText}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {section.brandLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-8 items-center justify-center rounded-full border border-[rgba(99,80,74,0.18)] bg-[#F7F2EE] px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.06em] text-[#63504A] transition duration-300 hover:-translate-y-[1px] hover:border-[#63504A] hover:bg-white hover:shadow-[0_10px_22px_rgba(99,80,74,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#63504A]/25"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

