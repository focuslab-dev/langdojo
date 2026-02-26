import Link from "next/link";
import { BRAND_NAME } from "@/constants/brand";

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-16">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Brand + Links */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 font-semibold text-gray-900 hover:text-gray-700 transition-colors"
          >
            {BRAND_NAME}
          </Link>

          <nav className="flex items-center gap-6 text-sm text-gray-500">
            <Link
              href="/about"
              className="hover:text-gray-700 transition-colors"
            >
              About
            </Link>
            <Link
              href="/terms"
              className="hover:text-gray-700 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="hover:text-gray-700 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/feedback"
              className="hover:text-gray-700 transition-colors"
            >
              Feedback
            </Link>
            <Link
              href="/changelog"
              className="hover:text-gray-700 transition-colors"
            >
              Change Log
            </Link>
          </nav>
        </div>

        {/* Made with love */}
        <p className="text-xs text-gray-400 mt-6">
          Made with ❤️ by{" "}
          <a
            href="https://memozora.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            Memozora.com
          </a>
        </p>
      </div>
    </footer>
  );
}
