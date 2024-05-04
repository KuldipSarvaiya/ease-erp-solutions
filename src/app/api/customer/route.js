import Customer from "@/lib/models/customer.model";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();

  const res = await Customer.aggregate([
    {
      $lookup: {
        from: "customerorders",
        localField: "_id",
        foreignField: "customer_id",
        as: "orders",
        pipeline: [
          {
            $match: {
              order_state: "complete",
            },
          },
        ],
      },
    },
  ]);

  return NextResponse.json(res);
}
