const { default: prisma } = require("@/lib/database");
const { NextResponse } = require("next/server");

export async function GET(request) {
  const name = request.nextUrl.searchParams.get("name") || "";
  const animationSpeed = request.nextUrl.searchParams.get("animationSpeed")?.split(",")
  const algorithm = request.nextUrl.searchParams.get("algorithm")?.split(",")

  const page = request.nextUrl.searchParams.get("page") || 1;
  const limit = request.nextUrl.searchParams.get("limit") || 10;
  const skip = (page - 1) * limit;

  console.log(animationSpeed);

  const query = {
    name: name ? { 
      contains: name, 
      mode: "insensitive" 
      } : {},
    animationSpeed: animationSpeed ? { 
      in: animationSpeed.map(speed => Number(speed)) 
    } : {},
    algorithm: algorithm ? { 
      in: algorithm
    } : {}
  }

  try {
    const maps = await prisma.map.findMany({
      where: query,
      skip: Number(skip),
      take: Number(limit),
    });
  
    let jsonResp = {
      status: "success",
      data: maps,
      total: maps.length
    }
  
    return NextResponse.json(jsonResp);
  } catch (error) {
    console.log("Error getting maps: ", error);
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

export async function POST(request) {
  try {
    const json = await request.json();
    console.log({ json });
    const map = await prisma.map.create({ 
      data: json 
    })
    console.log({map});
    let jsonResp = {
      status: "success",
      data: map
    }

    return new NextResponse(JSON.stringify(jsonResp), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    })
  } catch (error) {
    console.log("Error saving map: ", error);
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