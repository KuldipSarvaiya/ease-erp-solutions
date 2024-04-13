import ProductStockHistory from "@/lib/models/product_stock_history.model";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const department = searchParams.get("department");

  const matchQry = {};
  if (department !== "all") matchQry.produced_by = { $in: [department] };

  await connectDB();

  const res = await ProductStockHistory.aggregate([
    {
      $match: matchQry,
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

  console.log("ptoduct stock for this department = ", department, " =  ", res);

  return NextResponse.json(res);
}
