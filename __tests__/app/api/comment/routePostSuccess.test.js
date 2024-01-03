import { POST } from "@/app/api/comment/route";
import prisma from "@/lib/database";

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      comment: {
        create: jest.fn().mockResolvedValue({ 
          id: 1, 
          content: "Test comment", 
        }),
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

describe("Post comment", () => {
  it('should post comment successfully (KOM-1-T-4)', async () => {
    const payload = {
      comment: "Test comment",
      mapId: "abc",
      userId: "123",
      userName: "test"
    }

    const result = await POST({ json: () => payload });
    expect(result.status).toBe(200);
    expect(result.headers).toEqual({ "Content-Type": "application/json" });
    expect(prisma.comment.create).toHaveBeenCalledTimes(1);
  });
})
