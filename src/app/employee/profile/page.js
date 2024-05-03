import { options } from "@/app/api/auth/[...nextauth]/options";
import Department from "@/lib/models/department.model";
import Employee from "@/lib/models/employee.model";
import connectDB from "@/lib/mongoose";
import { Avatar } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(options);
  // // console.log(session?.user, session?.user?.image);

  await connectDB();

  const emp = await Employee.findOne({ _id: session?.user?._id }).populate({
    path: "department_id",
    select: "dept_name",
    model: Department,
  });

  // console.log(emp);

  if (!emp) return notFound();

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* photo name */}
      <div className="flex flex-row justify-start max-w-full ml-10 h-32 items-end gap-14 max-md:items-center max-md:h-fit max-md:flex-col max-md:gap-2 max-md:justify-center max-md:m-0">
        <Avatar
          src={emp.image}
          alt="profile"
          size="lg"
          isBordered
          className="scale-[3] mx-8 ml-24 translate-y-7 max-md:mx-0 max-md:my-10"
        />
        <div className="text-3xl font-bold md:flex-grow max-md:my-2 max-md:mt-14 min-md:text-xl">
          Welcome {":)"},
          <p className="text-4xl uppercase min-md:text-2xl">
            {emp.first_name} {emp.middle_name}
          </p>
        </div>
        <p className="text-xl min-md:text-md md:mr-20">
          ID : {emp._id.toString()}
        </p>
      </div>

      {/* main content */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        <p className="text-end italic md:mb-7 ">
          Hello👋, hope you are Nice, and ready to dive into today&apos;s job...
        </p>

        {/* details */}
        <div className="flex flex-row max-md:flex-col flex-wrap justify-around max-md:gap-7 text-nowrap md:text-lg">
          {/* personal details */}
          <div className="max-w-sm">
            <u className="m-16 uppercase text-2xl max-md:text-lg tracking-wider font-bold">
              Personal Profile
            </u>
            <div className="flex flex-row flex-nowrap gap-5 mt-5">
              <div className="flex flex-col flex-nowrap gap-3">
                <p>
                  <b>Full Name</b>
                </p>
                <p>
                  <b>DOB</b>
                </p>
                <p>
                  <b>Gender</b>
                </p>
                <p>
                  <b>Email</b>
                </p>
                <p>
                  <b>Contact No.</b>
                </p>
                <p>
                  <b>Account No.</b>
                </p>
                <p>
                  <b>Bank Name</b>
                </p>
                <p>
                  <b>IFSC Code</b>
                </p>
                <p>
                  <b>Address</b>
                </p>
              </div>
              <div className="flex flex-col flex-nowrap gap-3">
                <p>
                  : {emp.first_name} {emp.middle_name} {emp.last_name}
                </p>
                <p>: {new Date(emp.dob).toDateString()}</p>
                <p>: {emp.gender}</p>
                <p>: {emp.email}</p>
                <p>: {emp.contact_no}</p>
                <p>: {emp.bank_acc_no}</p>
                <p>: {emp.bank_name}</p>
                <p>: {emp.bank_ifsc_code}</p>
                <p className="text-wrap">: {emp.home_address}</p>
              </div>
            </div>
          </div>
          <hr className="rotate-90 self-center hidden" width={290} />
          {/* company details */}
          <div className="max-w-xs">
            <u className="m-16 uppercase text-2xl max-md:text-lg tracking-wider font-bold">
              Company Details
            </u>
            <div className="flex flex-row flex-nowrap gap-5 mt-5">
              <div className="flex flex-col flex-nowrap gap-3">
                <p>
                  <b>Designation</b>
                </p>
                <p>
                  <b>DOJ</b>
                </p>
                <p>
                  <b>Department</b>
                </p>
                <p>
                  <b>Basic Salary</b>
                </p>
                <p>
                  <b>OT-Salary / Hour</b>
                </p>
                <p>
                  <b>Allowed Leave / Month</b>
                </p>
                <p>
                  <b>Salary Cut / Leave</b>
                </p>
              </div>
              <div className="flex flex-col flex-nowrap gap-3">
                <p>: {emp.designation}</p>
                <p>: {new Date(emp.doj).toDateString()}</p>
                <p>: {emp.department_id.dept_name.replaceAll("-", " ")}</p>
                <p>: {emp.basic_salary}</p>
                <p>: {emp.ot_salary_per_hour}</p>
                <p>: {emp.allowed_leave_per_month}</p>
                <p>: {emp.salary_cut_per_day}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
