const { default: prisma } = require("@/lib/database");
const { NextResponse } = require("next/server");

export async function POST(request) {
  const { userId, mapId, comment } = await request.json();

  if(!userId || !mapId || !comment) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
  }

  try {
    await prisma.comment.create({
      data: {
        mapId,
        authorId: userId,
        content: comment
      }
    })

    return new NextResponse(JSON.stringify({ status: "success" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.log("Error posting comment: ", error);
    return NextResponse.json({ error: "Failed to save comment" }, { status: error.status || 500 })
  }
}