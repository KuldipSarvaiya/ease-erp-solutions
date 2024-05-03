import Employee from "@/lib/models/employee.model";
import connectDB from "@/lib/mongoose";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { writeFile } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

export async function GET(req, { params: { id } }) {
  await connectDB();

  if (!!!id) return NextResponse.error("No Data Found");

  const emp = await Employee.findOne({ _id: id });

  if (!emp) return NextResponse.error("No Data Found");
  // console.log(emp);
  return NextResponse.json(emp);
}

export async function PUT(req, { params: { id } }) {
  if (!!!id) return NextResponse.error("Failed To Update Details");

  const formdata = await req.formData();

  let contact_id = formdata.get("rezorpay_contact_id");
  let fund_id = formdata.get("rezorpay_fund_id");
  let bank_name = formdata.get("bank_name");

  if (formdata.get("change_acc") === "1") {
    // !----- updating contact in razorpay -----
    const contact_response = await fetch(
      "https://api.razorpay.com/v1/contacts/" +
        formdata.get("rezorpay_contact_id"),
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${process.env.RZP_KEY}:${process.env.RZP_SECRET}`
          ).toString("base64")}`,
        },
        body: JSON.stringify({
          name:
            formdata.get("first_name") +
            " " +
            formdata.get("middle_name") +
            " " +
            formdata.get("last_name"),
          email: formdata.get("email"),
          contact: formdata.get("contact_no"),
          type: "employee",
          reference_id: formdata.get("username"),
          notes: {
            address: formdata.get("home_address"),
          },
        }),
      }
    );

    const contact_data = await contact_response.json();
    console.log("Contact Data = ", contact_data);
    contact_id = contact_data.id;

    if (!contact_response.ok) {
      return NextResponse.json(contact_data.error, { status: 500 });
    }

    // !------ deactivating old fund -------
    const deactivate_fund_response = await fetch(
      " https://api.razorpay.com/v1/fund_accounts/" +
        formdata.get("rezorpay_fund_id"),
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${process.env.RZP_KEY}:${process.env.RZP_SECRET}`
          ).toString("base64")}`,
        },
        body: JSON.stringify({ active: false }),
      }
    );
    console.log(
      "Old Fund Deactivated  = ",
      await deactivate_fund_response.json()
    );

    //  !----- creating fund in razorpay -----
    const fund_response = await fetch(
      "https://api.razorpay.com/v1/fund_accounts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${process.env.RZP_KEY}:${process.env.RZP_SECRET}`
          ).toString("base64")}`,
        },
        body: JSON.stringify({
          contact_id: contact_data.id,
          account_type: "bank_account",
          bank_account: {
            name:
              formdata.get("first_name") +
              " " +
              formdata.get("middle_name") +
              " " +
              formdata.get("last_name"),
            ifsc: formdata.get("bank_ifsc_code"),
            account_number: formdata.get("bank_acc_no"),
          },
        }),
      }
    );

    const fund_data = await fund_response.json();
    console.log("Fund Data = ", fund_data);
    fund_id = fund_data.id;
    bank_name = fund_data?.bank_account?.bank_name;

    if (!fund_response.ok) {
      const deactivate_contact_response = await fetch(
        "https://api.razorpay.com/v1/contacts/" + contact_data.id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(
              `${process.env.RZP_KEY}:${process.env.RZP_SECRET}`
            ).toString("base64")}`,
          },
          body: JSON.stringify({ active: false }),
        }
      );
      console.log(
        "Contact Deactivated Due To Fund Can Not Generated = ",
        await deactivate_contact_response.json()
      );

      return NextResponse.json(fund_data.error, { status: 500 });
    }
  }

  // ---- updating data of employee ----
  await connectDB();

  const update = await Employee.updateOne(
    { _id: new mongoose.Types.ObjectId(id) },
    {
      $set: {
        image: formdata.get("image"),
        first_name: formdata.get("first_name"),
        middle_name: formdata.get("middle_name"),
        last_name: formdata.get("last_name"),
        email: formdata.get("email"),
        contact_no: formdata.get("contact_no"),
        home_address: formdata.get("home_address"),
        bank_acc_no: formdata.get("bank_acc_no"),
        bank_name: bank_name,
        bank_ifsc_code: formdata.get("bank_ifsc_code"),
        username: formdata.get("username"),
        password: formdata.get("password"),
        updated_by: id,
        rezorpay_contact_id: contact_id,
        rezorpay_fund_id: fund_id,
      },
    }
  );
  // console.log(update);
  if (update.acknowledged) return NextResponse.json({ success: true });
  return NextResponse.error("Failed To Update Details");
}
