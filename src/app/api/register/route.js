import prisma from "@/lib/database"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(request){
  try {
    const body = await request.json();

    const { username, email, password } = body;
  
    if(!username || !email || !password){
      return new NextResponse("Missing parameters", { status: 400 })
    }
    const userExists = await prisma.user.findUnique({ // check if user exists based on unique email field
      where: { email }
    })
    if(userExists){
      return new NextResponse("User already exists", { status: 400 })
    }
  
    const hashedPswd = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPswd
      }
    })
  
    return NextResponse.json(newUser);
  } catch (error) {
    console.log("Error registering user: ", error);
    return new NextResponse("An error occured while registering user", { status: 500 })
  }
}