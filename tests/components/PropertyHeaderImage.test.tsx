import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import React from "react";

jest.mock("next/image", () => {
  const MockImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement("img", props);
  MockImage.displayName = "MockNextImage";
  return MockImage;
});

describe("PropertyHeaderImage", () => {
  it("renders an image with the correct src", () => {
    render(<PropertyHeaderImage image="test.jpg" />);

    const img = screen.getByAltText("");
    expect(img).toHaveAttribute("src", "/images/properties/test.jpg");
  });

  it("renders with an empty alt attribute (intended)", () => {
    render(<PropertyHeaderImage image="pic.png" />);

    const img = screen.getByAltText("");
    expect(img).toHaveAttribute("alt", "");
  });
});
