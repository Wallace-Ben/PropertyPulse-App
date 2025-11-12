import React from "react";
import InfoBox from "./InfoBox";
import infoBoxesText from "@/locales/infoBoxes";

const InfoBoxes = (): React.JSX.Element => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading={infoBoxesText.heading_renters}
            backgroundColour="bg-gray-100"
            buttonInfo={{
              text: infoBoxesText.button_browse_properties,
              link: "/properties",
              backgroundColour: "bg-black",
            }}
          >
            {infoBoxesText.find_your_dream_rental}
          </InfoBox>
          <InfoBox
            heading={infoBoxesText.heading_owners}
            backgroundColour="bg-blue-100"
            buttonInfo={{
              text: infoBoxesText.button_add_property,
              link: "/properties/add",
              backgroundColour: "bg-blue-500",
            }}
          >
            {infoBoxesText.list_your_properties}
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
