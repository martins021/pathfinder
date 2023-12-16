const { default: prisma } = require("@/lib/database");
const { NextResponse } = require("next/server");

export async function POST(request) {
  const { userId, mapId, userName, comment } = await request.json();

  if(!userId || !mapId || !comment || !userName) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
  }

  try {
    await prisma.comment.create({
      data: {
        mapId,
        authorId: userId,
        authorName: userName,
        content: comment
      }
    })

    return new NextResponse(JSON.stringify({
      status: "success",
      data: {
        mapId,
        authorId: userId,
        authorName: userName,
        content: comment,
        createdAt: new Date().toISOString()
      }
    }), {
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

export async function GET(request) {
  try {
    const mapId = request.nextUrl.searchParams.get("mapId");
    const limit = request.nextUrl.searchParams.get("skip");

    if(!mapId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
    }

    const comments = await prisma.comment.findMany({
      where: {
        mapId,
      },
      orderBy: {
        createdAt: "desc"
      },
      skip: Number(limit),
      take: 10,
    })

    const commentCount = await prisma.comment.count({
      where: {
        mapId,
      }
    })

    return NextResponse.json({ 
      status: "success", 
      data: comments, 
      total: commentCount 
    }, { status: 200 });
  } catch (error) {
    console.log("Error getting comments: ", error);
    return NextResponse.json({ error: "Failed to get comments" }, { status: error.status || 500 })
  }
}