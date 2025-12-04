import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BackLink from "@/components/BackLink";
import React from "react";

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

describe("BackLink", () => {
  it("renders the link text", () => {
    render(<BackLink linkText="Back to properties" />);

    expect(
      screen.getByRole("link", { name: /back to properties/i })
    ).toBeInTheDocument();
  });

  it("points to /properties", () => {
    render(<BackLink linkText="Go Back" />);

    expect(screen.getByRole("link", { name: /go back/i })).toHaveAttribute(
      "href",
      "/properties"
    );
  });
});
