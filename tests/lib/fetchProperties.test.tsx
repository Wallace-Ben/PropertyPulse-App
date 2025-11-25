import { fetchProperties } from "@/lib/fetchProperties";

// Mock dependencies
global.fetch = jest.fn();

describe("fetchProperties", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns ok with property json", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ _id: "1", name: "Test Property" }],
    });

    const res = await fetchProperties();

    expect(res).toEqual([{ _id: "1", name: "Test Property" }]);
  });

  it("fails to fetch data and returns an error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch data")
    );

    const res = await fetchProperties();
    expect(res).toEqual([]);
  });

  it("returns an empty array when API response with non-ok status", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const res = await fetchProperties();
    expect(res).toEqual([]);
  });
});
