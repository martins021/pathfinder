import { GET } from "@/app/api/comment/route";

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

describe("Get comments", () => {
  it('should get comments', async () => {
    const mockSearchParams = new URLSearchParams({ 
      mapId: 'abc',
      skip: '0',
    });

    const result = await GET({
      nextUrl: {
        searchParams: mockSearchParams
      }
    });

    expect(result.data.data).toEqual([{ id: 1, content: "Test comment"}])
    expect(result.data.status).toEqual("success")
    expect(result.data.total).toEqual(1)
    expect(result.options.status).toEqual(200)
  });
})
