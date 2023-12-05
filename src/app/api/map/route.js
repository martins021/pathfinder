const { default: prisma } = require("@/lib/database");
const { NextResponse } = require("next/server");

export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");
  if(!id) {
    return NextResponse.json({ error: "Nav norādīts kartes id" }, { status: 400 })
  }

  try {
    const map = await prisma.map.findUnique({
      where: {
        id: id
      }
    });

    if(!map) {
      return NextResponse.json({ error: "Karte ar šādu id neeksistē" }, { status: 404 })
    }

    return NextResponse.json(map);
  } catch (error) {
    console.log("Error getting map: ", error);
    return NextResponse.json({ error: error.message }, { status: error.status || 500 })
  }
}