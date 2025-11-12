import { render, screen, within } from "@testing-library/react";
import Hero from "@/components/Hero";
import "@testing-library/jest-dom";
import React from "react";
import heroText from "@/locales/hero";

describe("Hero", () => {
  it("should render Hero components", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", { name: heroText.heading_main_hero })
    ).toBeInTheDocument();

    expect(screen.getByText(heroText.tagline_hero)).toBeInTheDocument();

    const locationInputBox = screen.getByLabelText(heroText.label_location);
    expect(locationInputBox).toBeInTheDocument();
    expect(locationInputBox).toHaveAttribute(
      "placeholder",
      heroText.placeholder_enter_location
    );

    const propertyTypeDropdown = screen.getByLabelText(
      heroText.label_property_type
    );
    expect(propertyTypeDropdown).toBeInTheDocument();
    const options = within(propertyTypeDropdown).getAllByRole("option");
    expect(options).toHaveLength(9);

    expect(options.map((o) => o.textContent)).toEqual([
      heroText.dropdown_option_all,
      heroText.dropdown_option_apartment,
      heroText.dropdown_option_studio,
      heroText.dropdown_option_condo,
      heroText.dropdown_option_house,
      heroText.dropdown_option_cabin,
      heroText.dropdown_option_loft,
      heroText.dropdown_option_room,
      heroText.dropdown_option_other,
    ]);

    const option = screen.getByRole("option", {
      name: heroText.dropdown_option_all,
    }) as HTMLOptionElement;

    expect(option.selected).toBe(true);

    expect(
      screen.getByRole("button", { name: heroText.button_search })
    ).toBeInTheDocument();
  });
});
