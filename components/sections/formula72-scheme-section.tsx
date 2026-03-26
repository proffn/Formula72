import Image from "next/image";
import { isRemoteAssetUrl } from "@/lib/api";
import type { Formula72SchemeSectionData } from "@/types/home";

type Formula72SchemeSectionProps = {
  section: Formula72SchemeSectionData;
};

export function Formula72SchemeSection({ section }: Formula72SchemeSectionProps) {
  return (
    <section id="formula72-scheme" className="relative w-full bg-[#F7F2EE]">
      <div className="relative aspect-[1920/1080] w-full overflow-hidden">
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
          unoptimized={isRemoteAssetUrl(section.image)}
          className="object-contain object-center"
        />
      </div>
    </section>
  );
}
