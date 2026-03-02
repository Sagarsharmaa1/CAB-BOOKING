import dotenv from "dotenv";
dotenv.config({quiet:true});

export const ENV = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || "development",
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173"
}