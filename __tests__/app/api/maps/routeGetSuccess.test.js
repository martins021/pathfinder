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

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((data) => {
      return data;
    })
  }
}));

describe("Get maps with liked", () => {
  it('should get published maps', async () => {
    const mockSearchParams = new URLSearchParams({ 
      param: 'createdAt',
      direction: 'desc',
      currentUserId: 'abc',
      page: '1', 
      favourite: 'true',
    });

    const result = await GET({
      nextUrl: {
        searchParams: mockSearchParams
      }
    });

    expect(result.data).toEqual([{
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
        liked: true,
        likes: [{
          authorId: "abc",
        }]
    }]);
    expect(result.total).toEqual(1);
    expect(result.status).toEqual("success");
  });
});