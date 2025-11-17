import { render, screen } from "@testing-library/react";
import Page from "@/app/properties/page";
import properties from "@/properties.json";
import React from "react";

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
  it("renders all properties from JSON", () => {
    render(<Page />);

    properties.forEach((p) => {
      expect(screen.getByText(p.name)).toBeInTheDocument();
    });
  });

  it("renders fallback when list is empty", () => {
    render(<Page properties={[]} />);
    expect(screen.getByText(/no properties found/i)).toBeInTheDocument();
  });
});
