import Supplier from "@/lib/models/supplier.model";
import connectDB from "@/lib/mongoose";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);
  const matrial_id = url.searchParams.get("match_material");

  let match = {};
  if (matrial_id) {
    match = {
      supplied_material_id: {
        $in: [new mongoose.Types.ObjectId(matrial_id)],
      },
    };
  }

  await connectDB();

  const res = await Supplier.aggregate([
    {
      $match: { ...match },
    },
    {
      $lookup: {
        from: "rawmaterials",
        localField: "supplied_material_id",
        foreignField: "_id",
        as: "supplied_material_id",
      },
    },
  ]);

  return NextResponse.json(res);
}
