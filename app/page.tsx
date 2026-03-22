import { BannerSlider } from "@/components/sections/banner-slider";
import { HeroSection } from "@/components/sections/hero-section";
import { WholesaleContractSection } from "@/components/sections/wholesale-contract-section";
import { getHomePageData } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getHomePageData();

  return (
    <main className="page-shell">
      <HeroSection siteHeader={data.siteHeader} navigation={data.navigation} hero={data.hero} />
      <BannerSlider banners={data.banners} />
      <WholesaleContractSection section={data.wholesaleContract} />
    </main>
  );
}
