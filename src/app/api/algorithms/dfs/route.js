const { default: prisma } = require("@/lib/database");
const { NextResponse } = require("next/server");

export async function POST(request) {
  try {
    const data = await request.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}