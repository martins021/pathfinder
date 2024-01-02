import { validateStartAndTargetNodes } from "@/app/helpers";
const { default: prisma } = require("../../../lib/database");
const { NextResponse } = require("next/server");

export async function GET(request) {
  const name = request.nextUrl.searchParams.get("name") || "";
  const authorId = request.nextUrl.searchParams.get("authorId");
  const currentUserId = request.nextUrl.searchParams.get("currentUserId") || null;
  const sortingParam = request.nextUrl.searchParams.get("param") || "createdAt";
  let sortingDirection = request.nextUrl.searchParams.get("direction") || "desc";
  const animationSpeed = request.nextUrl.searchParams.get("animationSpeed")?.split(",")
  const mapSize = request.nextUrl.searchParams.get("size")?.split(",")
  const algorithm = request.nextUrl.searchParams.get("algorithm")?.split(",")

  const page = request.nextUrl.searchParams.get("page") || 1;
  const batchSize = 10;

  //  special case because animation value goes from high to low, but label goes from low to high
  if(sortingParam === "animationSpeed") { 
    if(sortingDirection === "desc"){
      sortingDirection = "asc"
    } else {
      sortingDirection = "desc"
    }
  }

  const query = {
    authorId: authorId ? { equals: authorId } : {},
    name: name ? { contains: name, mode: "insensitive" } : {},
    animationSpeed: animationSpeed ? { in: animationSpeed.map(speed => Number(speed)) } : {},
    algorithm: algorithm ? { in: algorithm } : {},
    size: mapSize ? { in: mapSize.map(size => Number(size)) } : {}
  }

  const sorters = [
    {
      [sortingParam]: sortingDirection
    }
  ]

  try {
    const maps = await prisma.map.findMany({
      where: query,
      include: {
        likes: true,
      },
      orderBy: sorters,
      take: Number(page) * batchSize,
    });


    let finalData = maps
    let mapsCount = await prisma.map.count({
      where: query
    });

    if(currentUserId){
      const favourite = request.nextUrl.searchParams.get("favourite") === "true";
      
      const withLikedAttr = maps.map(map => {
        return {
          ...map,
          liked: map.likes.some(like => like.authorId === currentUserId)
        }
      })

      if(favourite){
        finalData = withLikedAttr.filter(map => map.liked)
        mapsCount = await prisma.map.count({
          where: {
            ...query,
            likes: {
              some: {
                authorId: currentUserId
              }
            }
          }
        });
      } else { 
        finalData = withLikedAttr
      }
    }
  
    let jsonResp = {
      status: "success",
      data: finalData,
      total: mapsCount
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
    validateStartAndTargetNodes(json.start, json.target);

    const map = await prisma.map.create({ 
      data: json 
    })

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
    return NextResponse.json({ error: error.message }, { status: error.status || 500 })
  }
}