import mongoose from "mongoose";

let isConnected = false;

async function connectDB() {
  if (isConnected) return console.log("Mongodb Already Connect");

  if (!process.env.MONGODB_URL)
    return console.log("MONGODB_URL is Missing in .env.local file");

  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("\n***********Mongodb Connected\n");
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;
