import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/database"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username"
        },
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      async authorize(credentials) { // login logic
        try {
          if(!credentials.email || !credentials.password){
            throw new Error("Missing parameters")
          }
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })
          if(!user){
            throw new Error("User doesn't exist")
          }
          const match = await bcrypt.compare(credentials.password, user.password);
          if(!match){
            throw new Error("Incorrect password")
          } else {
            return user;
          }
          
        } catch (error) {
          console.log("Error logging in user: ", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({token,user}){
      if(user){
          token.id = user.id
      }
      return token
    },
    async session({ session, token }){
      session.user.id = token.id
      return session
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development"
}

const handler = NextAuth(authOptions);

export {
  handler as GET,
  handler as POST
}