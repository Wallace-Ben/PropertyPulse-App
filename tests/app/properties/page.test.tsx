import { render, screen } from "@testing-library/react";
import Page from "@/app/properties/page";
import React from "react";
import { Property } from "@/types/property";

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

describe("Properties Page", () => {
  it("renders all properties from JSON", async () => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProperties),
      })
    );
    const page = await Page();
    render(page);

    mockProperties.forEach((p) => {
      expect(screen.getByText(p.name)).toBeInTheDocument();
    });
  });

  it("renders fallback when list is empty", async () => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );
    const page = await Page();
    render(page);
    expect(screen.getByText(/no properties found/i)).toBeInTheDocument();
  });
});
