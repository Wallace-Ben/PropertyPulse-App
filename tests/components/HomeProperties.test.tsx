import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { Property } from "@/types/property";

jest.mock("@/components/PropertyCard", () => {
  const MockCard: React.FC<{ property: Property }> = ({ property }) => (
    <div data-testid="property-card">{property._id}</div>
  );
  return MockCard;
});

const mockProperties: Property[] = [
  {
    _id: "1",
    owner: "1",
    name: "Test Property",
    type: "House",
    description: "desc",
    location: { street: "", city: "", state: "", zipcode: "" },
    beds: 1,
    baths: 1,
    square_feet: 100,
    amenities: [],
    rates: {},
    seller_info: { name: "", email: "", phone: "" },
    images: [],
    is_featured: false,
    createdAt: "",
    updatedAt: "",
  },
];

jest.mock("@/properties.json", () => mockProperties, { virtual: true });

import HomeProperties from "@/components/HomeProperties";

afterEach(() => cleanup());

describe("HomeProperties (basic rendering)", () => {
  it("renders the Recent Properties heading", () => {
    render(<HomeProperties />);
    expect(
      screen.getByRole("heading", { name: /recent properties/i })
    ).toBeInTheDocument();
  });

  it("renders the View All Properties link", () => {
    render(<HomeProperties />);
    const link = screen.getByRole("link", { name: /view all properties/i });
    expect(link).toHaveAttribute("href", "/properties");
  });

  it("renders PropertyCard(s)", async () => {
    render(<HomeProperties />);
    const cards = await screen.findAllByTestId("property-card");
    expect(cards.length).toBeGreaterThan(0);
  });
});
