import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { checkRateLimit } from "./ratelimit"
import { signInSchema } from "./validations/auth"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { success } = await checkRateLimit(undefined, 10, "1 h")
        if (!success) {
          throw new Error("TooManyRequests")
        }

        const result = signInSchema.safeParse(credentials)
        if (!result.success) {
          throw new Error("MissingCredentials")
        }

        const user = await prisma.user.findUnique({
          where: { username: result.data.username }
        })
        if (!user) return null

        const isValid = await bcrypt.compare(result.data.password, user.password)
        if (!isValid) return null

        return {
          id: user.id,
          username: user.username,
          role: user.role
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.role = user.role
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.username = token.username as string
        session.user.role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: "/signin"
  }
}
