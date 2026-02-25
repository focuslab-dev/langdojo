import Link from "next/link";
import { IconGithub } from "@/components/ui/Icons";
import { BRAND_NAME } from "@/constants/brand";

interface Breadcrumb {
  label: string;
  href: string;
}

interface SiteHeaderProps {
  breadcrumbs?: Breadcrumb[];
  showTagline?: boolean;
}

export function SiteHeader({ breadcrumbs, showTagline }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Brand + Breadcrumbs */}
          <div className="flex items-center gap-1.5 min-w-0">
            <Link
              href="/"
              className="flex text-xl items-center gap-1.5 font-bold text-gray-900 hover:text-gray-700 transition-colors shrink-0"
            >
              {BRAND_NAME}
            </Link>

            {breadcrumbs?.map((crumb, i) => {
              const isLast = i === breadcrumbs.length - 1;
              return (
                <span
                  key={crumb.href}
                  className="flex items-center gap-1.5 min-w-0 text-sm"
                >
                  <span className="text-gray-300">›</span>
                  {isLast ? (
                    <span className="text-gray-500 truncate">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="text-gray-500 hover:text-gray-700 transition-colors truncate"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </span>
              );
            })}
          </div>

          {/* GitHub link */}
          <a
            href="https://github.com/focuslab-dev/langdojo"
            className="text-gray-400 hover:text-gray-600 transition-colors shrink-0 ml-4"
            aria-label="View on GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconGithub className="w-5 h-5" />
          </a>
        </div>

        {showTagline && (
          <p className="text-xs text-gray-400 mt-1">
            Free & open language decks
          </p>
        )}
      </div>
    </header>
  );
}
