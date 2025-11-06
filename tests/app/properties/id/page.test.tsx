import { render, screen } from "@testing-library/react";
import Page from "../../../../app/properties/[id]/page";
import "@testing-library/jest-dom";

describe("Property Page", () => {
  it("renders the heading", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", { name: /property page/i })
    ).toBeInTheDocument();
  });
});
