"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isRemoteAssetUrl } from "@/lib/api";
import { BurgerIcon } from "@/components/ui/burger-icon";
import { Container } from "@/components/ui/container";
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
  const mobileLogoSrc = content.logoImage || "/images/home/hero/logo1-w.png";
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

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-40 pt-4 sm:pt-5 lg:pt-6">
        <Container>
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
            <Link href="#hero" className="relative block h-[104px] w-[240px] lg:h-[128px] lg:w-[296px]">
              <Image
                src={desktopLogoSrc}
                alt={logoAlt}
                fill
                unoptimized={isRemoteAssetUrl(desktopLogoSrc)}
                className="object-contain object-left"
                priority
              />
            </Link>

            <nav className="hidden items-center justify-center gap-6 text-center lg:flex xl:gap-8">
              {mainNavigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[19.5px] font-medium tracking-[-0.01em] text-[#63504A] transition duration-300 hover:text-[#4f3f3a] focus-visible:text-[#4f3f3a] focus-visible:outline-none xl:text-[22.5px]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="#wholesale-contract"
              className="hidden text-right text-[#63504A] transition duration-300 hover:text-[#4f3f3a] focus-visible:text-[#4f3f3a] focus-visible:outline-none lg:block"
            >
              <span className="block text-[14px] font-semibold tracking-[-0.01em] xl:text-[16px]">{content.phone}</span>
              <span className="mt-1 block text-[12px] font-medium tracking-[-0.01em] xl:text-[14px]">{content.workSchedule}</span>
            </Link>
          </div>
        </Container>
      </header>

      <button
        type="button"
        aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((current) => !current)}
        className={`fixed right-2 top-5 z-[60] transition-all duration-300 sm:right-3 sm:top-6 lg:right-4 lg:top-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#63504A]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent ${
          showBurger ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <BurgerIcon />
      </button>

      <div
        className={`fixed inset-0 z-[55] transition-all duration-300 ${
          isMenuOpen ? "pointer-events-auto bg-black/20" : "pointer-events-none bg-black/0"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        className={`fixed right-0 top-0 z-[56] flex h-screen w-[min(380px,100vw)] flex-col bg-[#63504A] px-6 py-8 text-white transition-transform duration-300 ease-out sm:px-7 sm:py-10 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="relative h-[124px] w-[300px] sm:h-[144px] sm:w-[336px]">
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
            className="text-3xl leading-none text-white transition duration-300 hover:opacity-75 focus-visible:outline-none"
          >
            ×
          </button>
        </div>

        <nav className="mt-12 flex flex-col gap-6">
          {mainNavigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-semibold tracking-[-0.02em] text-white transition duration-300 hover:text-white/80 focus-visible:text-white/80 focus-visible:outline-none"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#wholesale-contract"
          onClick={() => setIsMenuOpen(false)}
          className="mt-auto border-t border-white/20 pt-6 text-white"
        >
          <span className="block text-lg font-semibold tracking-[-0.01em]">{content.phone}</span>
          <span className="mt-2 block text-sm font-medium tracking-[-0.01em] text-white/84">{content.workSchedule}</span>
        </Link>
      </aside>
    </>
  );
}
