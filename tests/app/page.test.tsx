import { render, screen } from "@testing-library/react";
import Page from "../../app/page";
import "@testing-library/jest-dom";

describe("Home Page", () => {
  it("renders the heading and link", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", { name: /welcome/i })
    ).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /show properties/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/properties");
  });
});
