/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Please define the MONGODB_URI environment variable in production.");
  }
}

type Cached = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var _mongoose: Cached | undefined;
}

const cached: Cached = (global as any)._mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
   console.log("Connecting MongoDB...");
  if (cached.conn) {
     console.log("Using Cached Connection");
    return cached.conn;
  }

  if (!cached.promise) {
     console.log("Creating New Connection");
   cached.promise = mongoose.connect(MONGODB_URI ?? "")
      .then((m) => {
        console.log("Mongo Connected");
        return m;
      });
  }

  cached.conn = await cached.promise;
   console.log("Connected Successfully");
  (global as any)._mongoose = cached;
  return cached.conn;
}

export default connectToDatabase;
