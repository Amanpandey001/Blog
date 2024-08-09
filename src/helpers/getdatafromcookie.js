import { NextResponse } from "next/server";

export default function getdatafromcookie(request) {
    try {
        const cookie = request.cookies.get("auth");
        if (cookie) {
            // Since `cookie` is an object with `name` and `value`, access the `value` and parse it
            const parsedData = JSON.parse(cookie.value);
            return parsedData;  // Return the parsed object
        } else {
            return null;  // No cookie found
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
