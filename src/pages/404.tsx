import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white max-w-md mx-auto px-6">
      <h1 className="text-6xl font-bold text-gray-200">404</h1>
      <p className="mt-4 text-gray-500 text-sm">Page not found</p>
      <Link
        href="/"
        className="mt-6 text-sm text-blue-500 hover:text-blue-600 transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
}
