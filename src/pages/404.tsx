import Head from "next/head";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BRAND_NAME } from "@/constants/brand";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>{`Page Not Found | ${BRAND_NAME}`}</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <SiteHeader />

        <div className="flex flex-col items-center justify-center max-w-md mx-auto px-6 py-32">
          <h1 className="text-6xl font-bold text-gray-200">404</h1>
          <p className="mt-4 text-gray-500 text-sm">Page not found</p>
          <Link
            href="/"
            className="mt-6 text-sm text-blue-500 hover:text-blue-600 transition-colors"
          >
            Go back home
          </Link>
        </div>

        <SiteFooter />
      </div>
    </>
  );
}
