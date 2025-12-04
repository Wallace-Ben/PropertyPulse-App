import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyPage from "../../../../app/properties/[id]/page";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/lib/fetchProperty";
import { mockProperty } from "@/tests/mockData/propertyMockData";

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useParams: jest.fn(),
}));

jest.mock("@/components/PropertyHeaderImage", () => ({
  __esModule: true,
  default: () => <div data-testid="HeaderImageMock">HeaderImage</div>,
}));

jest.mock("@/components/BackLink", () => ({
  __esModule: true,
  default: () => <div data-testid="BackLinkMock">BackLink</div>,
}));

jest.mock("@/components/PropertyLayout", () => ({
  __esModule: true,
  default: () => <div data-testid="LayoutMock">Layout</div>,
}));

jest.mock("@/lib/fetchProperty", () => ({
  fetchProperty: jest.fn(),
}));

describe("Property Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders PropertyHeaderImage, BackLink, and PropertyLayout when data loads", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: "123456789" });
    (fetchProperty as jest.Mock).mockResolvedValue(mockProperty);

    render(<PropertyPage />);

    expect(await screen.findByTestId("HeaderImageMock")).toBeInTheDocument();
    expect(screen.getByTestId("BackLinkMock")).toBeInTheDocument();
    expect(screen.getByTestId("LayoutMock")).toBeInTheDocument();
  });

  it("renders 'Property not found' when fetchProperty returns null", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: "123456789" });
    (fetchProperty as jest.Mock).mockResolvedValue(null);

    render(<PropertyPage />);

    expect(
      await screen.findByRole("heading", { name: /property not found/i })
    ).toBeInTheDocument();
  });

  it("shows loading spinner while waiting for fetchProperty", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "123456789" });
    (fetchProperty as jest.Mock).mockReturnValue(new Promise(() => {})); // pending promise

    render(<PropertyPage />);

    expect(screen.getByLabelText("Loading Spinner")).toBeInTheDocument();
  });

  it("does not call fetchProperty if no id is provided", () => {
    (useParams as jest.Mock).mockReturnValue({ id: null });

    render(<PropertyPage />);

    expect(fetchProperty).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Loading Spinner")).toBeInTheDocument();
  });

  it("renders 'Property not found' when fetchProperty throws", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: "123456789" });
    (fetchProperty as jest.Mock).mockRejectedValue(new Error("Failed to load"));

    render(<PropertyPage />);

    expect(
      await screen.findByRole("heading", { name: /property not found/i })
    ).toBeInTheDocument();
  });
});
