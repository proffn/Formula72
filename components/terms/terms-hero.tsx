type TermsHeroProps = {
  title: string;
};

export function TermsHero({ title }: TermsHeroProps) {
  return (
    <header className="mx-auto w-full max-w-[1100px] px-4 pt-8 text-center sm:px-6 sm:pt-10 lg:px-8 lg:pt-12">
      <h1 className="mx-auto max-w-[860px] text-[clamp(1.58rem,4.76vw,4.06rem)] font-extrabold uppercase leading-[0.95] tracking-normal text-[#63504A]">
        {title}
      </h1>
    </header>
  );
}
