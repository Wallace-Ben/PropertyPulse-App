import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { Property } from "@/types/property";
import Homepage from "../../app/page";
import { mockProperties } from "../mockData/propertyMockData";

jest.mock("@/components/PropertyCard", () => {
  const MockCard: React.FC<{ property: Property }> = ({ property }) => (
    <div data-testid="property-card">{property._id}</div>
  );
  return MockCard;
});

afterEach(() => cleanup());

describe("HomeProperties (basic rendering)", () => {
  it("renders the Recent Properties heading", async () => {
    const homepage = await Homepage();
    render(homepage);
    expect(
      screen.getByRole("heading", { name: /recent properties/i })
    ).toBeInTheDocument();
  });

  it("renders the View All Properties link", async () => {
    const homepage = await Homepage();
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
    const homepage = await Homepage();
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
    const homepage = await Homepage();
    render(homepage);

    const propertyCards = await screen.getAllByTestId("property-card");
    const renderedOrder = propertyCards.map((card) => card.textContent);

    expect(renderedOrder).not.toEqual(originalOrder);
  });
});
