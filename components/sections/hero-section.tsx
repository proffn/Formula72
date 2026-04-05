"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SiteHeader } from "@/components/layout/site-header";
import { isRemoteAssetUrl } from "@/lib/api";
import type { HeroContent, NavItem, SiteHeaderContent } from "@/types/home";

type HeroSectionProps = {
  siteHeader: SiteHeaderContent;
  navigation: NavItem[];
  hero: HeroContent;
};

const getRevealTransition = (delay: number) => ({
  duration: 0.8,
  delay,
  ease: [0.22, 1, 0.36, 1] as const,
});

export function HeroSection({ siteHeader, navigation, hero }: HeroSectionProps) {
  const backgroundImage = hero.backgroundImage ?? "/images/home/hero/hero-bg.jpg";

  return (
    <section id="hero" className="relative aspect-[1920/1078] w-full overflow-hidden">
      <Image
        src={backgroundImage}
        alt="Formula72 hero background"
        fill
        priority
        unoptimized={isRemoteAssetUrl(backgroundImage)}
        className="object-contain object-center"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,246,233,0.68)_0%,rgba(251,241,224,0.52)_34%,rgba(236,214,184,0.2)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,250,240,0.58),transparent_42%)]" />

      <SiteHeader content={siteHeader} navigation={navigation} />

      <div className="absolute inset-0 flex items-center justify-center px-6 pb-10 pt-20 sm:px-8 sm:pt-24 lg:pt-26">
        <div className="flex max-w-5xl flex-col items-center text-center text-[#63504A]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={getRevealTransition(0.12)}
            className="space-y-1"
          >
            <p className="text-[clamp(1.8rem,4.8vw,4.8rem)] font-bold uppercase leading-[0.94] tracking-[0.064em] sm:tracking-[0.08em]">
              {hero.lines[0]}
            </p>
            <p className="text-[clamp(1.8rem,4.8vw,4.8rem)] font-bold uppercase leading-[0.94] tracking-[0.064em] sm:tracking-[0.08em]">
              {hero.lines[1]}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={getRevealTransition(0.28)}
            className="mt-3 text-[clamp(2.666rem,.266vw,.234rem)] font-extralight uppercase leading-none tracking-[0.224em] sm:mt-4 sm:tracking-[0.272em]"
          >
            {hero.brand}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
