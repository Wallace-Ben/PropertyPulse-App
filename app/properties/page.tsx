import propertiesJson from "@/properties.json";
import PropertyCard from "@/components/PropertyCard";

export default function Page({
  properties = propertiesJson,
}: {
  properties?: typeof propertiesJson;
}) {
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            properties.map((property) => (
              <div key={property._id}>
                <PropertyCard property={property} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
