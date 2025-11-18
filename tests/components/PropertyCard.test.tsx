import { render, screen } from "@testing-library/react";
import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/types/property";
import React from "react";
import propertyCardText from "@/locales/propertyCard";

jest.mock("next/image", () => {
  const MockImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement("img", props);

  MockImage.displayName = "MockNextImage";

  return MockImage;
});
jest.mock("next/link", () => {
  type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children: React.ReactNode;
  };

  const MockLink = (props: LinkProps) => {
    const { href, children, ...rest } = props;
    return React.createElement("a", { href, ...rest }, children);
  };

  MockLink.displayName = "MockNextLink";

  return {
    __esModule: true,
    default: MockLink,
  };
});

const baseProperty: Property = {
  _id: "123",
  owner: "1",
  name: "Test Property",
  type: "Apartment",
  description: "",
  location: { street: "", city: "Boston", state: "MA", zipcode: "" },
  beds: 2,
  baths: 1,
  square_feet: 900,
  amenities: [],
  rates: {},
  seller_info: { name: "", email: "", phone: "" },
  images: ["test.jpg"],
  is_featured: false,
  createdAt: "",
  updatedAt: "",
};

describe("PropertyCard", () => {
  it("renders monthly rate", () => {
    const property: Property = {
      ...baseProperty,
      rates: { monthly: 4000 },
    };

    render(<PropertyCard property={property} />);
    expect(
      screen.getByText(
        `${propertyCardText.currency_american}${property.rates.monthly}${propertyCardText.per_month}`
      )
    ).toBeInTheDocument();
  });

  it("renders weekly rate", () => {
    const property: Property = {
      ...baseProperty,
      rates: { weekly: 1200 },
    };

    render(<PropertyCard property={property} />);
    expect(
      screen.getByText(
        `${propertyCardText.currency_american}${property.rates.weekly}${propertyCardText.per_week}`
      )
    ).toBeInTheDocument();
  });

  it("renders nightly rate", () => {
    const property: Property = {
      ...baseProperty,
      rates: { nightly: 250 },
    };

    render(<PropertyCard property={property} />);
    expect(
      screen.getByText(
        `${propertyCardText.currency_american}${property.rates.nightly}${propertyCardText.per_night}`
      )
    ).toBeInTheDocument();
  });

  it("renders location", () => {
    const property: Property = {
      ...baseProperty,
      rates: { weekly: 1000 },
    };

    render(<PropertyCard property={property} />);
    expect(screen.getByText("Boston, MA")).toBeInTheDocument();
  });

  it("renders details link", () => {
    const property: Property = {
      ...baseProperty,
      rates: { weekly: 1000 },
    };

    render(<PropertyCard property={property} />);

    expect(
      screen.getByRole("link", { name: propertyCardText.details })
    ).toHaveAttribute("href", "/properties/123");
  });
});
