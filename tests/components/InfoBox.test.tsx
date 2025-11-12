import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InfoBox from "../../components/InfoBox";

describe("InfoBox Component", () => {
  const defaultProps = {
    heading: "For Renters",
    buttonInfo: {
      text: "Browse Properties",
      link: "/properties",
      backgroundColour: "bg-black",
    },
    children: "Find your dream rental property.",
  };

  it("renders the heading text", () => {
    render(<InfoBox {...defaultProps} />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent(defaultProps.heading);
  });

  it("renders the description text (children)", () => {
    render(<InfoBox {...defaultProps} />);
    expect(screen.getByText(defaultProps.children)).toBeInTheDocument();
  });

  it("renders a button link with correct text and href", () => {
    render(<InfoBox {...defaultProps} />);
    const button = screen.getByRole("link", {
      name: defaultProps.buttonInfo.text,
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", defaultProps.buttonInfo.link);
  });

  it("applies default background and text colours when not provided", () => {
    render(
      <InfoBox heading="Default Colors" buttonInfo={defaultProps.buttonInfo}>
        Default styling test.
      </InfoBox>
    );

    const box = screen
      .getByRole("heading", { name: "Default Colors" })
      .closest("div");
    expect(box).toHaveClass("bg-gray-100"); // default backgroundColour
    expect(screen.getByRole("heading", { name: "Default Colors" })).toHaveClass(
      "text-gray-800" // default textColour
    );
  });

  it("applies custom background and text colours when provided", () => {
    render(
      <InfoBox
        heading="Custom Colors"
        backgroundColour="bg-blue-200"
        textColour="text-red-500"
        buttonInfo={defaultProps.buttonInfo}
      >
        Custom styling test.
      </InfoBox>
    );

    const box = screen
      .getByRole("heading", { name: "Custom Colors" })
      .closest("div");
    expect(box).toHaveClass("bg-blue-200");
    expect(screen.getByRole("heading", { name: "Custom Colors" })).toHaveClass(
      "text-red-500"
    );
  });
});
