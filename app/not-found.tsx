import notFoundText from "@/locales/notFound";
import Link from "next/link";
import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFoundPage(): React.JSX.Element {
  return (
    <section className="bg-blue-50 min-h-screen flex-grow">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-24 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <div className="flex justify-center">
            <FaExclamationTriangle
              data-testid="notFoundIcon"
              className="fas fa-exclamation-triangle fa-5x text-8xl text-yellow-400"
            />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mt-4 mb-2">
              {notFoundText.page_not_found}
            </h1>
            <p className="text-gray-500 text-xl mb-10">
              {notFoundText.page_does_not_exist}
            </p>
            <Link
              href="/"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded"
            >
              {notFoundText.go_home}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
    </section>
  );
}
