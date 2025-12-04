/**
 * @jest-environment node
 */
import { GET } from "@/app/api/properties/[id]/route";
import connectDB from "@/config/database";
import Property from "@/models/Property";

jest.mock("@/config/database");
jest.mock("@/models/Property", () => ({
  findById: jest.fn(),
}));

describe("GET /api/properties/:id", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 200 and property data when found", async () => {
    (connectDB as jest.Mock).mockResolvedValueOnce(undefined);
    (Property.findById as jest.Mock).mockResolvedValueOnce({
      _id: "123",
      name: "Test Property",
    });

    const res = await GET({} as Request, { params: { id: "123" } });

    expect(connectDB).toHaveBeenCalled();
    expect(Property.findById).toHaveBeenCalledWith("123");
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data).toEqual({ _id: "123", name: "Test Property" });
  });

  it("returns 404 when property is not found", async () => {
    (connectDB as jest.Mock).mockResolvedValueOnce(undefined);
    (Property.findById as jest.Mock).mockResolvedValueOnce(null);

    const res = await GET({} as Request, { params: { id: "999" } });

    expect(res.status).toBe(404);
    expect(await res.text()).toBe("Property not found");
  });

  it("returns 500 when findById throws", async () => {
    (connectDB as jest.Mock).mockResolvedValueOnce(undefined);
    (Property.findById as jest.Mock).mockRejectedValueOnce(
      new Error("DB explode")
    );

    const res = await GET({} as Request, { params: { id: "123" } });

    expect(res.status).toBe(500);
    expect(await res.text()).toBe("Something Went Wrong");
  });

  it("returns 500 when connectDB throws", async () => {
    (connectDB as jest.Mock).mockRejectedValueOnce(
      new Error("Connection fail")
    );

    const res = await GET({} as Request, { params: { id: "123" } });

    expect(res.status).toBe(500);
    expect(await res.text()).toBe("Something Went Wrong");
  });
});
