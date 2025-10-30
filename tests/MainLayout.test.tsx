import { render, screen } from "@testing-library/react";
import MainLayout from "../app/mainLayout";

describe("MainLayout", () => {
  it("renders the MainLayout text", () => {
    render(<MainLayout />);
    expect(screen.getByText("MainLayout")).toBeInTheDocument();
  });
});
