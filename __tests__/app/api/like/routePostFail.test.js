import { POST } from "@/app/api/like/route";
import prisma from "@/lib/database";

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      like: { findFirst: jest.fn() }
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

describe("Fail to change like status", () => {
  it('should fail to add like to a map due to missing user id', async () => {
    const mockSearchParams = new URLSearchParams({ 
      id: "123",
    });

    const result = await POST({
      nextUrl: {
        searchParams: mockSearchParams
      }
    });

    expect(result.data.error).toEqual("Missing parameters")
    expect(result.options.status).toEqual(400)
  });

  it('should fail to add like to a map due to failed database operation', async () => {
    const mockSearchParams = new URLSearchParams({ 
      id: "123",
      userId: "456",
    });

    prisma.like.findFirst.mockRejectedValueOnce(new Error("Create method failed"))

    const result = await POST({
      nextUrl: {
        searchParams: mockSearchParams
      }
    });

    expect(result.data.error).toEqual("Failed to change map like")
    expect(result.options.status).toEqual(500)
  });
})
