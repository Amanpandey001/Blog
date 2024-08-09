import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import connect from "@/dbConfig/Connect";

connect();

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, password } = body;
        console.log(body); //confirming...
        const checkUser = await User.findOne({ name });
        if (checkUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        } else {
            try {
                const salt = await bcryptjs.genSalt(10);
                const hashedPassword = await bcryptjs.hash(password, salt);
                const newUser = new User({ name, password: hashedPassword });
                const savedUser = await newUser.save();
                console.log(savedUser);
                return NextResponse.json({ message: "User created successfully" }, { success: true }, { status: 201 });
            } catch (error) {
                return NextResponse.json({ error: error.message }, { success: false }, { status: 500 });
            }
        }

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}