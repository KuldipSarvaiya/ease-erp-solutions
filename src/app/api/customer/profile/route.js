import Customer from "@/lib/models/customer.model";
import connectDB from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(req) {
  const data = await req.json();

  await connectDB();

  const res = await Customer.updateOne(
    { _id: data._id },
    {
      $set: {
        address: data.address,
        contact_no: data.contact_no,
        address_coordinates: data.address_coordinates,
      },
    }
  );

  // console.log(res);

  revalidatePath("/customer");
  revalidatePath("/customer/profile");

  return NextResponse.json({ success: true }, { status: 200 });
}
