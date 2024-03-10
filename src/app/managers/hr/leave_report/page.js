import { Button, Divider, Tooltip } from "@nextui-org/react";
import { PiCheckFatFill } from "react-icons/pi";
import { ImCross } from "react-icons/im";
import { RiInformationFill } from "react-icons/ri";
import ThisMonthCalender from "@/components/cards/ThisMonthCalender";
import { revalidatePath } from "next/cache";

export default function LeavePage() {
  // server action to change leave report status
  async function leaveReportStatus(formdata) {
    "use server";
    console.log(formdata.get("id"));
    console.log(formdata.get("status"));
    revalidatePath("/managers/hr/leave_report");
  }

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* leave requests */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        <p className="uppercase text-2xl max-md:text-lg tracking-wider font-bold mb-5">
          requested leave applications
        </p>
        <Divider className="my-5" />
        <div class="w-11/12 bg-neutral-800 p-5 rounded-2xl m-auto">
          <table width={"100%"} align="center">
            <thead>
              <tr>
                <th className=" bg-neutral-700 rounded-l-lg py-2 pl-2 text-left">
                  DATE
                </th>
                <th className=" bg-neutral-700 py-2  text-left">NAME</th>
                <th className=" bg-neutral-700 py-2 text-left">DEPARTMENT</th>
                <th className=" bg-neutral-700 py-2 text-left">LEAVE DATES</th>
                <th className=" bg-neutral-700 py-2 text-left">REASON</th>
                <th className=" bg-neutral-700 rounded-r-lg py-2 text-left">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-neutral-900 mt-2">
                <td className="pl-2 text-left align-middle">
                  {new Date().toLocaleDateString()}
                </td>
                <td className="text-left align-middle">Kuldip Sarvaiya</td>
                <td className="text-left align-middle">Finance</td>
                <td className="text-left align-middle">
                  <p>{new Date().toLocaleDateString()}</p>
                </td>
                <td className="text-left align-middle">
                  i have to attend a function
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
                    <input type="text" value={"id"} hidden readOnly name="id" />
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
                    <input type="text" value={"id"} hidden readOnly name="id" />
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
                        leaves_dates={[
                          new Date(2024, 2, 9),
                          new Date(2024, 2, 4),
                        ]}
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
        <div class="w-11/12 bg-neutral-800 p-5 rounded-2xl m-auto">
          <table width={"100%"} align="center">
            <thead>
              <tr>
                <th className=" bg-neutral-700 rounded-l-lg py-2 pl-2 text-left">
                  DATE
                </th>
                <th className=" bg-neutral-700 py-2  text-left">NAME</th>
                <th className=" bg-neutral-700 py-2 text-left">DEPARTMENT</th>
                <th className=" bg-neutral-700 py-2 text-left">LEAVE DATES</th>
                <th className=" bg-neutral-700 rounded-r-lg py-2 text-left">
                  REASON
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-neutral-900 mt-2">
                <td className="pl-2 text-left align-middle">
                  {new Date().toLocaleDateString()}
                </td>
                <td className="text-left align-middle">Kuldip Sarvaiya</td>
                <td className="text-left align-middle">Finance</td>
                <td className="text-left align-middle">
                  <p>{new Date().toLocaleDateString()}</p>
                </td>
                <td className="text-left align-middle">
                  i have to attend a function
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
