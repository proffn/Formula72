import type { NavItem } from "@/types/home";
import type { StrapiSiteHeader } from "@/types/strapi";

// Blank fillers are not whitespace according to String.trim(). Keep real Unicode text.
const blankFillers = /[\u115f\u1160\u2800\u3164\uffa0]/gu;
const invisibleText = /[\p{White_Space}\p{Cf}\p{Cc}\p{M}]/gu;
const unsafeHrefCharacters = /[\p{White_Space}\p{Cf}\p{Cc}\u115f\u1160\u2800\u3164\uffa0\\]/u;

export const defaultNavigation: NavItem[] = [
  { label: "О нас", href: "/about" },
  { label: "Производство", href: "/production" },
  { label: "Опт", href: "https://b24-k8i1gh.bitrix24site.ru/crm_form_cw6nx/?utm_source=website_contract72" },
  { label: "Отзывы", href: "/#coverage-map" },
];

export function normalizeNavigationLabel(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const label = value.replace(blankFillers, " ").replace(/\s+/gu, " ").trim();
  return label.replace(invisibleText, "") ? label : null;
}

export function normalizeNavigationHref(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const href = value.trim();
  if (!href || unsafeHrefCharacters.test(href)) return null;
  if (href.startsWith("#")) return href.length > 1 ? `/${href}` : null;
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  try {
    const url = new URL(href);
    return /^(http:|https:)$/.test(url.protocol) && !url.username && !url.password ? href : null;
  } catch {
    return null;
  }
}

export function mapNavigationItems(header: StrapiSiteHeader): NavItem[] {
  // [] is an intentional empty menu; legacy values must not bring deleted items back.
  if (header.navigationItems !== undefined && header.navigationItems !== null) {
    if (!Array.isArray(header.navigationItems)) return [];
    return header.navigationItems.flatMap((item) => {
      const label = normalizeNavigationLabel(item?.label);
      const href = normalizeNavigationHref(item?.href);
      return label && href ? [{ label, href }] : [];
    });
  }

  const legacy = [
    { label: header.navAboutLabel, href: header.navAboutHref },
    { label: header.navProductionLabel, href: header.navProductionHref },
    { label: header.navWholesaleLabel, href: header.navWholesaleHref },
    { label: header.navReviewsLabel, href: header.navReviewsHref },
  ];
  return legacy.map((item, index) => {
    const fallback = defaultNavigation[index];
    let href = normalizeNavigationHref(item.href) ?? fallback.href;
    if (index === 0 && (href === "/#hero")) href = "/about";
    return { label: normalizeNavigationLabel(item.label) ?? fallback.label, href };
  });
}
