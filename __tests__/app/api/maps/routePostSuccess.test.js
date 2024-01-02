import { POST } from "@/app/api/maps/route";
import prisma from "@/lib/database";

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      map: {
        create: jest.fn().mockResolvedValue({ id: 1, name: "WITH START & TARGET" }),
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

describe("Create map", () => {
  it('should create new map with correct data', async () => {
    const testData = {
      name: "WITH START & TARGET",
      mapData: [{ x: 0, y: 0, elev: 1, state: "empty", prevState: "empty" }],
      animationSpeed: 0.03,
      size: 40,
      algorithm: "bfs",
      start: 453,
      target: 467,
      authorId: "abc",
      authorUserName: "test"
    };

    const result = await POST({
      json: () => testData
    });

    expect(result.body).toBe(JSON.stringify({
      status:"success",
      data: {
        id:1,
        name:"WITH START & TARGET"
      }
    }))
    expect(result.status).toBe(200);
    expect(result.headers).toEqual({ "Content-Type": "application/json" });
    expect(prisma.map.create).toHaveBeenCalledTimes(1);
    expect(prisma.map.create).toHaveBeenCalledWith({ data: testData });
  });
});