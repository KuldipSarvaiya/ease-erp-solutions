import Salary from "@/lib/models/salary.model";
import connectDB from "@/lib/mongoose";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await connectDB();
  const res = await Salary.aggregate([
    {
      $match: {
        employee_id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "employees",
        localField: "employee_id",
        foreignField: "_id",
        as: "employee",
      },
    },
    {
      $unwind: {
        path: "$employee",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);
  console.log(id, res);
  return NextResponse.json(res);
}
