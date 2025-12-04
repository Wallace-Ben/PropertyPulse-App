import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

interface Props {
  linkText: string;
}

const BackLink = ({ linkText }: Props): React.JSX.Element => {
  return (
    <section>
      <div className="container m-auto py-6 px-6">
        <Link
          href="/properties"
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" /> {linkText}
        </Link>
      </div>
    </section>
  );
};

export default BackLink;
