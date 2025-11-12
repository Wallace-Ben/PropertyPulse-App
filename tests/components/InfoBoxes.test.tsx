import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InfoBoxes from "../../components/InfoBoxes";
import infoBoxesText from "@/locales/infoBoxes";

describe("InfoBoxes Component", () => {
  beforeEach(() => {
    render(<InfoBoxes />);
  });

  it("renders both info boxes", () => {
    const headings = screen.getAllByRole("heading");
    expect(headings).toHaveLength(2);

    expect(
      screen.getByRole("heading", { name: infoBoxesText.heading_renters })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: infoBoxesText.heading_owners })
    ).toBeInTheDocument();
  });

  it("renders the correct descriptive text for each box", () => {
    expect(
      screen.getByText(infoBoxesText.find_your_dream_rental)
    ).toBeInTheDocument();

    expect(
      screen.getByText(infoBoxesText.list_your_properties)
    ).toBeInTheDocument();
  });

  it("renders the correct action buttons with correct text and links", () => {
    const browseButton = screen.getByRole("link", {
      name: infoBoxesText.button_browse_properties,
    });
    expect(browseButton).toBeInTheDocument();
    expect(browseButton).toHaveAttribute("href", "/properties");

    const addPropertyButton = screen.getByRole("link", {
      name: infoBoxesText.button_add_property,
    });
    expect(addPropertyButton).toBeInTheDocument();
    expect(addPropertyButton).toHaveAttribute("href", "/properties/add");
  });

  it("renders the correct number of buttons", () => {
    const buttons = screen.getAllByRole("link");
    expect(buttons).toHaveLength(2);
  });
});
