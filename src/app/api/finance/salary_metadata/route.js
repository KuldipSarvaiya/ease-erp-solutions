import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const { default: MetaData } = require("@/lib/models/metadata.model");
const { default: connectDB } = require("@/lib/mongoose");

export async function PUT(req) {
  const data = await req.json();

  await connectDB();

  const res = await MetaData.updateOne(
    {},
    {
      $set: {
        salary_da: data.salary_da,
        salary_hra: data.salary_hra,
        salary_bonus: data.salary_bonus,
        salary_pf: data.salary_pf,
        salary_professionl_tax: data.salary_professionl_tax,
        travel_expense: data.travel_expense,
        updated_by: data.updated_by,
      },
    }
  );

  // console.log(res);
  revalidateTag("SalaryMetadata");
  revalidatePath("/managers/finance/salary_metadata");
  return NextResponse.json({ succes: res.acknowledged }, { status: 200 });
}

export async function GET(req) {
  await connectDB();

  const res = await MetaData.findOne({});

  return NextResponse.json(res, { status: 200 });
}
