import { render, screen } from "@testing-library/react";
import PropertiesPage from "@/app/properties/page";
import React from "react";
import { mockProperties } from "@/tests/mockData/propertyMockData";

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

describe("Properties Page", () => {
  it("renders all properties from JSON", async () => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProperties),
      })
    );
    const page = await PropertiesPage();
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
    const page = await PropertiesPage();
    render(page);
    expect(screen.getByText(/no properties found/i)).toBeInTheDocument();
  });
});
