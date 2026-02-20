import Link from "next/link";
import { ReactNode } from "react";

type Variant =
  | "ghost"
  | "primary"
  | "secondary"
  | "teal"
  | "link-gray"
  | "link-blue";

const BASE = "inline-flex items-center text-sm transition-colors";

const VARIANT_CLASSES: Record<Variant, string> = {
  ghost:
    "gap-2 font-medium bg-backgroundDim hover:bg-gray-200 text-gray-500 hover:text-gray-700 px-4 py-2 rounded-xl",
  primary:
    "gap-2 font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-3 rounded-xl justify-center",
  secondary:
    "gap-2 font-medium bg-gray-800 hover:bg-gray-900 text-white px-4 py-3 rounded-xl justify-center",
  teal: "gap-2 font-semibold bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-xl justify-center",
  "link-gray": "gap-1.5 text-gray-500 hover:text-gray-700",
  "link-blue": "gap-2 font-medium text-blue-600 hover:text-blue-700",
};

interface ButtonProps {
  variant?: Variant;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  href?: string;
  external?: boolean;
}

export function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  onClick,
  disabled,
  type = "button",
  href,
  external,
}: ButtonProps) {
  const classes = [
    BASE,
    VARIANT_CLASSES[variant],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
