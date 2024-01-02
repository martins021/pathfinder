import { GET } from "@/app/api/map/route";
import prisma from "@/lib/database";

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      map: { findUnique: jest.fn() }
    })),
  };
});

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((data, options) => {
      return { data, options };
    })
  }
}));

describe("Fetch map data", () => {
  it('should fetch map data', async () => {
    const mockSearchParams = new URLSearchParams({
      id: "123"
    });

    prisma.map.findUnique.mockResolvedValue({
      id: "123",
      name: "Test Map",
    })
    const result = await GET({
      nextUrl: {
        searchParams: mockSearchParams
      }
    });

    expect(result.data).toEqual({
      id: "123",
      name: "Test Map",
    })
  });
});

describe("Fail to fetch map data", () => {
  it('should fail to fetch map data due to missing map id', async () => {
    const mockSearchParams = new URLSearchParams({});

    prisma.map.findUnique.mockResolvedValue({
      id: "123",
      name: "Test Map",
    })
    const result = await GET({
      nextUrl: {
        searchParams: mockSearchParams
      }
    });

    expect(result.data.error).toEqual("Missing parameters")
    expect(result.options.status).toEqual(400)
  });

  it('should fail to fetch map data because map with this received id does not exist', async () => {
    const mockSearchParams = new URLSearchParams({
      id: "123"
    });

    prisma.map.findUnique.mockResolvedValue(null)
    const result = await GET({
      nextUrl: {
        searchParams: mockSearchParams
      }
    });

    expect(result.data.error).toEqual("Map with this id doesn't exist")
    expect(result.options.status).toEqual(404)
  });

  it('should fail to fetch map data due to failed database operation', async () => {
    const mockSearchParams = new URLSearchParams({
      id: "123"
    });

    prisma.map.findUnique.mockRejectedValue(new Error("findUnique method failed"))
    const result = await GET({
      nextUrl: {
        searchParams: mockSearchParams
      }
    });

    expect(result.data.error).toEqual("findUnique method failed")
    expect(result.options.status).toEqual(500)
  });
});
