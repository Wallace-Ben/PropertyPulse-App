import {
  fireEvent,
  render,
  screen,
  cleanup,
  within,
} from "@testing-library/react";
import NavBar from "../../components/NavBar";
import "@testing-library/jest-dom";
import React from "react";
import { usePathname } from "next/navigation";
import navbarText from "@/locales/navbar";

jest.mock("next/image", () => {
  const MockImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement("img", props);

  MockImage.displayName = "MockNextImage";

  return MockImage;
});

jest.mock("next/link", () => {
  type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children: React.ReactNode;
  };

  const MockLink = (props: LinkProps) => {
    const { href, children, ...rest } = props;
    return React.createElement("a", { href, ...rest }, children);
  };

  MockLink.displayName = "MockNextLink";

  return {
    __esModule: true,
    default: MockLink,
  };
});

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.Mock;

afterEach(() => {
  cleanup();
});

describe("NavBar", () => {
  describe("Mobile & Desktop - independent of login status (default logged in)", () => {
    beforeEach(() => render(<NavBar testLoggedIn />));

    it("has accessible roles for main navigation", () => {
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("Should render the logo and shared main navigation links", () => {
      const homeLinkLogo = screen.getByRole("link", {
        name: navbarText.property_pulse,
      });
      expect(homeLinkLogo).toHaveAttribute("href", "/");
      const logoImg = homeLinkLogo.querySelector("img");
      expect(logoImg).toBeInTheDocument();

      expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
        "href",
        "/"
      );

      expect(screen.getByRole("link", { name: /properties/i })).toHaveAttribute(
        "href",
        "/properties"
      );
    });
  });

  describe("Mobile & Desktop - logged in status", () => {
    beforeEach(() => render(<NavBar testLoggedIn />));

    it("should render the notification icon and badge", () => {
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

    it("toggles profile menu when button is clicked", () => {
      const profileMenuButton = screen.getByRole("button", {
        name: /open user menu/i,
      });

      expect(profileMenuButton).toBeInTheDocument();

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

    it("should display the correct menu item content in the profile menu", () => {
      const profileMenuButton = screen.getByRole("button", {
        name: /open user menu/i,
      });

      fireEvent.click(profileMenuButton);

      const yourProfileLink = screen.getByRole("menuitem", {
        name: navbarText.link_your_profile,
      });

      expect(yourProfileLink).toBeInTheDocument(); // Check conditional element exists
      expect(yourProfileLink).toHaveTextContent("Your Profile"); // Check text content is correct

      const savedPropertiesLink = screen.getByRole("menuitem", {
        name: navbarText.link_saved_properties,
      });

      expect(savedPropertiesLink).toBeInTheDocument(); // Check conditional element exists
      expect(savedPropertiesLink).toHaveTextContent("Saved Properties"); // Check text content is correct

      const signOutLink = screen.getByRole("menuitem", {
        name: navbarText.link_sign_out,
      });

      expect(signOutLink).toBeInTheDocument(); // Check conditional element exists
      expect(signOutLink).toHaveTextContent("Sign Out"); // Check text content is corrects
    });
  });

  describe("Desktop view only", () => {
    describe("Logged in", () => {
      beforeEach(() => render(<NavBar testLoggedIn />));

      it("should render remaining navigation links when logged in", () => {
        const addPropertyLink = screen.getByRole("link", {
          name: navbarText.link_add_property,
        });
        expect(addPropertyLink).toBeInTheDocument(); // Check conditional element exists
        expect(addPropertyLink).toHaveTextContent("Add Property"); // Check text content is correct
      });

      it("does not render Login or Register button when logged in", () => {
        expect(screen.queryByText("Login or Register")).not.toBeInTheDocument();
      });
    });
    describe("Logged out", () => {
      beforeEach(() => render(<NavBar />));

      it("should render login or register text when not logged in", () => {
        const loginOrRegisterButton = screen.getByRole("button", {
          name: navbarText.button_login_or_register,
        });
        expect(loginOrRegisterButton).toBeInTheDocument(); // Check conditional element exists
        expect(loginOrRegisterButton).toHaveTextContent("Login or Register"); // Check text content is correct
      });

      it("does not render Add Property link when logged out", () => {
        expect(screen.queryByText("Add Property")).not.toBeInTheDocument();
      });
    });

    describe("Highlighting navigation tabs", () => {
      it("should highlight the home link when on the home page", () => {
        mockUsePathname.mockReturnValue("/");
        render(<NavBar testLoggedIn />);
        const homeLink = screen.getByRole("link", { name: /home/i });
        expect(homeLink).toHaveClass("bg-black");
      });

      it("should highlight the properties link when on the properties page", () => {
        mockUsePathname.mockReturnValue("/properties");
        render(<NavBar testLoggedIn />);
        const propertiesLink = screen.getByRole("link", {
          name: /properties/i,
        });
        expect(propertiesLink).toHaveClass("bg-black");
      });

      it("should highlight the add property link when on the properties page", () => {
        mockUsePathname.mockReturnValue("/properties");
        render(<NavBar testLoggedIn />);
        const propertiesLink = screen.getByRole("link", {
          name: /properties/i,
        });
        expect(propertiesLink).toHaveClass("bg-black");
      });
    });
  });

  describe("Mobile view only", () => {
    describe("Independent of login status", () => {
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
        expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();

        fireEvent.click(mobileMenuButton);

        // Check menu closes on button click
        expect(mobileMenuButton).toHaveAttribute("aria-expanded", "false");
        expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
      });
    });

    describe("Logged in", () => {
      it("should render the add property link in mobile menu when logged in", () => {
        render(<NavBar testLoggedIn />);

        const mobileMenuButton = screen.getByRole("button", {
          name: /open main menu/i,
        });

        fireEvent.click(mobileMenuButton);
        const mobileMenu = screen.getByTestId("mobile-menu");

        const propertiesAddLink = within(mobileMenu).getByRole("link", {
          name: navbarText.link_add_property,
        });
        expect(propertiesAddLink).toBeInTheDocument(); // Check conditional element exists
        expect(propertiesAddLink).toHaveTextContent("Add Property"); // Check text content is correct
      });
    });
    describe("Logged out", () => {
      it("should render the login or register button in the mobile dropdown when logged out", () => {
        render(<NavBar />);
        const mobileMenuButton = screen.getByRole("button", {
          name: /open main menu/i,
        });

        fireEvent.click(mobileMenuButton);
        const mobileMenu = screen.getByTestId("mobile-menu");

        const loginOrRegisterButton = within(mobileMenu).getByRole("button", {
          name: navbarText.button_login_or_register,
        });
        expect(loginOrRegisterButton).toBeInTheDocument(); // Check conditional element exists
        expect(loginOrRegisterButton).toHaveTextContent("Login or Register"); // Check text content is correct
      });
    });

    describe("Highlighting mobile navigation tabs", () => {
      it("should highlight the home mobile menu link when on the home page", () => {
        mockUsePathname.mockReturnValue("/");
        render(<NavBar testLoggedIn />);

        const mobileMenuButton = screen.getByRole("button", {
          name: /open main menu/i,
        });

        fireEvent.click(mobileMenuButton);
        const mobileMenu = screen.getByTestId("mobile-menu");

        const homeLink = within(mobileMenu).getByRole("link", {
          name: navbarText.link_home,
        });

        expect(homeLink).toHaveClass("bg-gray-900");
      });

      it("should highlight the properties mobile menu link when on the properties page", () => {
        mockUsePathname.mockReturnValue("/properties");
        render(<NavBar testLoggedIn />);

        const mobileMenuButton = screen.getByRole("button", {
          name: /open main menu/i,
        });

        fireEvent.click(mobileMenuButton);
        const mobileMenu = screen.getByTestId("mobile-menu");

        const propertiesLink = within(mobileMenu).getByRole("link", {
          name: navbarText.link_properties,
        });
        expect(propertiesLink).toHaveClass("bg-gray-900");
      });

      it("should highlight the add property mobile menu link when on the properties page", () => {
        mockUsePathname.mockReturnValue("/properties/add");
        render(<NavBar testLoggedIn />);

        const mobileMenuButton = screen.getByRole("button", {
          name: /open main menu/i,
        });

        fireEvent.click(mobileMenuButton);
        const mobileMenu = screen.getByTestId("mobile-menu");
        const propertiesAddLink = within(mobileMenu).getByRole("link", {
          name: navbarText.link_add_property,
        });
        expect(propertiesAddLink).toHaveClass("bg-gray-900");
      });
    });
  });
});
