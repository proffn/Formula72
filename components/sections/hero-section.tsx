import Image from "next/image";

import { SiteHeader } from "@/components/layout/site-header";
import type { HeroContent, NavItem, SiteHeaderContent } from "@/types/home";

type HeroSectionProps = {
  siteHeader: SiteHeaderContent;
  navigation: NavItem[];
  hero: HeroContent;
};

export function HeroSection({ siteHeader, navigation, hero }: HeroSectionProps) {
  const backgroundImage = hero.backgroundImage ?? "/images/home/hero/hero-bg.jpg";
  const mobileBackgroundImage = hero.mobileBackgroundImage ?? "/images/home/hero/mobile-hero-bg.png";

  return (
    <section id="hero" className="relative w-full overflow-hidden">
      <div className="relative min-h-screen min-h-[100svh] sm:hidden">
        <div
          className="absolute inset-0 bg-cover bg-[center_top] bg-no-repeat"
          style={{ backgroundImage: `url('${mobileBackgroundImage}')` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,247,238,0.84)_0%,rgba(252,244,235,0.48)_34%,rgba(245,234,223,0.18)_100%)]" />

        <SiteHeader content={siteHeader} navigation={navigation} />

        <div className="absolute inset-0 flex items-center justify-center px-6 pb-[15svh] pt-[calc(max(5.75rem,calc(env(safe-area-inset-top)+4.75rem))+10%)]">
          <div className="flex max-w-[20rem] flex-col items-center text-center text-[#63504A]">
            <div className="space-y-0.5">
              <p className="text-[2.78rem] font-bold uppercase leading-[0.9] tracking-[-0.055em]">
                {hero.lines[0]}
              </p>
              <p className="text-[2.78rem] font-bold uppercase leading-[0.9] tracking-[-0.055em]">
                {hero.lines[1]}
              </p>
              <p className="text-[2.78rem] font-bold uppercase leading-[0.9] tracking-[-0.055em]">
                {hero.lines[2]}
              </p>
            </div>

            <p className="mt-3 text-[1.455rem] font-extralight uppercase leading-none tracking-[0.16em] text-[#7B665F]">
              {hero.brand}
            </p>
          </div>
        </div>
      </div>

      <div className="relative hidden aspect-[1920/1078] w-full overflow-hidden sm:block">
        <Image
          src={backgroundImage}
          alt="Formula72 hero background"
          fill
          priority
          unoptimized
          className="object-contain object-center"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,246,233,0.68)_0%,rgba(251,241,224,0.52)_34%,rgba(236,214,184,0.2)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,250,240,0.58),transparent_42%)]" />

        <SiteHeader content={siteHeader} navigation={navigation} />

        <div className="absolute inset-0 flex items-center justify-center px-6 pb-10 pt-20 sm:px-8 sm:pt-24 lg:pb-16 lg:pt-20">
          <div className="flex max-w-5xl flex-col items-center text-center text-[#63504A]">
            <div className="space-y-1">
              <p className="text-[clamp(1.8rem,4.8vw,4.8rem)] font-bold uppercase leading-[0.94] tracking-[0.064em] sm:tracking-[0.08em]">
                {hero.lines[0]}
              </p>
              <p className="text-[clamp(1.8rem,4.8vw,4.8rem)] font-bold uppercase leading-[0.94] tracking-[0.064em] sm:tracking-[0.08em]">
                {hero.lines[1]}
              </p>
              <p className="text-[clamp(1.8rem,4.8vw,4.8rem)] font-bold uppercase leading-[0.94] tracking-[0.064em] sm:tracking-[0.08em]">
                {hero.lines[2]}
              </p>
            </div>

            <p className="mt-3 text-[clamp(1.35rem,3vw,2.7rem)] font-extralight uppercase leading-none tracking-[0.224em] sm:mt-4 sm:tracking-[0.272em]">
              {hero.brand}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
