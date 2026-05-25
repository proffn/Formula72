import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CertificatesPage } from "@/components/certificates/certificates-page";
import { SiteFooter } from "@/components/layout/site-footer";
import { getCertificatesPage, getHomePageData, mapCertificatesPage } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Сертификаты | Formula72",
  description: "Сертификаты и разрешения компании Formula72.",
};

export const dynamic = "force-dynamic";

export default async function CertificatesRoutePage() {
  const [homeData, certificatesSection] = await Promise.all([
    getHomePageData(),
    getCertificatesPage(),
  ]);
  const certificatesPage = mapCertificatesPage(certificatesSection);

  if (!certificatesPage.enabled) {
    notFound();
  }

  const logoImage = homeData.siteHeader.logoImage || "/images/home/hero/logo3.png";

  return (
    <>
      <CertificatesPage page={certificatesPage} logoSrc={logoImage} />
      <SiteFooter section={homeData.footer} />
    </>
  );
}
