import mongoose from "mongoose";
import { ENV } from "../lib/env.js";

const connectDB = async () => {

  try {

    const conn = await mongoose.connect(ENV.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {

    console.error("Database connection failed:", error.message);
    process.exit(1);

  }

};

export default connectDB;