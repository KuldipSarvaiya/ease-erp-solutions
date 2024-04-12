import Employee from "@/lib/models/employee.model";
import Expense from "@/lib/models/expense.model";
import MetaData from "@/lib/models/metadata.model";
import Salary from "@/lib/models/salary.model";
import connectDB from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();

  const data = await Employee.aggregate([
    {
      $match: {
        $and: [
          {
            designation: {
              $ne: "Admin",
            },
          },
          { is_ex_employee: false },
        ],
      },
    },
    {
      $lookup: {
        from: "attendances",
        let: {
          employeeId: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$employee_id", "$$employeeId"],
                  },
                  {
                    $eq: [
                      {
                        $month: "$createdAt",
                      },
                      {
                        $month: new Date(),
                      },
                    ],
                  },
                  {
                    $eq: [
                      {
                        $year: "$createdAt",
                      },
                      {
                        $year: new Date(),
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
        as: "attendance",
      },
    },
    {
      $project: {
        _id: 1,
        attendance: 1,
        first_name: 1,
        middle_name: 1,
        image: 1,
        department_id: 1,
        designation: 1,
        image: 1,
        salary_cut_per_day: 1,
        allowed_leave_per_month: 1,
        ot_salary_per_hour: 1,
        basic_salary: 1,
        email: 1,
        rezorpay_contact_id: 1,
        rezorpay_fund_id: 1,
      },
    },
    {
      $addFields: {
        selected: false,
      },
    },
    {
      $group: {
        _id: "$department_id",
        employees: {
          $push: "$$ROOT",
        },
      },
    },
    {
      $lookup: {
        from: "departments",
        localField: "_id",
        foreignField: "_id",
        as: "department",
        pipeline: [
          {
            $project: {
              _id: 1,
              dept_name: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$department",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ["$$ROOT", "$department"],
        },
      },
    },
    {
      $project: {
        _id: 1,
        dept_name: 1,
        employees: 1,
      },
    },
  ]);

  console.log(data);
  return NextResponse.json(data, { status: 200 });
}

export async function POST(req) {
  try {
    const data = await req.json();

    await connectDB();

    const metadata = await MetaData.findOne({}).lean();
    console.log(metadata);

    // formate employee salary data
    const salary_slips = [];
    const emp_ids = [];
    let exp_amount = 0;
    for (let emp of data.employees) {
      emp_ids.push(emp._id);

      // deside basic salary based on working days
      const tt = new Date(new Date(data.month));
      tt.setDate(0);
      const month_days = tt.getDate();
      const diff =
        month_days - (emp.total_points + emp.allowed_leave_per_month);
      if (diff > 0) {
        emp.basic_salary = Math.floor(
          emp.basic_salary - Math.floor((emp.basic_salary / month_days) * diff)
        );
      }

      // employee's salary slip detials
      const dtl = {
        employee_id: emp._id,
        rezorpay_payout_id: "rezorpay_payout_id",
        salary_month: new Date(data.month),
        dearness_allowance: Math.floor(
          (emp.basic_salary * metadata.salary_da) / 100
        ),
        house_rent_allowance: Math.floor(
          (emp.basic_salary * metadata.salary_hra) / 100
        ),
        bonus: Math.floor((emp.basic_salary * metadata.salary_bonus) / 100),
        provident_fund: Math.floor(
          (emp.basic_salary * metadata.salary_pf) / 100
        ),
        profession_tax: Math.floor(metadata.salary_professionl_tax),
        travel_expense: Math.floor(metadata.salary_travel_expense),
        payment_mode: "Account",
        transaction_no: "trn-no",
        basic_salary: emp.basic_salary,
        overtime_salary: emp.total_ot_hours * emp.ot_salary_per_hour,
      };
      dtl.net_salary =
        dtl.basic_salary +
        dtl.bonus +
        dtl.dearness_allowance +
        dtl.house_rent_allowance +
        dtl.overtime_salary +
        dtl.travel_expense -
        dtl.profession_tax -
        dtl.provident_fund;

      exp_amount += dtl.net_salary;

      salary_slips.push(dtl);
    }

    const salarys = await Salary.insertMany(salary_slips);

    // const notices = await Employee.updateMany(
    //   { _id: { $in: emp_ids } },
    //   {
    //     $push: {
    //       notice:
    //         "Your Salary of " +
    //         data.month +
    //         " Has Been Creadited In Your Account 👍",
    //     },
    //   }
    // );

    const salary_ids = salarys.map((sal) => sal._id);

    console.log(salary_ids, exp_amount);

    const expense = await Expense.insertMany([
      {
        type: "employee_expense",
        salary_id: salary_ids,
        date: new Date(),
        amount: exp_amount,
        description: "Employees Salary of " + data.month.toString(),
      },
    ]);

    console.log(salary_slips, emp_ids);

    revalidatePath("managers/finanace/payroll");
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
