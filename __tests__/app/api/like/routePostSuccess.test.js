import { POST } from "@/app/api/like/route";
import prisma from "@/lib/database";

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      like: {
        create: jest.fn().mockResolvedValue({ 
          id: "123", 
          mapId: "6", 
        }),
        findFirst: jest.fn(),
        delete: jest.fn().mockResolvedValue({
          id: "123", 
          mapId: "6", 
        })
      },
    })),
  };
});

jest.mock('next/server', () => {
  return {
    NextResponse: class MockNextResponse {
      constructor(body, init) {
        this.body = body;
        this.status = init?.status;
        this.headers = init?.headers;
      }
    }
  };
});

describe("Change like status", () => {
  it('should add like to a map (PM-1-T-1)', async () => {
    const mockSearchParams = new URLSearchParams({ 
      id: "123",
      userId: "456",
    });

    prisma.like.findFirst.mockResolvedValueOnce(null);

    const result = await POST({
      nextUrl: {
        searchParams: mockSearchParams
      }
    });

    expect(prisma.like.create).toHaveBeenCalledTimes(1);
    expect(result.body).toEqual(JSON.stringify({ status: "success" }));
    expect(result.status).toBe(200);
    expect(result.headers).toEqual({ "Content-Type": "application/json" });
  });

  it('should remove like from map (PM-1-T-2)', async () => {
    const mockSearchParams = new URLSearchParams({ 
      id: "123",
      userId: "456",
    });

    prisma.like.findFirst.mockResolvedValueOnce({
      id: "123",
      mapId: "456",
      authorId: "789",
    });

    const result = await POST({
      nextUrl: {
        searchParams: mockSearchParams
      }
    });

    expect(prisma.like.delete).toHaveBeenCalledTimes(1);
    expect(result.body).toEqual(JSON.stringify({ status: "success" }));
    expect(result.status).toBe(200);
    expect(result.headers).toEqual({ "Content-Type": "application/json" });
  });
})
