import Employee from "@/lib/models/employee.model";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { writeFile } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

export async function GET(req, { params: { id } }) {
  await connectDB();

  if (!!!id) return NextResponse.error("No Data Found");

  const emp = await Employee.findOne({ _id: id }).select(
    "username password first_name last_name middle_name email contact_no home_address bank_acc_no bank_name bank_ifsc_code"
  );

  if (!emp) return NextResponse.error("No Data Found");
  console.log(emp);
  return NextResponse.json(emp);
}

export async function PUT(req, { params: { id } }) {
  if (!!!id) return NextResponse.error("Failed To Update Details");

  const formdata = await req.formData();
  const image = formdata.get("image");

  let image_obj = {};
  console.log(image);
  if (image.name) {
    // todo : file upload to own backend server
    const image_name = `${Date.now()}__${image.name}`.replaceAll(" ", "-");
    image_obj.image = image_name;

    const arrBuf = await image.arrayBuffer();
    const buffer = new Buffer.from(arrBuf);

    const ulr = join(cwd(), "public", "kuldip_upload", image_name);
    writeFile(ulr, buffer, () => {
      console.log("file saved");
    });
  }

  await connectDB();

  const update = await Employee.updateOne(
    { _id: id },
    {
      $set: {
        ...image_obj,
        first_name: formdata.get("first_name"),
        middle_name: formdata.get("middle_name"),
        last_name: formdata.get("last_name"),
        email: formdata.get("email"),
        contact_no: formdata.get("contact_no"),
        home_address: formdata.get("home_address"),
        bank_acc_no: formdata.get("bank_acc_no"),
        bank_name: formdata.get("bank_name"),
        bank_ifsc_code: formdata.get("bank_ifsc_code"),
        username: formdata.get("username"),
        password: formdata.get("password"),
        updated_by: id,
        rezorpay_contact_id: "temp_id",
        rezorpay_fund_id: "temp_id",
      },
    }
  );
  console.log(update);
  if (update.acknowledged) return NextResponse.json({ success: true });
  return NextResponse.error("Failed To Update Details");
}
