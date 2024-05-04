import Product from "@/lib/models/product.model";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  const search_string =
    new URL(request.url)?.searchParams?.get("search_string")?.split("+") || "";

  const qry = { find: {} };
  if (search_string)
    qry.find = {
      tags: {
        $all: search_string.map((str) => new RegExp(`^.*${str}.*$`, "i")),
      },
    };

  await connectDB();

  const res = await Product.find({ ...qry.find, is_deleted: false })
    .sort({ available_stock_units: -1 })
    .limit(20);

  return NextResponse.json(res);
}
