import getdatafromcookie from "@/helpers/getdatafromcookie";
import User from "@/models/User";
import { NextResponse } from "next/server";
import connect from "@/dbConfig/Connect";

connect();

export async function POST(request) {
    try {
        const cookie = getdatafromcookie(request);

        if (!cookie || !cookie.userId) {
            return NextResponse.json({ error: "Unauthorized: No valid cookie found" }, { status: 401 });
        }

        const user = await User.findOne({ _id: cookie.userId }).select("-password");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        console.log(user);

        return NextResponse.json({ data: user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
