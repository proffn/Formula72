import Link from "next/link";
import Image from "next/image";
import { isRemoteAssetUrl } from "@/lib/api";
import type { WholesaleSectionData } from "@/types/home";

type WholesaleContractSectionProps = {
  section: WholesaleSectionData;
};

export function WholesaleContractSection({ section }: WholesaleContractSectionProps) {
  return (
    <section id="wholesale-contract" className="relative w-full">
      <div className="relative aspect-[1920/1080] w-full overflow-hidden">
        <Image
          src={section.backgroundImage}
          alt="Оптовая торговля и контрактное производство"
          fill
          sizes="100vw"
          unoptimized={isRemoteAssetUrl(section.backgroundImage)}
          className="object-contain object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,245,235,0.12)_0%,rgba(255,245,235,0.04)_42%,rgba(255,245,235,0.12)_100%)]" />

        <div className="absolute inset-0 grid grid-cols-1 items-start gap-10 px-8 py-8 sm:px-10 sm:py-10 md:grid-cols-2 md:gap-8 lg:px-[110px] lg:py-[60px] xl:px-[135px] xl:py-[69px]">
          <SplitSide side={section.left} align="left" />
          <SplitSide side={section.right} align="right" />
        </div>
      </div>
    </section>
  );
}

type SplitSideProps = {
  side: WholesaleSectionData["left"];
  align: "left" | "right";
};

function SplitSide({ side, align }: SplitSideProps) {
  const isRight = align === "right";

  return (
    <div
      className={`flex h-full flex-col justify-start ${
        isRight ? "md:items-end md:text-right" : "md:items-start md:text-left"
      }`}
    >
      <div>
        <p
          className={`text-[clamp(2.42rem,4.29vw,4.675rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] xl:text-[75px] ${
            isRight ? "text-[#63504A]" : "text-white"
          }`}
        >
          {side.lines[0]}
        </p>
        <p
          className={`text-[clamp(2.42rem,4.29vw,4.675rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] xl:text-[75px] ${
            isRight ? "text-[#63504A]" : "text-white"
          }`}
        >
          {side.lines[1]}
        </p>
      </div>

      <Link
        href={side.action.href}
        className={`mt-4 inline-flex items-center justify-center rounded-md px-[38px] py-[13px] text-[1.12rem] font-bold uppercase leading-none tracking-[-0.01em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 xl:mt-[34px] xl:px-[53px] xl:py-[17px] xl:text-[20px] ${
          isRight
            ? "bg-[#63504A] text-white hover:bg-[#52403a] focus-visible:bg-[#52403a] focus-visible:ring-[#63504A]/30"
            : "bg-white text-[#63504A] hover:bg-[#f8f5f2] focus-visible:bg-[#f8f5f2] focus-visible:ring-white/60"
        }`}
      >
        {side.action.label}
      </Link>
    </div>
  );
}
