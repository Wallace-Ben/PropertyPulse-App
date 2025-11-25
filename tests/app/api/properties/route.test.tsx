/**
 * @jest-environment node
 */
import { GET } from "@/app/api/properties/route";
import connectDB from "@/config/database";
import Property from "@/models/Property";

// Mock dependencies
jest.mock("@/config/database");
jest.mock("@/models/Property", () => ({
  find: jest.fn(),
}));

describe("GET /api/properties", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 200 with property list", async () => {
    (connectDB as jest.Mock).mockResolvedValueOnce(undefined);
    (Property.find as jest.Mock).mockResolvedValueOnce([
      { _id: "1", name: "Test Property" },
    ]);

    const res = await GET();

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual([{ _id: "1", name: "Test Property" }]);
  });

  it("returns 200 with empty array when no properties exist", async () => {
    (connectDB as jest.Mock).mockResolvedValueOnce(undefined);
    (Property.find as jest.Mock).mockResolvedValueOnce([]);

    const res = await GET();

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual([]);
  });

  it("returns 500 when Property.find throws", async () => {
    (connectDB as jest.Mock).mockResolvedValueOnce(undefined);
    (Property.find as jest.Mock).mockRejectedValueOnce(new Error("Find error"));

    const res = await GET();

    expect(res.status).toBe(500);
    const text = await res.text();
    expect(text).toBe("Something Went Wrong");
  });

  it("returns 500 when connectDB throws", async () => {
    (connectDB as jest.Mock).mockRejectedValueOnce(
      new Error("Connection failed")
    );

    const res = await GET();

    expect(res.status).toBe(500);
    const text = await res.text();
    expect(text).toBe("Something Went Wrong");
  });
});
