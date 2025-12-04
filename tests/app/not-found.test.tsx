import { render, screen } from "@testing-library/react";
import NotFoundPage from "../../app/not-found";
import "@testing-library/jest-dom";
import notFoundText from "@/locales/notFound";

describe("NotFoundPage", () => {
  test("renders the heading", () => {
    render(<NotFoundPage />);
    expect(
      screen.getByRole("heading", { name: notFoundText.page_not_found })
    ).toBeInTheDocument();
  });

  test("renders the message text", () => {
    render(<NotFoundPage />);
    expect(
      screen.getByText(notFoundText.page_does_not_exist)
    ).toBeInTheDocument();
  });

  test("renders the home link", () => {
    render(<NotFoundPage />);
    const homeLink = screen.getByRole("link", { name: notFoundText.go_home });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  test("renders the warning icon", () => {
    render(<NotFoundPage />);
    expect(screen.getByTestId("notFoundIcon")).toBeInTheDocument();
  });
});
