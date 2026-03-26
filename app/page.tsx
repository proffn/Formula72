import { BannerSlider } from "@/components/sections/banner-slider";
import { Formula72SchemeSection } from "@/components/sections/formula72-scheme-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MissionK72Section } from "@/components/sections/mission-k72-section";
import { ProsConsSection } from "@/components/sections/pros-cons-section";
import { WholesaleContractSection } from "@/components/sections/wholesale-contract-section";
import { WorkStagesSection } from "@/components/sections/work-stages-section";
import { getHomePageData } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getHomePageData();

  return (
    <main className="page-shell">
      <HeroSection siteHeader={data.siteHeader} navigation={data.navigation} hero={data.hero} />
      <BannerSlider banners={data.banners} />
      <WholesaleContractSection section={data.wholesaleContract} />
      <ProsConsSection section={data.prosCons} />
      <Formula72SchemeSection section={data.formula72Scheme} />
      <WorkStagesSection section={data.workStages} />
      <MissionK72Section section={data.missionK72} />
    </main>
  );
}
