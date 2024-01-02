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

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((data, options) => {
      return { data, options };
    })
  }
}));

describe("Fail to create map", () => {
  it('should fail to create new map if start or target is missing', async () => {
    const testData = {
      name: "WITH START & TARGET",
      mapData: [{ x: 0, y: 0, elev: 1, state: "empty", prevState: "empty" }],
      animationSpeed: 0.03,
      size: 40,
      algorithm: "bfs",
      target: 467,
      authorId: "abc",
      authorUserName: "test"
    };

    const result = await POST({ json: () => testData });
    expect(result.data.error).toEqual("Start node not specified")
    expect(result.options.status).toEqual(400)
  });

  it('should fail to create new map if database method fails', async () => {
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

    prisma.map.create.mockRejectedValueOnce(new Error("Create method failed"));

    const result = await POST({ json: () => testData });
    expect(result.data.error).toEqual("Create method failed")
    expect(result.options.status).toEqual(500)
  });
});