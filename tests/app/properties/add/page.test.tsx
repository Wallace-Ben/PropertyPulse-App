import { render, screen } from "@testing-library/react";
import AddPropertyPage from "../../../../app/properties/add/page";
import "@testing-library/jest-dom";

describe("Property add page", () => {
  it("renders the page heading", () => {
    render(<AddPropertyPage />);

    expect(
      screen.getByRole("heading", { name: /add a property/i })
    ).toBeInTheDocument();
  });
});
