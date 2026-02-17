import { NextPageContext } from "next";

interface ErrorProps {
  statusCode?: number;
}

export default function Error({ statusCode }: ErrorProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white max-w-md mx-auto px-6">
      <h1 className="text-6xl font-bold text-gray-200">
        {statusCode || "Error"}
      </h1>
      <p className="mt-4 text-gray-500 text-sm">
        {statusCode
          ? `A ${statusCode} error occurred on the server`
          : "An error occurred on the client"}
      </p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
