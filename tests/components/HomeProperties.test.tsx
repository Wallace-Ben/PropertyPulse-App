import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { Property } from "@/types/property";
import Page from "../../app/page";

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
    name: "Test Property 1",
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
  {
    _id: "2",
    owner: "2",
    name: "Test Property 2",
    type: "Apartment",
    description: "desc",
    location: { street: "", city: "", state: "", zipcode: "" },
    beds: 2,
    baths: 1,
    square_feet: 200,
    amenities: [],
    rates: {},
    seller_info: { name: "", email: "", phone: "" },
    images: [],
    is_featured: false,
    createdAt: "",
    updatedAt: "",
  },
  {
    _id: "3",
    owner: "3",
    name: "Test Property 3",
    type: "Condo",
    description: "desc",
    location: { street: "", city: "", state: "", zipcode: "" },
    beds: 3,
    baths: 2,
    square_feet: 300,
    amenities: [],
    rates: {},
    seller_info: { name: "", email: "", phone: "" },
    images: [],
    is_featured: true,
    createdAt: "",
    updatedAt: "",
  },
];

afterEach(() => cleanup());

describe("HomeProperties (basic rendering)", () => {
  it("renders the Recent Properties heading", async () => {
    const homepage = await Page();
    render(homepage);
    expect(
      screen.getByRole("heading", { name: /recent properties/i })
    ).toBeInTheDocument();
  });

  it("renders the View All Properties link", async () => {
    const homepage = await Page();
    render(homepage);
    const link = screen.getByRole("link", { name: /view all properties/i });
    expect(link).toHaveAttribute("href", "/properties");
  });

  it("renders PropertyCard(s)", async () => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProperties),
      })
    );
    const homepage = await Page();
    render(homepage);
    const cards = await screen.findAllByTestId("property-card");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("shuffles the property object", async () => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProperties),
      })
    );
    jest
      .spyOn(Math, "random")
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.9)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.8)
      .mockReturnValue(0.1);

    const originalOrder = ["1", "2", "3"];
    const homepage = await Page();
    render(homepage);

    const propertyCards = await screen.getAllByTestId("property-card");
    const renderedOrder = propertyCards.map((card) => card.textContent);

    expect(renderedOrder).not.toEqual(originalOrder);
  });
});
