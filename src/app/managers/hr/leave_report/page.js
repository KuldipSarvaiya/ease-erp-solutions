import { Button, Divider, Tooltip } from "@nextui-org/react";
import { PiCheckFatFill } from "react-icons/pi";
import { ImCross } from "react-icons/im";
import { RiInformationFill } from "react-icons/ri";
import ThisMonthCalender from "@/components/cards/ThisMonthCalender";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import LeaveReport from "@/lib/models/leave_report.model";

export default async function LeavePage() {
  const session = await getServerSession(options);

  const leaves = await LeaveReport.aggregate([
    {
      $lookup: {
        from: "employees",
        localField: "requested_by",
        foreignField: "_id",
        as: "requested_by",
      },
    },
    {
      $unwind: "$requested_by",
    },
    {
      $lookup: {
        from: "departments",
        localField: "requested_by.department_id",
        foreignField: "_id",
        as: "department",
      },
    },
    {
      $unwind: "$department",
    },
    {
      $project: {
        requested_by: {
          first_name: 1,
          middle_name: 1,
        },
        department: {
          dept_name: 1,
        },
        createdAt: 1,
        leave_state: 1,
        dates_of_leave: 1,
        total_leave_days: 1,
        reason: 1,
      },
    },
    {
      $group: {
        _id: "$leave_state",
        leave_reports: {
          $push: "$$ROOT",
        },
      },
    },
  ]);

  const pending_leaves = leaves.filter((leave) => leave._id === "pending")[0];
  const accepted_leaves = leaves.filter((leave) => leave._id === "accepted")[0];
  // console.log(pending_leaves?.leave_reports, accepted_leaves?.leave_reports);

  // server action to change leave report status
  async function leaveReportStatus(formdata) {
    "use server";
    const id = formdata.get("id");
    const state = formdata.get("status");

    const res = await LeaveReport.updateOne(
      { _id: id },
      { $set: { leave_state: state } }
    );

    if (res.acknowledged) revalidatePath("/managers/hr/leave_report");
  }

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* leave requests */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        <p className="uppercase text-2xl max-md:text-lg tracking-wider font-bold mb-5">
          requested leave applications
        </p>
        <Divider className="my-5" />
        <div className="w-11/12 bg-neutral-800 p-5 rounded-2xl m-auto">
          <table width={"100%"} align="center">
            <thead>
              <tr>
                <th className=" bg-neutral-700 rounded-l-lg py-2 pl-2 text-left">
                  APPLIED
                </th>
                <th className=" bg-neutral-700 py-2  text-left">NAME</th>
                <th className=" bg-neutral-700 py-2 text-left">DEPARTMENT</th>
                <th className=" bg-neutral-700 py-2 text-left">LEAVE DATES</th>
                <th className=" bg-neutral-700 py-2 text-left">DAYS</th>
                <th className=" bg-neutral-700 py-2 text-left">REASON</th>
                <th className=" bg-neutral-700 rounded-r-lg py-2 text-left">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {pending_leaves?.leave_reports?.map((leave) => (
                <tr className="hover:bg-neutral-900 mt-2" key={leave._id}>
                  <td className="pl-2 text-left align-middle">
                    {new Date(leave.createdAt).toLocaleDateString()}
                  </td>
                  <td className="text-left align-middle capitalize">
                    {leave.requested_by.middle_name}
                    {leave.requested_by.first_name}
                  </td>
                  <td className="text-left align-middle uppercase">
                    {leave?.department?.dept_name}
                  </td>
                  <td className="text-left align-middle">
                    {leave.dates_of_leave.map((date, i) => (
                      <p key={i}>{new Date(date).toLocaleDateString()}</p>
                    ))}
                  </td>
                  <td className="text-left align-middle">
                    {leave.total_leave_days}
                  </td>
                  <td className="text-left align-middle max-w-96">
                    {leave.reason}
                  </td>
                  <td className="flex gap-2 text-left align-middle">
                    {/* accept leave report */}
                    <form action={leaveReportStatus}>
                      <input
                        type="text"
                        value={"accepted"}
                        hidden
                        readOnly
                        name="status"
                      />
                      <input
                        type="text"
                        value={leave._id.toString()}
                        hidden
                        readOnly
                        name="id"
                      />
                      <Button
                        variant="faded"
                        size="sm"
                        title="approve leave application"
                        isIconOnly
                        color="success"
                        type="submit"
                      >
                        <PiCheckFatFill />
                      </Button>
                    </form>

                    {/* reject leave report */}
                    <form action={leaveReportStatus}>
                      <input
                        type="text"
                        value={"rejected"}
                        hidden
                        readOnly
                        name="status"
                      />
                      <input
                        type="text"
                        value={leave._id.toString()}
                        hidden
                        readOnly
                        name="id"
                      />
                      <Button
                        variant="faded"
                        size="sm"
                        title="reject leave application"
                        isIconOnly
                        color="danger"
                        type="submit"
                      >
                        <ImCross />
                      </Button>
                    </form>

                    {/* previous leave preview of this month */}
                    <Tooltip
                      content={
                        <ThisMonthCalender
                          leaves_dates={leave?.dates_of_leave}
                        />
                      }
                    >
                      <Button
                        variant="faded"
                        size="sm"
                        title="about leave applicant"
                        isIconOnly
                        color="primary"
                      >
                        <RiInformationFill />
                      </Button>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* upcoming accepted leaves */}
      <div className="border-4 rounded-3xl mx-10 my-4 mt-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        <p className="uppercase text-2xl max-md:text-lg tracking-wider font-bold mb-5">
          accepted upcoming leave reports
        </p>
        <Divider className="my-5" />
        <div className="w-11/12 bg-neutral-800 p-5 rounded-2xl m-auto">
          <table width={"100%"} align="center">
            <thead>
              <tr>
                <th className=" bg-neutral-700 rounded-l-lg py-2 pl-2 text-left">
                  APPLIED
                </th>
                <th className=" bg-neutral-700 py-2  text-left">NAME</th>
                <th className=" bg-neutral-700 py-2 text-left">DEPARTMENT</th>
                <th className=" bg-neutral-700 py-2 text-left">LEAVE DATES</th>
                <th className=" bg-neutral-700 py-2 text-left">DAYS</th>
                <th className=" bg-neutral-700 rounded-r-lg py-2 text-left">
                  REASON
                </th>
              </tr>
            </thead>
            <tbody>
              {accepted_leaves?.leave_reports?.map((leave) => (
                <tr className="hover:bg-neutral-900 mt-2" key={leave._id}>
                  <td className="pl-2 text-left align-middle">
                    {new Date(leave.createdAt).toLocaleDateString()}
                  </td>
                  <td className="text-left align-middle capitalize">
                    {leave.requested_by.middle_name}
                    {leave.requested_by.first_name}
                  </td>
                  <td className="text-left align-middle uppercase">
                    {leave?.department?.dept_name}
                  </td>
                  <td className="text-left align-middle">
                    {leave.dates_of_leave.map((date, i) => (
                      <p key={i}>{new Date(date).toLocaleDateString()}</p>
                    ))}
                  </td>
                  <td className="text-left align-middle">
                    {leave.total_leave_days}
                  </td>
                  <td className="text-left align-middle max-w-96">
                    {leave.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
