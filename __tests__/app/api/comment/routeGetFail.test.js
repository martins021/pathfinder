import { GET } from "@/app/api/comment/route";
import prisma from "@/lib/database";

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      comment: {
        count: jest.fn().mockResolvedValue(1),
        findMany: jest.fn().mockResolvedValue([{ id: 1, content: "Test comment"}])
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

describe("Fail to get comments", () => {
  it('should fail to get comments if missing map id (KOM-2-T-2)', async () => {
    const mockSearchParams = new URLSearchParams({ 
      skip: '0',
    });

    const result = await GET({
      nextUrl: {
        searchParams: mockSearchParams
      }
    });

    expect(result.data.error).toEqual("Missing parameters")
    expect(result.options.status).toEqual(400)
  });

  it('should fail to get comments if findMany method fails (KOM-2-T-3)', async () => {
    const mockSearchParams = new URLSearchParams({ 
      mapId: 'abc',
      skip: '0',
    });
    prisma.comment.findMany.mockRejectedValueOnce(new Error("Find many method failed"))

    const result = await GET({
      nextUrl: {
        searchParams: mockSearchParams
      }
    });

    expect(result.data.error).toEqual("Failed to get comments")
    expect(result.options.status).toEqual(500)
  });
})
