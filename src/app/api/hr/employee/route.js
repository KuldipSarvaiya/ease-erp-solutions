import { NextResponse } from "next/server";
import Employee from "@/lib/models/employee.model";
import connectDB from "@/lib/mongoose";
import { revalidateTag } from "next/cache";
import Department from "@/lib/models/department.model";
import mongoose from "mongoose";

export async function POST(request) {
  // console.log("new employee");
  const formdata = await request.formData();
  const dept = formdata.get("department_id");

  // !-----  creating contact in razorpay -----
  const contact_response = await fetch("https://api.razorpay.com/v1/contacts", {
    method: "POST",
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
  });

  const contact_data = await contact_response.json();
  console.log("Contact Data = ", contact_data);

  if (!contact_response.ok) {
    return NextResponse.json(contact_data.error, { status: 500 });
  }

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

  if (!fund_response.ok) {
    // !----- deactivate contact if fund not created ------
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

  // --------- create new employeee ------------------
  try {
    await connectDB();

    const createEmp = new Employee({
      image: formdata.get("image"),
      first_name: formdata.get("first_name"),
      middle_name: formdata.get("middle_name"),
      last_name: formdata.get("last_name"),
      gender: formdata.get("gender"),
      dob: new Date(formdata.get("dob")),
      doj: new Date(),
      prev_experience: formdata.get("prev_experience"),
      expert_area: formdata.get("expert_area"),
      course_studied: formdata.get("course_studied"),
      designation: formdata.get("designation"),
      attendance_coordinates: {
        latitude: formdata.get("latitude"),
        longitude: formdata.get("longitude"),
      },
      attendance_radius: formdata.get("attendance_radius"),
      basic_salary: formdata.get("basic_salary"),
      department_id: formdata.get("department_id"),
      email: formdata.get("email"),
      contact_no: formdata.get("contact_no"),
      home_address: formdata.get("home_address"),
      bank_acc_no: formdata.get("bank_acc_no"),
      bank_name:
        fund_data?.bank_account?.bank_name || formdata.get("bank_name"),
      bank_ifsc_code: formdata.get("bank_ifsc_code"),
      salary_cut_per_day: formdata.get("salary_cut_per_day"),
      ot_salary_per_hour: formdata.get("ot_salary_per_hour"),
      allowed_leave_per_month: formdata.get("allowed_leave_per_month"),
      username: formdata.get("username"),
      password: formdata.get("password"),
      updated_by: formdata.get("updated_by"),
      rezorpay_contact_id: contact_data.id,
      rezorpay_fund_id: fund_data.id,
    });

    const emp = await createEmp.save();

    // console.log(emp);
    return NextResponse.json({ success: true });
  } catch (error) {
    // console.log(error.code, error.message);

    if (
      error.code === 11000 &&
      error.message.includes("duplicate key error") &&
      error.message.includes("username")
    )
      return NextResponse.json(
        { field: "username", message: "This Username already exists" },
        { status: 500, statusText: "DUPLICATE USERNAME" }
      );

    // !----- deactivating contact if any error occurs -------
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
      "Contact Deactivated Due To Error = ",
      await deactivate_contact_response.json()
    );

    // !----- deactivating fund if any error occurs -------
    const deactivate_fund_response = await fetch(
      " https://api.razorpay.com/v1/fund_accounts/" + fund_data.id,
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
      "Fund Deactivated Due To Error = ",
      await deactivate_fund_response.json()
    );

    return NextResponse.error("serverside error");
  }
}

export async function GET(req) {
  await connectDB();
  const employees = await Department.aggregate([
    {
      $lookup: {
        from: "employees",
        localField: "_id",
        foreignField: "department_id",
        as: "employees",
      },
    },
    {
      $project: {
        employees: {
          $filter: {
            input: "$employees",
            cond: {
              $ne: ["$$this.designation", "Admin"],
              $ne: ["$$this.is_ex_employee", true],
            },
          },
        },
        prev_managers_id: 1,
        _id: 1,
        production_process_level: 1,
        dept_name: 1,
      },
    },
  ]);

  // console.log(employees);
  if (!employees) return NextResponse.error("No Data Found");

  return NextResponse.json(employees);
}

export async function PUT(req) {
  const formdata = await req.formData();

  let contact_id = formdata.get("rezorpay_contact_id");
  let fund_id = formdata.get("rezorpay_fund_id");
  let bank_name = formdata.get("bank_name");

  if (formdata.get("change_acc") === "1") {
    console.log("constact id = ", formdata.get("rezorpay_contact_id"));
    console.log("fund id = ", formdata.get("rezorpay_fund_id"));

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
      "https://api.razorpay.com/v1/fund_accounts/" +
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
      "Old Fund Deactivated = ",
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

  // console.log("depat_id = ", formdata.get("department_id"));

  // ----- updating employee details -----
  try {
    await connectDB();

    const update = await Employee.updateOne(
      { _id: new mongoose.Types.ObjectId(formdata.get("id")) },
      {
        $set: {
          image: formdata.get("image"),
          first_name: formdata.get("first_name"),
          middle_name: formdata.get("middle_name"),
          last_name: formdata.get("last_name"),
          gender: formdata.get("gender"),
          // dob: new Date(formdata.get("dob")),
          // prev_experience: formdata.get("prev_experience"),
          expert_area: formdata.get("expert_area"),
          course_studied: formdata.get("course_studied"),
          // designation: formdata.get("designation"),
          attendance_coordinates: {
            latitude: formdata.get("latitude"),
            longitude: formdata.get("longitude"),
          },
          attendance_radius: formdata.get("attendance_radius"),
          basic_salary: formdata.get("basic_salary"),
          department_id: formdata.get("department_id"),
          email: formdata.get("email"),
          contact_no: formdata.get("contact_no"),
          home_address: formdata.get("home_address"),
          bank_acc_no: formdata.get("bank_acc_no"),
          bank_name: bank_name,
          bank_ifsc_code: formdata.get("bank_ifsc_code"),
          salary_cut_per_day: formdata.get("salary_cut_per_day"),
          ot_salary_per_hour: formdata.get("ot_salary_per_hour"),
          allowed_leave_per_month: formdata.get("allowed_leave_per_month"),
          username: formdata.get("username"),
          password: formdata.get("password"),
          updated_by: formdata.get("updated_by"),
          rezorpay_contact_id: contact_id,
          rezorpay_fund_id: fund_id,
        },
      }
    );
    // console.log(update);
    if (update.acknowledged) {
      revalidateTag("UpdateEmployees");
      return NextResponse.json({ success: true });
    }
    return NextResponse.error("Failed To Update Details");

    // handeling errors
  } catch (error) {
    console.log(error, error.message);

    if (
      error.code === 11000 &&
      error.message.includes("duplicate key error") &&
      error.message.includes("username")
    )
      return NextResponse.json(
        { field: "username", message: "This Username already exists" },
        { status: 500, statusText: "DUPLICATE USERNAME" }
      );

    return NextResponse.json({ error: "serverside error" }, { status: 500 });
  }
}
