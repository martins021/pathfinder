import { POST } from "@/app/api/comment/route";
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

describe("Fail to post comment", () => {
  it('should fail to post comment if missing parameters', async () => {
    const payload = {
      comment: "Test comment",
      mapId: "abc",
    }

    const result = await POST({ json: () => payload });

    expect(result.data.error).toEqual("Missing parameters")
    expect(result.options.status).toEqual(400)
  });

  it('should fail to post comment if database operation fails', async () => {
    const payload = {
      comment: "Test comment",
      mapId: "abc",
      userId: "123",
      userName: "test"
    }
    prisma.comment.findMany.mockRejectedValueOnce(new Error("Create method failed"))
    const result = await POST({ json: () => payload });

    expect(result.data.error).toEqual("Failed to save comment")
    expect(result.options.status).toEqual(500)
  });
})
