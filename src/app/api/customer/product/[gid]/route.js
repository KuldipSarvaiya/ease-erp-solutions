import Product from "@/lib/models/product.model";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params: { gid } }) {
  const color = new URL(req.url).searchParams.get("color");
  const size = new URL(req.url).searchParams.get("size");

  await connectDB();

  const product = await Product.aggregate([
    { $match: { product_group_id: gid, color: "#" + color, size: size } },
    {
      $lookup: {
        from: "products",
        localField: "product_group_id",
        foreignField: "product_group_id",
        as: "group_products",
        pipeline: [
          {
            $project: {
              color: 1,
              size: 1,
              available_stock_units: 1,
            },
          },
        ],
      },
    },
  ]);

  return NextResponse.json(product);
}
