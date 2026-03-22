import Link from "next/link";

type ButtonProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
};

const styles = {
  primary:
    "bg-foreground text-foreground-contrast hover:bg-[#6c564e] focus-visible:bg-[#6c564e]",
  secondary:
    "border border-white/50 bg-white/12 text-foreground-contrast backdrop-blur-sm hover:bg-white/22 focus-visible:bg-white/22",
};

export function Button({
  href,
  label,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold tracking-[0.08em] transition duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${styles[variant]} ${className}`}
    >
      {label}
    </Link>
  );
}