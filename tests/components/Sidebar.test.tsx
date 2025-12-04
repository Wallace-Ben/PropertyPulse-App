import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "@/components/Sidebar";

describe("Sidebar", () => {
  it("renders the Bookmark button", () => {
    render(<Sidebar />);
    expect(
      screen.getByRole("button", { name: /bookmark property/i })
    ).toBeInTheDocument();
  });

  it("renders the Share button", () => {
    render(<Sidebar />);
    expect(
      screen.getByRole("button", { name: /share property/i })
    ).toBeInTheDocument();
  });
});
