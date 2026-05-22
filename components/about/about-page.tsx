import type { AboutPageData } from "@/types/about";

import { AboutHero } from "./about-hero";
import { AboutMission } from "./about-mission";
import { AboutPartners } from "./about-partners";
import { AboutValues } from "./about-values";
import { AboutWhyChoose } from "./about-why-choose";

type AboutPageProps = {
  page: AboutPageData;
};

export function AboutPage({ page }: AboutPageProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F2EE] text-[#63504A]">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[24rem] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.86),transparent_68%)]" />
        <div className="absolute left-[-12rem] top-28 h-[24rem] w-[24rem] rounded-full bg-white/46 blur-3xl" />
        <div className="absolute right-[-14rem] top-[28rem] h-[26rem] w-[26rem] rounded-full bg-[#E8D8CF]/36 blur-3xl" />

        <div className="relative">
          <AboutHero page={page} />
          <AboutValues title={page.valuesTitle} values={page.values} />
          <AboutMission title={page.missionTitle} text={page.missionText} image={page.missionImage} />
          <AboutWhyChoose title={page.whyTitle} items={page.whyItems} />
          <AboutPartners partners={page.partners} />
        </div>
      </div>
    </main>
  );
}
