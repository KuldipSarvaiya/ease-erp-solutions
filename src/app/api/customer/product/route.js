import Product from "@/lib/models/product.model";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDB();

  const res = await Product.find({})
    .sort({ available_stock_units: -1 })
    .limit(20);

  return NextResponse.json(res);
}
