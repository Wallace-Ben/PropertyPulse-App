import { render, screen } from "@testing-library/react";
import RootLayout from "../../app/layout";
import { metadata } from "../../app/layout";

describe("RootLayout", () => {
  it("should have correct metadata values", () => {
    expect(metadata.title).toBe("PropertyPulse | Find The Perfect Rental");
  });

  it("should render children correctly", () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });
});
