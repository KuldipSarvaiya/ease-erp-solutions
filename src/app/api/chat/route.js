import Chatroom from "@/lib/models/chatroom.model";
import connectDB from "@/lib/mongoose";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const skip = searchParams.get("skip");
  const limit = searchParams.get("limit");

  await connectDB();

  const res = await Chatroom.find()
    .populate({
      path: "sent_by",
      select: "_id first_name middle_name image",
      populate: {
        path: "department_id",
        select: "dept_name",
      },
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return NextResponse.json(res);
}

export async function POST(req) {
  const data = await req.json();
  await connectDB();
  const res = await new Chatroom(data).save();
  console.log(res);
  revalidateTag("chatting");
  return NextResponse.json(res);
}
