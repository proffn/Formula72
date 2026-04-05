import { BannerSlider } from "@/components/sections/banner-slider";
import { CoverageMapSection } from "@/components/sections/coverage-map-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalBrandSection } from "@/components/sections/final-brand-section";
import { Formula72SchemeSection } from "@/components/sections/formula72-scheme-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LeadCtaSection } from "@/components/sections/lead-cta-section";
import { MissionK72Section } from "@/components/sections/mission-k72-section";
import { ProsConsSection } from "@/components/sections/pros-cons-section";
import { WhatWeCanMakeSection } from "@/components/sections/what-we-can-make-section";
import { WhyTrustUsSection } from "@/components/sections/why-trust-us-section";
import { WhoSuitsSection } from "@/components/sections/who-suits-section";
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
      <WhoSuitsSection section={data.whoSuits} />
      <WhyTrustUsSection section={data.whyTrustUs} />
      <CoverageMapSection section={data.coverageMap} />
      <WhatWeCanMakeSection section={data.whatWeCanMake} />
      <FaqSection section={data.faq} />
      <LeadCtaSection section={data.leadCta} />
      <FinalBrandSection section={data.finalBrand} />
    </main>
  );
}
