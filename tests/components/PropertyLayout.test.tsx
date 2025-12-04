import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyLayout from "@/components/PropertyLayout";
import { mockProperty } from "@/tests/mockData/propertyMockData";

jest.mock("@/components/PropertyDetails", () => ({
  __esModule: true,
  default: () => <div>PropertyDetails Mock</div>,
}));

jest.mock("@/components/Sidebar", () => ({
  __esModule: true,
  default: () => <div>Sidebar Mock</div>,
}));

jest.mock("@/components/ContactSection", () => ({
  __esModule: true,
  default: () => <div>ContactSection Mock</div>,
}));

describe("PropertyLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders PropertyDetails, Sidebar, and ContactSection", () => {
    render(<PropertyLayout property={mockProperty} />);

    expect(screen.getByText("PropertyDetails Mock")).toBeInTheDocument();
    expect(screen.getByText("Sidebar Mock")).toBeInTheDocument();
    expect(screen.getByText("ContactSection Mock")).toBeInTheDocument();
  });
});
