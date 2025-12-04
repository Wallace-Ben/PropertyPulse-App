import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyDetails from "@/components/PropertyDetails";
import { mockProperty } from "@/tests/mockData/propertyMockData";

describe("PropertyDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the property name and type", () => {
    render(<PropertyDetails property={mockProperty} />);

    expect(
      screen.getByRole("heading", { name: mockProperty.name })
    ).toBeInTheDocument();

    expect(screen.getByText(mockProperty.type)).toBeInTheDocument();
  });

  it("renders the property address", () => {
    render(<PropertyDetails property={mockProperty} />);

    expect(
      screen.getByText(
        `${mockProperty.location.street} ${mockProperty.location.city}, ${mockProperty.location.state} ${mockProperty.location.zipcode}`
      )
    ).toBeInTheDocument();
  });

  it("renders rates (nightly, weekly, monthly)", () => {
    render(<PropertyDetails property={mockProperty} />);

    console.log("RATES RECEIVED:", mockProperty.rates);

    expect(
      screen.getByText(`$${mockProperty.rates.nightly}`)
    ).toBeInTheDocument();

    expect(
      screen.getByText(`$${mockProperty.rates.weekly}`)
    ).toBeInTheDocument();

    expect(
      screen.getByText(`$${mockProperty.rates.monthly}`)
    ).toBeInTheDocument();
  });

  it("renders the fallback icon when rates are missing", () => {
    const noRatesProperty = {
      ...mockProperty,
      rates: {
        nightly: undefined,
        weekly: undefined,
        monthly: undefined,
      },
    };

    const { container } = render(
      <PropertyDetails property={noRatesProperty} />
    );

    const fallbackIcons = container.querySelectorAll("svg.text-red-700");

    expect(fallbackIcons.length).toBe(3);
  });

  it("renders beds, baths and square_feet", () => {
    render(<PropertyDetails property={mockProperty} />);

    expect(screen.getByText(mockProperty.beds.toString())).toBeInTheDocument();
    expect(screen.getByText(mockProperty.baths.toString())).toBeInTheDocument();
    expect(
      screen.getByText(mockProperty.square_feet.toString())
    ).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<PropertyDetails property={mockProperty} />);

    expect(screen.getByText(mockProperty.description)).toBeInTheDocument();
  });

  it("renders all amenities", () => {
    render(<PropertyDetails property={mockProperty} />);

    mockProperty.amenities.forEach((amenity) => {
      expect(screen.getByText(amenity)).toBeInTheDocument();
    });
  });

  it("renders the map container", () => {
    render(<PropertyDetails property={mockProperty} />);

    expect(screen.getByTestId("map")).toBeInTheDocument();
  });
});
