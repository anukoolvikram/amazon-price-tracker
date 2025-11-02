import NextAuth, { DefaultSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/database/mongodb";
import { AuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      // Add the user ID to the session object
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

export const handler = NextAuth({
  // 1. Add your login providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // You can add more providers here (Email, GitHub, etc.)
  ],
  // 2. Connect to your database
  adapter: MongoDBAdapter(clientPromise),
  
  // 3. Configure session management
  session: {
    strategy: "jwt", // Use JSON Web Tokens for sessions
  },
  
  // 4. Add callbacks (optional, but useful)
  callbacks: {
    async session({ session, token }) {
      // Add the user ID to the session object
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST }