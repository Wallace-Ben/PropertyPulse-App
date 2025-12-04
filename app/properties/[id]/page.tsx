"use client";
import React from "react";
import { fetchProperty } from "@/lib/fetchProperty";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Property } from "@/types/property";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import BackLink from "@/components/BackLink";
import PropertyLayout from "@/components/PropertyLayout";
import Spinner from "@/components/Spinner";

export default function PropertyPage() {
  const { id } = useParams<{ id: string }>();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.error("Error fetching property", error);
      } finally {
        setLoading(false);
      }
    };
    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property not found
      </h1>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <BackLink linkText="Back to properties" />
          <PropertyLayout property={property} />
        </>
      )}
    </>
  );
}
