import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/types/property";
import { fetchProperties } from "@/lib/fetchProperties";

export default async function Page() {
  const properties = await fetchProperties();
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            properties.map((property: Property) => (
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
