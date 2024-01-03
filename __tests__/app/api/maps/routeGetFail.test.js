import { GET } from "@/app/api/maps/route";
import prisma from "@/lib/database";

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      map: {
        count: jest.fn().mockResolvedValue(1),
        findMany: jest.fn().mockResolvedValue([
          {
            id: 1,
            name: "TEST MAP",
            authorId: "abc",
            authorUserName: "test",
            animationSpeed: 0.03,
            size: 40,
            algorithm: "bfs",
            start: 453,
            target: 467,
            mapData: [{ x: 0, y: 0, elev: 1, state: "empty", prevState: "empty" }],
            likes: [{
              authorId: "abc",
            }]
          }
        ])
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

describe("Fail to get maps", () => {
  it('should fail to get published maps (KAM-1-T-9)', async () => {
    const mockSearchParams = new URLSearchParams({ 
      param: 'createdAt',
      direction: 'desc',
      currentUserId: 'abc',
      page: '1', 
      favourite: 'true',
    });

    prisma.map.findMany.mockRejectedValueOnce(new Error("Find many method failed"));
    const result = await GET({
      nextUrl: {
        searchParams: mockSearchParams
      }
    });

    expect(result.body).toBe(JSON.stringify({
      status:"error",
      message: "An error occurred while fetching maps"
    }))
    expect(result.status).toBe(500);
    expect(result.headers).toEqual({ "Content-Type": "application/json" });
  });
});