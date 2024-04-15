import Customer from "@/lib/models/customer.model";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req){
  await connectDB()

  const res = await Customer.find({})

  return NextResponse.json(res)
}