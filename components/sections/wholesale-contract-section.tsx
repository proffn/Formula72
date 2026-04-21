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
      <div className="mx-auto flex w-full max-w-[32rem] flex-col gap-8 px-4 py-5 md:hidden">
        <MobileSplitCard
          side={section.left}
          imageSrc={
            section.left.MobileImage || "/images/home/wholesale-contract/opt-mobile.jpg"
          }
          imageAlt="Оптовая торговля"
        />
        <MobileSplitCard
          side={section.right}
          imageSrc={
            section.right.MobileImage || "/images/home/wholesale-contract/contract-mobile.jpg"
          }
          imageAlt="Контрактное производство"
        />
      </div>

      <div className="relative hidden aspect-[1920/1080] w-full overflow-hidden md:block">
        <Image
          src={section.backgroundImage}
          alt="РћРїС‚РѕРІР°СЏ С‚РѕСЂРіРѕРІР»СЏ Рё РєРѕРЅС‚СЂР°РєС‚РЅРѕРµ РїСЂРѕРёР·РІРѕРґСЃС‚РІРѕ"
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

type MobileSplitCardProps = {
  side: WholesaleSectionData["left"];
  imageSrc: string;
  imageAlt: string;
};

function MobileSplitCard({ side, imageSrc, imageAlt }: MobileSplitCardProps) {
  return (
    <article className="rounded-[1.5rem] border border-[#d9cec6] bg-[#f8f3ef] p-4 shadow-[0_10px_26px_rgba(107,84,72,0.14)]">
      <div className="px-1 pt-1">
        <h3 className="max-w-[12rem] whitespace-pre-line text-[2.05rem] font-bold uppercase leading-[0.92] tracking-[-0.04em] text-[#63504A]">
          {side.lines[0]}
          {"\n"}
          {side.lines[1]}
        </h3>

        <Link
          href={side.action.href}
          className="mt-3 inline-flex min-h-8 items-center justify-center rounded-md bg-[#76635d] px-4 py-2 text-[0.72rem] font-bold uppercase leading-none tracking-[-0.01em] text-[#F7F2EE] shadow-[0_10px_22px_rgba(69,53,47,0.18)] transition duration-300 ease-out hover:-translate-y-[1px] hover:scale-[1.03] hover:bg-[#65514b] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#63504A]/25"
        >
          {side.action.label}
        </Link>
      </div>

      <div className="relative mt-4 aspect-[313/193] overflow-hidden rounded-[1rem]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 767px) 100vw, 0px"
          unoptimized={isRemoteAssetUrl(imageSrc)}
          className="object-cover object-center"
        />
      </div>
    </article>
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
          className={`text-[clamp(1.94rem,3.43vw,3.74rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] xl:text-[60px] ${
            isRight ? "text-[#63504A]" : "text-white"
          }`}
        >
          {side.lines[0]}
        </p>
        <p
          className={`text-[clamp(1.94rem,3.43vw,3.74rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] xl:text-[60px] ${
            isRight ? "text-[#63504A]" : "text-white"
          }`}
        >
          {side.lines[1]}
        </p>
      </div>

      <Link
        href={side.action.href}
        className={`mt-3 inline-flex items-center justify-center rounded-md px-[30px] py-[10px] text-[0.9rem] font-bold uppercase leading-none tracking-[-0.01em] shadow-[0_12px_26px_rgba(69,53,47,0.14)] transition duration-300 ease-out hover:-translate-y-[1px] hover:scale-[1.03] hover:shadow-[0_18px_32px_rgba(69,53,47,0.22)] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 xl:mt-[27px] xl:px-[42px] xl:py-[14px] xl:text-[16px] ${
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
