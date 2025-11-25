"use client";
import React, { useEffect, useState, startTransition } from "react";
import PropertyCard from "./PropertyCard";
import type { Property } from "@/types/property";
import Link from "next/link";
import homePropertiesText from "@/locales/homeProperties";

export default function HomeProperties({
  properties,
}: {
  properties: Property[];
}) {
  const [recentProperties, setRecentProperties] = useState<Property[]>([]);

  useEffect(() => {
    startTransition(() => {
      if (properties.length === 0) {
        setRecentProperties([]);
        return;
      }
      const shuffled = properties
        .slice()
        .sort(() => Math.random() - Math.random())
        .slice(0, 3);

      setRecentProperties(shuffled);
    });
  }, [properties]);

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            {homePropertiesText.header_recent_properties}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProperties.length === 0 && properties.length === 0 ? (
              <p>{homePropertiesText.text_no_properties_found}</p>
            ) : recentProperties.length === 0 ? (
              <p>{homePropertiesText.text_loading}</p>
            ) : (
              recentProperties.map((p) => (
                <PropertyCard key={p._id} property={p} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          {homePropertiesText.link_view_properties}
        </Link>
      </section>
    </>
  );
}
