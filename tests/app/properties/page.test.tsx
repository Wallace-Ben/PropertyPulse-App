import { render, screen } from "@testing-library/react";
import Page from "../../../app/properties/page";
import "@testing-library/jest-dom";

describe("Properties Page", () => {
  it("renders the heading and link", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", { name: /properties/i })
    ).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /go home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
