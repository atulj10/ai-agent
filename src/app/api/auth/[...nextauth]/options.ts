import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import UserModel from "@/models/user"
import connectDB from "@/lib/db";
import bycrpt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Enter your username" },
                email: { label: "Email", type: "email", placeholder: "Enter your email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await connectDB();
                try {
                    // Find user using username or email
                    const user = await UserModel.findOne({
                        $or: [
                            { username: credentials.identifier },
                            { email: credentials.identifier }
                        ]
                    });

                    if (!user) {
                        throw new Error("User not found");
                    }

                    const isPasswordValid = await bycrpt.compare(credentials.password, user.password);
                    if (!isPasswordValid) {
                        throw new Error("Invalid password");
                    }

                    return user;
                } catch (error: any) {
                    console.log(error);
                    throw new Error(error.message);
                }
            }

        })
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }) {

            if (token) {
                session.user._id = token._id?.toString();
                session.user.username = token.username?.toString();
                session.user.email = token.email?.toString();
                session.user.password = token.password?.toString();
            }

            return session;
        },
        async jwt({ token, user }) {
            //this is to add data to the token payload
            if (user) {
                token._id = user._id?.toString();
                token.username = user.username?.toString();
                token.email = user.email?.toString();
                token.password = user.password?.toString();
            }

            return token;
        }
    }

}  
