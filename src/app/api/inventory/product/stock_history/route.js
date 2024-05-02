import ProductStockHistory from "@/lib/models/product_stock_history.model";
import connectDB from "@/lib/mongoose";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const department = searchParams.get("department");

  const matchQry = {};
  if (department !== "all")
    matchQry.produced_by = { $in: [new mongoose.Types.ObjectId(department)] };

  await connectDB();

  const res = await ProductStockHistory.aggregate([
    {
      $match: matchQry,
    },
    {
      $sort: {
        stock_produced_date: -1,
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: {
        path: "$product",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  // console.log("product stock for this department = ", department, " =  ", res);

  return NextResponse.json(res);
}
