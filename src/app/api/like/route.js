const { default: prisma } = require("../../../lib/database");
const { NextResponse } = require("next/server");

export async function POST(request) {
  const id = request.nextUrl.searchParams.get("id");
  const userId = request.nextUrl.searchParams.get("userId");

  if(!id || !userId) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
  }

  try {
    const like = await prisma.like.findFirst({
      where: {
        mapId: id,
        authorId: userId
      }
    })
  
    if(like) {
      await prisma.like.delete({
        where: {
          id: like.id
        }
      })
    } else {
      await prisma.like.create({
        data: {
          mapId: id,
          authorId: userId
        }
      })
    }

    return new NextResponse(JSON.stringify({ status: "success" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    })  
  } catch (error) {
    console.log("Error changing map like: ", error);
    return NextResponse.json({ error: "Failed to change map like" }, { status: 500 })
  }
}