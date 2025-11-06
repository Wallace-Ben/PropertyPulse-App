import { fireEvent, render, screen } from "@testing-library/react";
import NavBar from "../../components/NavBar";
import "@testing-library/jest-dom";

import React from "react";

jest.mock("next/image", () => {
  const MockImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement("img", props);

  MockImage.displayName = "MockNextImage";

  return MockImage;
});

jest.mock("next/link", () => {
  type LinkProps = {
    href: string;
    children: React.ReactNode;
  };

  const MockLink = ({ href, children }: LinkProps) =>
    React.createElement("a", { href }, children);

  MockLink.displayName = "MockNextLink";

  return MockLink;
});

describe("NavBar", () => {
  it("renders the logo and main navigation links", () => {
    render(<NavBar />);

    const homeLinkLogo = screen.getByRole("link", { name: /propertypulse/i });
    expect(homeLinkLogo).toHaveAttribute("href", "/");
    expect(homeLinkLogo).toContainElement(screen.getByAltText("PropertyPulse"));

    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
      "href",
      "/"
    );

    expect(screen.getByRole("link", { name: /properties/i })).toHaveAttribute(
      "href",
      "/properties"
    );

    expect(screen.getByRole("link", { name: /add property/i })).toHaveAttribute(
      "href",
      "/properties/add"
    );
  });

  it("renders the notification icon and badge", () => {
    render(<NavBar />);

    const notificationsLink = screen.getByRole("link", {
      name: /view notifications/i,
    });
    const notificationsButton = screen.getByRole("button", {
      name: /view notifications/i,
    });

    expect(notificationsLink).toBeInTheDocument();
    expect(notificationsButton).toBeInTheDocument();

    const badge = screen.getByTestId("notification-badge");
    expect(badge).toBeInTheDocument();
    expect(badge.textContent?.trim()).not.toBe("");
  });

  it("toggles mobile menu visibility and aria-expanded when button is clicked", () => {
    render(<NavBar />);

    const mobileMenuButton = screen.getByRole("button", {
      name: /open main menu/i,
    });

    // Check menu is closed on page load
    expect(mobileMenuButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();

    fireEvent.click(mobileMenuButton);

    // Check menu opens on button click
    expect(mobileMenuButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.queryByTestId("mobile-menu")).toBeInTheDocument();

    fireEvent.click(mobileMenuButton);

    // Check menu closes on button click
    expect(mobileMenuButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });

  it("toggles profile menu when button is clicked", () => {
    render(<NavBar />);

    const profileMenuButton = screen.getByRole("button", {
      name: /open user menu/i,
    });

    // Check menu is closed on page load
    expect(profileMenuButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByTestId("profile-menu")).not.toBeInTheDocument();

    fireEvent.click(profileMenuButton);

    // Check menu opens on button click
    expect(profileMenuButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.queryByTestId("profile-menu")).toBeInTheDocument();

    fireEvent.click(profileMenuButton);

    // Check menu closes on button click
    expect(profileMenuButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByTestId("profile-menu")).not.toBeInTheDocument();
  });
});
