import type {
  FooterData,
  FooterLinkData,
  FooterSocialLinkData,
} from "@/types/home";

interface SiteFooterProps {
  section: FooterData;
}

function SendIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 20L20 12L4 4L4 10L15 12L4 14L4 20Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function normalizeDocumentLabel(label: string) {
  return label.replaceAll("персональных данных", "персональных\u00A0данных");
}

function FooterLinks({ links, documentMode = false }: { links: FooterLinkData[]; documentMode?: boolean }) {
  return (
    <ul className="space-y-1.5 text-[12px] leading-[1.28] text-[#F7F2EE]/82 sm:text-[13px]">
      {links.filter((link) => link.label.trim() && link.href.trim()).map((link) => (
        <li key={`${link.label}-${link.href}`}>
          <a
            href={link.href}
            className={`inline-block transition hover:text-white ${documentMode ? "max-w-[14.5rem] [text-wrap:balance]" : ""}`}
          >
            {documentMode ? normalizeDocumentLabel(link.label) : link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function getPlatformLabel(platform: string) {
  const normalized = platform.trim().toLowerCase();

  if (normalized.includes("whatsapp")) return "WhatsApp";
  if (normalized.includes("telegram")) return "Telegram";
  if (normalized === "vk" || normalized.includes("вк") || normalized.includes("vk.com")) return "VK";

  return platform.trim() || "Соцсеть";
}

function SocialIcon({ social }: { social: FooterSocialLinkData }) {
  const baseIcon = social.icon?.trim();
  const hoverIcon = social.hoverIcon?.trim() || baseIcon;
  const fallbackLabel = getPlatformLabel(social.platform);

  if (!baseIcon) {
    return <span className="text-[10px] font-semibold uppercase tracking-[0.08em]">{fallbackLabel.slice(0, 2)}</span>;
  }

  const showHoverLayer = Boolean(hoverIcon && hoverIcon !== baseIcon);

  return (
    <span className="relative block h-[28px] w-[28px] sm:h-[30px] sm:w-[30px]">
      <img
        src={baseIcon}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ${showHoverLayer ? "opacity-100 group-hover:opacity-0" : "opacity-100"}`}
      />
      {showHoverLayer ? (
        <img
          src={hoverIcon}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
      ) : null}
    </span>
  );
}

export function SiteFooter({ section }: SiteFooterProps) {
  const socials = section.socialLinks.filter((link) => link.enabled && link.href.trim());

  return (
    <footer className="bg-[#63504A] px-4 py-6 font-manrope text-[#F7F2EE] sm:px-6 sm:py-8 lg:px-8 lg:py-9">
      <div className="mx-auto w-full max-w-[1100px]">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-4 xl:items-start">
          <div className="space-y-3">
            <h2 className="text-[18px] font-semibold uppercase tracking-[0.04em] text-[#F7F2EE]">{section.contactsColumnTitle}</h2>
            <div className="space-y-2.5 text-[12px] leading-[1.25] text-[#F7F2EE]/88">
              <div>
                <p className="font-semibold text-[#F7F2EE]">{section.consultationTitle}</p>
                <a href={`tel:${section.consultationPhone.replace(/\s+/g, "")}`} className="mt-1 block transition hover:text-white">{section.consultationPhone}</a>
                <a href={`mailto:${section.consultationEmail}`} className="block break-all transition hover:text-white">{section.consultationEmail}</a>
              </div>
              <div>
                <p className="font-semibold text-[#F7F2EE]">{section.procurementTitle}</p>
                <a href={`mailto:${section.procurementEmail}`} className="mt-1 block break-all transition hover:text-white">{section.procurementEmail}</a>
              </div>
              <div>
                <p className="font-semibold text-[#F7F2EE]">{section.marketingTitle}</p>
                <a href={`mailto:${section.marketingEmail}`} className="mt-1 block break-all transition hover:text-white">{section.marketingEmail}</a>
              </div>
              <p className="pt-0.5 text-[#F7F2EE]/72">{section.workingHours}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-[18px] font-semibold uppercase tracking-[0.04em] text-[#F7F2EE]">{section.companyColumnTitle}</h2>
            <FooterLinks links={section.companyLinks} />
          </div>

          <div className="space-y-3">
            <h2 className="text-[18px] font-semibold uppercase tracking-[0.04em] text-[#F7F2EE]">{section.documentsColumnTitle}</h2>
            <FooterLinks links={section.documentLinks} documentMode />
          </div>

          <div className="space-y-3">
            <h2 className="text-[18px] font-semibold uppercase tracking-[0.04em] text-[#F7F2EE]">{section.formColumnTitle}</h2>
            <form className="space-y-2.5">
              <div className="flex items-stretch gap-2">
                <input
                  type="tel"
                  placeholder={section.phonePlaceholder}
                  className="min-w-0 flex-1 rounded-[8px] border border-[#F7F2EE]/18 bg-[#F7F2EE] px-3.5 py-2.5 text-[12px] text-[#63504A] outline-none placeholder:text-[#9A8A84]"
                />
                <button
                  type="submit"
                  aria-label="Отправить заявку"
                  className="inline-flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[8px] bg-[#8C6246] text-[#F7F2EE] transition hover:bg-[#A07151]"
                >
                  <SendIcon />
                </button>
              </div>
              <p className="max-w-[14.5rem] text-[10px] leading-[1.3] text-[#F7F2EE]/70">{normalizeDocumentLabel(section.consentText)}</p>
            </form>
            {socials.length > 0 ? (
              <div className="flex items-center gap-3 pt-0.5 text-[#F7F2EE]">
                {socials.map((social) => (
                  <a
                    key={`${social.platform}-${social.href}`}
                    href={social.href}
                    aria-label={getPlatformLabel(social.platform)}
                    className="group inline-flex h-[32px] w-[32px] items-center justify-center text-[#F7F2EE] transition hover:text-white sm:h-[34px] sm:w-[34px]"
                  >
                    <SocialIcon social={social} />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}


