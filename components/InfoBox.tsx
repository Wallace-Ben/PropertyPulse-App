import React from "react";

type ButtonInfo = {
  link: string;
  backgroundColour: string;
  text: string;
};

type InfoBoxProps = {
  heading: string;
  backgroundColour?: string;
  textColour?: string;
  buttonInfo: ButtonInfo;
  children: string;
};

const InfoBox = ({
  heading,
  backgroundColour = "bg-gray-100",
  textColour = "text-gray-800",
  buttonInfo,
  children,
}: InfoBoxProps): React.JSX.Element => {
  return (
    <div className={`${backgroundColour} p-6 rounded-lg shadow-md`}>
      <h2 className={`text-2xl font-bold ${textColour}`}>{heading}</h2>
      <p className="mt-2 mb-4">{children}</p>
      <a
        href={buttonInfo.link}
        className={`inline-block ${buttonInfo.backgroundColour} text-white rounded-lg px-4 py-2 hover:bg-gray-700 hover:opacity-80`}
      >
        {buttonInfo.text}
      </a>
    </div>
  );
};

export default InfoBox;
