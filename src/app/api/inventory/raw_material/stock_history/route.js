import RawMaterialStockHistory from "@/lib/models/raw_material_stock_history.model";
import connectDB from "@/lib/mongoose";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const department = searchParams.get("department");
  const produced_by = searchParams.get("produced_by");
  const used_by = searchParams.get("used_by");

  const matchQry = {};
  if (department !== "all") {
    if (produced_by === "yes") {
      matchQry.produced_by = { $in: [new mongoose.Types.ObjectId(department)] };
    } else if (used_by === "yes") {
      matchQry.used_by = { $in: [new mongoose.Types.ObjectId(department)] };
    }
  }

  await connectDB();

  const res = await RawMaterialStockHistory.aggregate([
    {
      $match: matchQry,
    },
    {
      $lookup: {
        from: "rawmaterials",
        localField: "raw_material_id",
        foreignField: "_id",
        as: "raw_material",
      },
    },
    {
      $unwind: {
        path: "$raw_material",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  console.log(
    "raw material stock for this department = ",
    department,
    " =  ",
    res
  );

  return NextResponse.json(res);
}
