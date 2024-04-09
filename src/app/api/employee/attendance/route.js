import Attendance from "@/lib/models/attendance.model";
import connectDB from "@/lib/mongoose";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { allEmpGroupDept, myOld, myToday } from "./getReqs";

export async function GET(req) {
  const job = new URL(req.url).searchParams.get("job");
  const id = new URL(req.url).searchParams.get("_id");

  console.log("into attendance route get = ", id, job);

  if (!!!job || !!!id) return NextResponse.error("Invalid Inputs");

  await connectDB();

  switch (job) {
    case "myToday":
      const res1 = await myToday(id);
      return NextResponse.json(res1);
    case "myOld":
      const res2 = await myOld(id);
      return NextResponse.json(res2);
    case "allEmpGroupDept":
      const res3 = await allEmpGroupDept();
      return NextResponse.json(res3);

    default:
      break;
  }
}

export async function POST(req) {
  const data = await req.json();
  console.log(data);
  await connectDB();

  const res = new Attendance({
    employee_id: data._id,
    date: new Date(),
    coordinates: {
      latitude: data.coordinates.latitude,
      longitude: data.coordinates.longitude,
    },
    updated_by: data._id,
    punch_in: new Date(),
  });

  const atten = await res.save();

  if (atten) {
    revalidateTag("myTodayAtltendance");
    return NextResponse.json(atten);
  }

  return NextResponse.error("Can Not Punch In");
}

export async function PUT(req) {
  const data = await req.json();

  await connectDB();

  const res = await Attendance.updateOne(
    {
      _id: data._id,
      date: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lt: new Date(new Date().setHours(24, 0, 0, 0)),
      },
    },
    {
      $set: {
        updated_by: data.employee_id,
        punch_out: new Date(),
        point: data.point,
        overtime_hours: data.overtime_hours,
        state: data.state,
        coordinates: {
          latitude: data.coordinates.latitude,
          longitude: data.coordinates.longitude,
        },
      },
    }
  );

  if (res.acknowledged) {
    revalidateTag(["myTodayAttendance", "myOldAttendance"]);
    return NextResponse.json(res);
  }

  return NextResponse.error("Can Not Punch Out");
}
