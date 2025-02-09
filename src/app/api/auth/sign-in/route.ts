import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import UserModel from "@/models/user";
import connectDB from "@/lib/db";

export async function POST(req: Request) {
    await connectDB();
    try {
        const { username, email, password } = await req.json();

        // Check if the email already exists
        const existingEmailUser = await UserModel.findOne({ email });
        if (existingEmailUser) {
            return NextResponse.json({ message: "Email already taken." }, { status: 400 });
        }

        // Check if the usename already exists
        const existingUsername = await UserModel.findOne({ username });
        if (existingUsername) {
            return NextResponse.json({ message: "Username already taken." }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await UserModel.create({
            username,
            email,
            password: hashedPassword
        });

        return NextResponse.json({ message: "User registered successfully", user: newUser }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
    }
}
