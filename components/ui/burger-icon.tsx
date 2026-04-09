export function BurgerIcon() {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(247,242,238,0.14)] bg-[#63504A] text-white shadow-[0_18px_34px_rgba(69,53,47,0.28)] transition duration-300 hover:bg-[#54433d] hover:shadow-[0_20px_38px_rgba(69,53,47,0.34)]">
      <span className="relative block h-4 w-5 drop-shadow-[0_1px_2px_rgba(247,242,238,0.18)]">
        <span className="absolute left-0 top-0.5 block h-[2px] w-full rounded-full bg-current" />
        <span className="absolute left-0 top-[7px] block h-[2px] w-full rounded-full bg-current" />
        <span className="absolute left-0 top-[13px] block h-[2px] w-full rounded-full bg-current" />
      </span>
    </span>
  );
}

