import mongoose from "mongoose";

export default async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const conn = mongoose.connection;
        conn.on("connected", () => {
            console.log(`MongoDB Connected: ${conn.connection.host}`);
        });
        conn.on("disconnected", () => {
            console.log("MongoDB Disconnected");
        });
        conn.on("error", (error) => {
            console.error(`MongoDB Error: ${error.message}`);
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}