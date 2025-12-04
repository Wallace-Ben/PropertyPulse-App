import React from "react";
import Sidebar from "./Sidebar";
import PropertyDetails from "./PropertyDetails";
import { Property } from "@/types/property";
import ContactSection from "./ContactSection";

interface Props {
  property: Property;
}

const PropertyLayout = ({ property }: Props): React.JSX.Element => {
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <PropertyDetails property={property} />
          <aside className="space-y-4">
            <Sidebar />
            <ContactSection />
          </aside>
        </div>
      </div>
    </section>
  );
};

export default PropertyLayout;
