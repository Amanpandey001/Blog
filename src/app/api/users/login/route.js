import User from "@/models/User";
import bcryptjs from "bcryptjs";
import connect from "@/dbConfig/Connect";
import { NextResponse, NextRequest } from "next/server";
connect();

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, password } = body;
        console.log(body); //confirming...
        const checkUser=await User.findOne({name});
        if(!checkUser){
            return NextResponse.json({ error: "User not found, pls login" }, { status: 400 });
        }
        else{
            const checkPassword=await bcryptjs.compare(password, checkUser.password);
            if(!checkPassword){
                return NextResponse.json({ error: "Incorrect password" }, { status: 400 });
            }
            else{
                const cookieData = JSON.stringify({
                    userId: checkUser._id
                });
                console.log(cookieData);
                const res= NextResponse.json({ message: "User logged in successfully" }, { status: 200 });
                res.cookies.set("auth", cookieData, { httpOnly: true });
                return res;
            }
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}