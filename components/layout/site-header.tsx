"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { BurgerIcon } from "@/components/ui/burger-icon";
import { isRemoteAssetUrl } from "@/lib/api";
import type { NavItem, SiteHeaderContent } from "@/types/home";

type SiteHeaderProps = {
  content: SiteHeaderContent;
  navigation: NavItem[];
};

export function SiteHeader({ content, navigation }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(false);

  const mainNavigation = navigation.slice(0, 4);
  const desktopLogoSrc = content.logoImage || "/images/home/hero/logo1.png";
  const mobileLogoSrc = content.burgerMenuLogo || content.logoImage || "/images/home/hero/logo2-w.png";
  const logoAlt = "Formula72";

  useEffect(() => {
    const handleScroll = () => {
      const shouldShowBurger = window.scrollY > 140;
      setShowBurger(shouldShowBurger);

      if (!shouldShowBurger) {
        setIsMenuOpen(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-40 px-4 pt-3 sm:px-6 sm:pt-4 lg:px-8 lg:pt-5">
        <div className="mx-auto w-full max-w-[1100px]">
          <div className="flex items-center justify-between gap-4 lg:hidden">
            <Link
              href="#hero"
              className="group relative block h-[41px] w-[105px] transition duration-300 ease-out hover:-translate-y-[1px] hover:scale-[1.02] focus-visible:outline-none"
            >
              <Image
                src={desktopLogoSrc}
                alt={logoAlt}
                fill
                unoptimized={isRemoteAssetUrl(desktopLogoSrc)}
                className="object-contain object-left transition duration-300 ease-out group-hover:brightness-[0.98]"
                priority
              />
            </Link>

            <div className="h-14 w-14 flex-none" aria-hidden="true" />
          </div>

          <div className="hidden grid-cols-[auto_1fr_auto] items-center gap-3 lg:grid">
            <Link
              href="#hero"
              className="group relative block h-[53px] w-[121px] transition duration-300 ease-out hover:-translate-y-[1px] hover:scale-[1.02] focus-visible:outline-none lg:h-[64px] lg:w-[149px]"
            >
              <Image
                src={desktopLogoSrc}
                alt={logoAlt}
                fill
                unoptimized={isRemoteAssetUrl(desktopLogoSrc)}
                className="object-contain object-left transition duration-300 ease-out group-hover:brightness-[0.98]"
                priority
              />
            </Link>

            <nav className="hidden items-center justify-center gap-5 text-center lg:flex xl:gap-6">
              {mainNavigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative text-[15.5px] font-medium tracking-[-0.01em] text-[#63504A] transition duration-300 ease-out hover:-translate-y-[1px] hover:scale-[1.03] hover:text-[#4f3f3a] focus-visible:text-[#4f3f3a] focus-visible:outline-none xl:text-[18px]"
                >
                  {item.label}
                  <span className="absolute left-0 -bottom-1.5 h-px w-full origin-left scale-x-0 bg-[#63504A]/55 transition duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              ))}
            </nav>

            <Link
              href="#wholesale-contract"
              className="group hidden text-right text-[#63504A] transition duration-300 ease-out hover:-translate-y-[1px] hover:scale-[1.02] hover:text-[#4f3f3a] focus-visible:text-[#4f3f3a] focus-visible:outline-none lg:block"
            >
              <span className="block text-[11px] font-semibold tracking-[-0.01em] transition duration-300 ease-out group-hover:text-[#3f312d] xl:text-[13px]">
                {content.phone}
              </span>
              <span className="mt-1 block text-[10px] font-medium tracking-[-0.01em] text-[#63504A]/82 transition duration-300 ease-out group-hover:text-[#4f3f3a] xl:text-[11px]">
                {content.workSchedule}
              </span>
            </Link>
          </div>
        </div>
      </header>

      <button
        type="button"
        aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((current) => !current)}
        className={`fixed right-2 top-3 z-[60] flex transition-all duration-300 sm:right-3 sm:top-6 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#63504A]/25 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
          !isMenuOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        style={{ top: "max(0.75rem, env(safe-area-inset-top))" }}
      >
        <BurgerIcon />
      </button>

      <button
        type="button"
        aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((current) => !current)}
        className={`fixed right-2 top-5 z-[60] hidden transition-all duration-300 sm:right-3 sm:top-6 lg:block lg:right-4 lg:top-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#63504A]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent ${
          showBurger && !isMenuOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <BurgerIcon />
      </button>

      <div
        className={`fixed inset-0 z-[55] transition-all duration-300 ${
          isMenuOpen ? "pointer-events-auto bg-[rgba(34,24,20,0.3)] backdrop-blur-[3px]" : "pointer-events-none bg-transparent"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 right-0 z-[56] flex h-screen w-[min(360px,92vw)] flex-col bg-[#63504A] text-[#F7F2EE] shadow-[-20px_0_44px_rgba(41,28,24,0.22)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
        style={{
          paddingTop: "max(1rem, env(safe-area-inset-top))",
          paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
        }}
      >
        <div className="flex min-h-full w-full flex-col px-5 sm:px-6">
          <div className="flex items-start justify-between gap-4 pb-6">
            <div className="relative h-[42px] w-[118px] flex-none sm:h-[48px] sm:w-[136px]">
              <Image
                src={mobileLogoSrc}
                alt={logoAlt}
                fill
                unoptimized={isRemoteAssetUrl(mobileLogoSrc)}
                className="object-contain object-left"
              />
            </div>

            <button
              type="button"
              aria-label="Закрыть меню"
              onClick={() => setIsMenuOpen(false)}
              className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-[rgba(247,242,238,0.14)] bg-[rgba(247,242,238,0.06)] text-[28px] leading-none text-[#F7F2EE] transition duration-300 hover:bg-[rgba(247,242,238,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F2EE]/30"
            >
              ×
            </button>
          </div>

          <nav className="mt-3 flex flex-col">
            {mainNavigation.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="group border-b border-[rgba(247,242,238,0.11)] py-4.5 transition duration-300 ease-out hover:border-[rgba(247,242,238,0.18)] focus-visible:outline-none"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex items-baseline gap-3.5">
                    <span className="text-[11px] font-semibold tracking-[0.16em] text-[#DCCFC9]/54 transition duration-300 ease-out group-hover:text-[#F7F2EE]/72">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[29px] font-semibold leading-[0.96] tracking-[-0.05em] text-[#F7F2EE] transition duration-300 ease-out group-hover:translate-x-[3px] group-hover:scale-[1.02] sm:text-[32px]">
                      {item.label}
                    </span>
                  </div>
                  <span className="pt-1 text-[18px] text-[#DCCFC9]/54 transition duration-300 ease-out group-hover:translate-x-[2px] group-hover:scale-[1.08] group-hover:text-[#F7F2EE]">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </nav>

          <div className="mt-auto shrink-0 pt-7 pb-1">
            <div className="rounded-[24px] border border-[rgba(247,242,238,0.12)] bg-[rgba(247,242,238,0.05)] px-5 py-6 shadow-[0_18px_40px_rgba(41,28,24,0.16)]">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#DCCFC9]/62">
                Контакты
              </span>
              <Link
                href="#wholesale-contract"
                onClick={() => setIsMenuOpen(false)}
                className="mt-3 block text-[20px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#F7F2EE] transition hover:text-white focus-visible:outline-none"
              >
                {content.phone}
              </Link>
              <p className="mt-2 text-[12px] leading-[1.45] text-[#E6DBD5]/78">
                {content.workSchedule}
              </p>
              <p className="mt-3.5 max-w-[31ch] text-[11px] leading-[1.58] text-[#DCCFC9]/60">
                Свяжитесь с нами, чтобы обсудить запуск продукта, производство и формат сотрудничества.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}


