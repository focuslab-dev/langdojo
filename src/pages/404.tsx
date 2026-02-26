import Head from "next/head";
import Link from "next/link";
import { AppShell } from "@/components/global/AppShell";
import { BRAND_NAME } from "@/constants/brand";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>{`Page Not Found | ${BRAND_NAME}`}</title>
      </Head>

      <AppShell>
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
      </AppShell>
    </>
  );
}
