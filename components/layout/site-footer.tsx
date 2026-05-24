import type {
  FooterData,
  FooterLinkData,
  FooterSocialLinkData,
} from "@/types/home";

interface SiteFooterProps {
  section: FooterData;
}

function normalizeDocumentLabel(label: string) {
  return label.replaceAll("персональных данных", "персональных\u00A0данных");
}

function normalizeWorkingHours(value: string) {
  const trimmedValue = value.trim();

  if (trimmedValue === "график работы с 11:00 до 16:00 по Мск") {
    return ["график работы с пн –пт", "с 07:00 до 16:00 по мск."];
  }

  if (trimmedValue.includes("\n")) {
    return trimmedValue
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }

  return trimmedValue
    .replace(/\s+с 07:00/i, "\nс 07:00")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
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
  const workingHoursLines = normalizeWorkingHours(section.workingHours);

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
              <p className="pt-0.5 text-[#F7F2EE]/72">
                {workingHoursLines.map((line, index) => (
                  <span key={line} className={index > 0 ? "mt-1.5 block" : "block"}>
                    {line}
                  </span>
                ))}
              </p>
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
            <div data-footer-submit-area>
              <a
                href={section.formButtonLink}
                target={section.formButtonLink.startsWith("http") ? "_blank" : undefined}
                rel={section.formButtonLink.startsWith("http") ? "noreferrer" : undefined}
                className="group inline-flex min-h-[46px] w-full max-w-[17.5rem] items-center justify-center gap-2 rounded-[12px] border border-[#F7F2EE]/36 bg-[#F7F2EE] px-5 py-3 text-center text-[12px] font-bold uppercase tracking-[0.04em] text-[#63504A] shadow-[0_12px_24px_rgba(44,31,27,0.2)] transition duration-300 ease-out hover:-translate-y-[2px] hover:scale-[1.02] hover:border-white hover:bg-white hover:text-[#4F403B] hover:shadow-[0_18px_32px_rgba(44,31,27,0.28)] active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F2EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#63504A]"
              >
                <span>{section.formButtonText}</span>
                <span className="text-[15px] leading-none transition duration-300 ease-out group-hover:translate-x-[2px]">→</span>
              </a>
            </div>
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





