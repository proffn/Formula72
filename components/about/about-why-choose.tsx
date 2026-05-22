import type { AboutWhyItemData } from "@/types/about";

type AboutWhyChooseProps = {
  title: string;
  items: AboutWhyItemData[];
};

export function AboutWhyChoose({ title, items }: AboutWhyChooseProps) {
  return (
    <section className="mx-auto w-full max-w-[760px] px-4 pt-12 sm:px-6 lg:px-0">
      <h2 className="text-center text-[clamp(1.25rem,3.3vw,1.9rem)] font-extrabold uppercase leading-tight tracking-[-0.035em] text-[#63504A]">
        {title}
      </h2>

      <div className="mt-8 grid gap-7 sm:grid-cols-3 sm:gap-0">
        {items.map((item, index) => (
          <article
            key={item.title}
            className={`px-5 text-[#63504A] sm:px-6 ${index > 0 ? "border-t border-black pt-7 sm:border-l sm:border-t-0 sm:pt-0" : ""}`}
          >
            <h3 className="text-left text-[1.03rem] font-extrabold uppercase leading-none tracking-[-0.02em] sm:text-center">
              {item.title}
            </h3>
            {item.label ? (
              <p className="mt-6 text-[0.78rem] font-medium leading-none text-[#63504A]/74">
                {item.label}
              </p>
            ) : null}
            <p className="mt-2 text-[clamp(1.6rem,3.45vw,2.08rem)] font-extrabold uppercase leading-none tracking-[-0.045em]">
              {item.value}
            </p>
            <WhyDescription item={item} />
          </article>
        ))}
      </div>
    </section>
  );
}

function WhyDescription({ item }: { item: AboutWhyItemData }) {
  if (item.linkLabel && item.linkHref && item.description.includes(item.linkLabel)) {
    const [beforeLink, afterLink] = item.description.split(item.linkLabel);

    return (
      <p className="mt-6 whitespace-pre-line text-[0.82rem] font-medium leading-[1.35] text-[#63504A]/82">
        {beforeLink}
        <a
          href={item.linkHref}
          target="_blank"
          rel="noreferrer"
          className="font-semibold underline decoration-[#63504A]/42 underline-offset-2 transition hover:text-[#4F403B] hover:decoration-[#4F403B]"
        >
          {item.linkLabel}
        </a>
        {afterLink}
      </p>
    );
  }

  return (
    <p className="mt-6 whitespace-pre-line text-[0.82rem] font-medium leading-[1.35] text-[#63504A]/82">
      {item.description}
    </p>
  );
}
