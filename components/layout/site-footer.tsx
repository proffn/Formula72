import type {
  FooterData,
  FooterLinkData,
  FooterSocialLinkData,
} from "@/types/home";

interface SiteFooterProps {
  section: FooterData;
}

function FooterSubmitButton() {
  return (
    <button
      type="submit"
      aria-label="Отправить заявку"
      className="group inline-flex h-[46px] w-[46px] shrink-0 cursor-pointer select-none appearance-none items-center justify-center rounded-[12px] border border-[#F7F2EE]/42 bg-[#F7F2EE] text-[#63504A] shadow-[0_12px_24px_rgba(44,31,27,0.2)] transition duration-300 ease-out hover:-translate-y-[2px] hover:scale-[1.06] hover:border-white hover:bg-white hover:text-[#4F403B] hover:shadow-[0_18px_32px_rgba(44,31,27,0.28)] active:translate-y-0 active:scale-[0.95] active:bg-[#E9DDD5] active:text-[#433531] active:shadow-[0_8px_16px_rgba(44,31,27,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F2EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#63504A] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <SendIcon />
    </button>
  );
}

function SendIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 transition duration-300 ease-out group-hover:translate-x-[1px] group-hover:-translate-y-[1px] group-hover:scale-[1.06] group-active:translate-x-0 group-active:translate-y-0 group-active:scale-[0.94]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
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
            className={`group inline-block max-w-full text-left transition duration-300 ease-out hover:translate-x-[2px] hover:text-white ${documentMode ? "max-w-[14.5rem] [text-wrap:balance]" : ""}`}
          >
            {documentMode ? normalizeDocumentLabel(link.label) : link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function SocialIcon({ social }: { social: FooterSocialLinkData }) {
  const baseIcon = social.icon?.trim();
  const hoverIcon = social.hoverIcon?.trim() || baseIcon;
  const fallbackLabel = social.label?.trim() || "Соцсеть";

  if (!baseIcon) {
    return <span className="text-[10px] font-semibold uppercase tracking-[0.08em]">{fallbackLabel.slice(0, 2)}</span>;
  }

  const showHoverLayer = Boolean(hoverIcon && hoverIcon !== baseIcon);

  return (
    <span className="relative block h-[15px] w-[15px] sm:h-[16px] sm:w-[16px]">
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
  const socials = section.socialLinks.filter((link) => link.enabled);

  return (
    <footer className="relative bg-[#63504A] px-4 py-6 font-manrope text-[#F7F2EE] sm:px-6 sm:py-8 lg:px-8 lg:py-9">
      <div className="mx-auto w-full max-w-[1100px]">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-4 xl:items-start">
          <div className="space-y-3">
            <h2 className="text-[18px] font-semibold uppercase tracking-[0.04em] text-[#F7F2EE]">{section.contactsColumnTitle}</h2>
            <div className="space-y-2.5 text-[12px] leading-[1.25] text-[#F7F2EE]/88">
              <div>
                <p className="font-semibold text-[#F7F2EE]">{section.consultationTitle}</p>
                <a href={`tel:${section.consultationPhone.replace(/\s+/g, "")}`} className="mt-1 block transition duration-300 ease-out hover:translate-x-[2px] hover:text-white">{section.consultationPhone}</a>
                <a href={`mailto:${section.consultationEmail}`} className="block break-all transition duration-300 ease-out hover:translate-x-[2px] hover:text-white">{section.consultationEmail}</a>
              </div>
              <div>
                <p className="font-semibold text-[#F7F2EE]">{section.procurementTitle}</p>
                <a href={`mailto:${section.procurementEmail}`} className="mt-1 block break-all transition duration-300 ease-out hover:translate-x-[2px] hover:text-white">{section.procurementEmail}</a>
              </div>
              <div>
                <p className="font-semibold text-[#F7F2EE]">{section.marketingTitle}</p>
                <a href={`mailto:${section.marketingEmail}`} className="mt-1 block break-all transition duration-300 ease-out hover:translate-x-[2px] hover:text-white">{section.marketingEmail}</a>
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
            <form className="space-y-2.5" action="#" data-footer-submit-area>
              <div className="flex items-stretch gap-2.5">
                <input
                  type="tel"
                  placeholder={section.phonePlaceholder}
                  className="min-w-0 flex-1 rounded-[10px] border border-[#F7F2EE]/18 bg-[#F7F2EE] px-3.5 py-2.5 text-[12px] text-[#63504A] shadow-[0_10px_20px_rgba(44,31,27,0.08)] outline-none transition duration-300 ease-out placeholder:text-[#9A8A84] hover:border-[#F7F2EE]/28 focus:border-[#F7F2EE]/38 focus:bg-white focus:shadow-[0_14px_26px_rgba(44,31,27,0.14)] focus-visible:ring-2 focus-visible:ring-[#F7F2EE]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#63504A]"
                />
                <FooterSubmitButton />
              </div>
              <p className="max-w-[14.5rem] text-[10px] leading-[1.3] text-[#F7F2EE]/70">{normalizeDocumentLabel(section.consentText)}</p>
            </form>
            {socials.length > 0 ? (
              <div className="flex items-center gap-3 pt-0.5 text-[#F7F2EE]">
                {socials.map((social) => {
                  const content = <SocialIcon social={social} />;
                  const accessibleLabel = social.label?.trim() || "Соцсеть";

                  if (social.href.trim()) {
                    return (
                      <a
                        key={`${accessibleLabel}-${social.href}`}
                        href={social.href}
                        aria-label={accessibleLabel}
                        className="group inline-flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[rgba(247,242,238,0.04)] text-[#F7F2EE] shadow-[0_8px_18px_rgba(27,18,15,0.1)] transition duration-300 ease-out hover:-translate-y-[1px] hover:scale-[1.06] hover:bg-[rgba(247,242,238,0.09)] hover:text-white hover:shadow-[0_14px_24px_rgba(27,18,15,0.16)] active:translate-y-0 active:scale-[0.98] sm:h-[34px] sm:w-[34px]"
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <span
                      key={`${accessibleLabel}-disabled`}
                      aria-label={accessibleLabel}
                      className="group inline-flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[rgba(247,242,238,0.04)] text-[#F7F2EE]/80 sm:h-[34px] sm:w-[34px]"
                    >
                      {content}
                    </span>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}





