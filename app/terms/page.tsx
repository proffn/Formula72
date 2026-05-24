import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { TermsPage } from "@/components/terms/terms-page";
import { getHomePageData, getTermsPage, mapTermsPage } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Условия | Formula72",
  description: "Оплата, минимальная партия, сроки, демо-образцы и доставка Formula72.",
};

export const dynamic = "force-dynamic";

export default async function TermsRoutePage() {
  const [homeData, termsSection] = await Promise.all([
    getHomePageData(),
    getTermsPage(),
  ]);
  const termsPage = mapTermsPage(termsSection);

  if (!termsPage.enabled) {
    notFound();
  }

  const logoImage = homeData.siteHeader.logoImage || "/images/home/hero/logo1.png";

  return (
    <>
      <TermsPage page={termsPage} logoSrc={logoImage} />
      <SiteFooter section={homeData.footer} />
    </>
  );
}
