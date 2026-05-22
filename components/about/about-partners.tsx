import Image from "next/image";

import type { AboutPartnerCardData, AboutStoreLinkData } from "@/types/about";

type AboutPartnersProps = {
  partners: AboutPartnerCardData[];
};

function getExternalProps(href: string) {
  return href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {};
}

function StoreLink({ store }: { store: AboutStoreLinkData }) {
  const content = (
    <>
      <span className="relative block h-[42px] w-[42px] shrink-0 overflow-hidden rounded-[9px]">
        <Image src={store.logo} alt="" fill unoptimized className="object-contain" />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.72rem] font-extrabold uppercase leading-[1.04] tracking-[-0.02em] text-[#63504A]">
          {store.title}
        </span>
        <span className="mt-1 block whitespace-nowrap text-[0.58rem] font-medium lowercase leading-none tracking-[-0.01em] text-[#63504A]/72">
          перейти в магазин →
        </span>
      </span>
    </>
  );

  if (!store.href || store.href === "#") {
    return <span className="inline-flex min-w-0 items-center gap-2.5">{content}</span>;
  }

  return (
    <a
      href={store.href}
      {...getExternalProps(store.href)}
      className="inline-flex min-w-0 items-center gap-2.5 transition duration-300 hover:-translate-y-[1px] hover:opacity-80"
    >
      {content}
    </a>
  );
}

export function AboutPartners({ partners }: AboutPartnersProps) {
  return (
    <section className="mx-auto w-full max-w-[760px] px-4 pb-14 pt-12 sm:px-6 lg:px-0">
      <div className="grid gap-2 sm:grid-cols-3">
        {partners.map((partner) => (
          <article
            key={partner.title}
            className="min-h-[212px] rounded-[12px] bg-white px-5 py-4 shadow-[0_14px_34px_rgba(99,80,74,0.08)]"
          >
            <div className="relative h-11 w-36">
              <Image
                src={partner.logo}
                alt={partner.title}
                fill
                unoptimized
                className="object-contain object-left"
              />
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {partner.stores.map((store) => (
                <StoreLink key={`${partner.title}-${store.title}`} store={store} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
