export function BurgerIcon() {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#63504A] text-white transition duration-300 hover:bg-[#54433d]">
      <span className="relative block h-4 w-5">
        <span className="absolute left-0 top-0.5 block h-[2px] w-full rounded-full bg-current" />
        <span className="absolute left-0 top-[7px] block h-[2px] w-full rounded-full bg-current" />
        <span className="absolute left-0 top-[13px] block h-[2px] w-full rounded-full bg-current" />
      </span>
    </span>
  );
}
