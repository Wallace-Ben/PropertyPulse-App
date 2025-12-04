import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactSection from "@/components/ContactSection";

describe("ContactSection", () => {
  it("renders the heading", () => {
    render(<ContactSection />);
    expect(
      screen.getByRole("heading", { name: /contact property manager/i })
    ).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    render(<ContactSection />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<ContactSection />);
    expect(
      screen.getByRole("button", { name: /send message/i })
    ).toBeInTheDocument();
  });
});
