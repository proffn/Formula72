import Link from "next/link";

type CertificatesIntroProps = {
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
};

export function CertificatesIntro({
  title,
  description,
  buttonLabel,
  buttonHref,
}: CertificatesIntroProps) {
  const lines = description
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <section className="mx-auto w-full max-w-[1120px] px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pt-12">
      <h1 className="max-w-[760px] text-[clamp(2.2rem,6vw,5rem)] font-extrabold uppercase leading-[0.94] tracking-normal text-[#63504A]">
        {title}
      </h1>

      <div className="mt-7 grid gap-5 rounded-[24px] border border-[#7C6259]/12 bg-white/54 px-5 py-5 shadow-[0_20px_54px_rgba(99,80,74,0.08)] backdrop-blur sm:px-7 sm:py-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-8">
        <div className="flex gap-4">
          <span className="mt-2 hidden h-[calc(100%-0.75rem)] min-h-24 w-px shrink-0 bg-[#63504A]/24 sm:block" />
          <div className="max-w-[720px] space-y-2 text-[15px] leading-[1.72] text-[#6F5A54]/90 sm:text-[17px]">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
          </div>
        </div>

        <Link
          href={buttonHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#63504A] px-7 text-[13px] font-bold uppercase tracking-normal text-white shadow-[0_16px_34px_rgba(99,80,74,0.24)] transition duration-300 ease-out hover:-translate-y-[1px] hover:bg-[#57443F] hover:shadow-[0_20px_42px_rgba(99,80,74,0.28)] focus:outline-none focus:ring-2 focus:ring-[#63504A]/30 focus:ring-offset-2 focus:ring-offset-[#F7F2EE] sm:w-auto sm:min-w-[190px]"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
