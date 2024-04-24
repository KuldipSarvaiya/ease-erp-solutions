import CustomerOrder from "@/lib/models/customer_order.model";
import connectDB from "@/lib/mongoose";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  console.log(data);
  await connectDB();

  const res = await CustomerOrder.insertMany([data]);

  console.log(res);

  revalidatePath("/managers/inventory/orders");
  return NextResponse.json({ success: true });
}

export async function GET(req) {
  const customer_id = new URL(req.url).searchParams.get("customer_id");

  const qry = {};
  if (customer_id) qry.customer_id = new mongoose.Types.ObjectId(customer_id);

  await connectDB();

  const res = await CustomerOrder.aggregate([
    { $match: qry },
    {
      $lookup: {
        from: "customers",
        localField: "customer_id",
        foreignField: "_id",
        as: "customer",
      },
    },
    {
      $unwind: "$customer",
    },
    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
  ]);

  return NextResponse.json(res);
}

export async function PUT(req) {
  const data = await req.json();

  await connectDB();

  const res = await CustomerOrder.updateOne(
    { _id: new mongoose.Types.ObjectId(data._id) },
    { $set: { order_state: data.order_state } }
  );
  console.log(res);
  if (res.acknowledged)
    return NextResponse.json({ success: true }, { status: 200 });
  return NextResponse.error({ success: false }, { status: 500 });
}
