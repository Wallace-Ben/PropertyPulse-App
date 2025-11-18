import { render, screen, cleanup } from "@testing-library/react";
import Footer from "@/components/Footer";
import "@testing-library/jest-dom";
import React from "react";
import footerText from "@/locales/footer";

jest.mock("next/image", () => {
  const MockImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement("img", props);

  MockImage.displayName = "MockNextImage";

  return MockImage;
});

afterEach(() => {
  cleanup();
});

describe("Footer", () => {
  it("should render footer image", () => {
    render(<Footer />);

    const logoImage = screen.getByAltText("Logo");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("src");
  });

  it("should render the correct copyright text with current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} ${footerText.all_rights_reserved}`)
    ).toBeInTheDocument();
  });
});
