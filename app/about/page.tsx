import type { Metadata } from "next";

import { AboutPage } from "@/components/about/about-page";
import { SiteFooter } from "@/components/layout/site-footer";
import { getAboutPage, getHomePageData, mapAboutPage } from "@/lib/queries";

export const metadata: Metadata = {
  title: "О нас | Formula72",
  description: "Формула72: ценности, миссия, преимущества и бренды-партнеры.",
};

export const dynamic = "force-dynamic";

export default async function AboutRoutePage() {
  const [homeData, aboutSection] = await Promise.all([
    getHomePageData(),
    getAboutPage(),
  ]);
  const mappedAboutPage = mapAboutPage(aboutSection);
  const aboutPage = {
    ...mappedAboutPage,
    logo: homeData.siteHeader.logoImage || mappedAboutPage.logo,
  };

  return (
    <>
      <AboutPage page={aboutPage} />
      <SiteFooter section={homeData.footer} />
    </>
  );
}
