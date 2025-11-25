import { render, screen } from "@testing-library/react";
import Page from "../../app/page";
import "@testing-library/jest-dom";
import heroText from "@/locales/hero";
import infoBoxesText from "@/locales/infoBoxes";

describe("Home Page", () => {
  it("renders Hero and InfoBoxes sections", async () => {
    const page = await Page();
    render(page);

    expect(
      screen.getByRole("heading", { name: heroText.heading_main_hero })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: infoBoxesText.heading_owners })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: infoBoxesText.heading_renters })
    ).toBeInTheDocument();
  });

  it("contains the navigation links from InfoBoxes", async () => {
    const page = await Page();
    render(page);

    const browseLink = screen.getByRole("link", {
      name: infoBoxesText.button_browse_properties,
    });

    const addLink = screen.getByRole("link", {
      name: infoBoxesText.button_add_property,
    });

    expect(browseLink).toHaveAttribute("href", "/properties");
    expect(addLink).toHaveAttribute("href", "/properties/add");
  });
});
