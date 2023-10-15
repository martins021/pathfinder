const { default: prisma } = require("@/lib/database");
const { NextResponse } = require("next/server");

export async function GET(request) {
  const page = request.nextUrl.searchParams.get("page") || 1;
  const limit = request.nextUrl.searchParams.get("limit") || 10;
  const skip = (page - 1) * limit;

  const maps = await prisma.map.findMany({
    skip: Number(skip),
    take: Number(limit),
  });

  let jsonResp = {
    status: "success",
    data: maps,
    total: maps.length
  }

  return NextResponse.json(jsonResp);
}

export async function POST(request) {
  try {
    const json = await request.json();

    const map = await prisma.map.create({ 
      data: json 
    })

    let jsonResp = {
      status: "success",
      data: map
    }

    return new NextResponse(JSON.stringify(jsonResp), {
      status: 201,
      headers: {
        "Content-Type": "application/json"
      }
    })
  } catch (error) {
    let errorResp = {
      status: "error",
      message: error.message
    }

    return new NextResponse(JSON.stringify(errorResp), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
}