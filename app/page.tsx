import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HomeProperties";
import { Property } from "@/types/property";
import { fetchProperties } from "@/lib/fetchProperties";

export default async function Homepage() {
  const properties: Property[] = await fetchProperties();
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties properties={properties} />
    </>
  );
}
