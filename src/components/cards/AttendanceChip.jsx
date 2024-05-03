"use client";

//  used with hr attendace
import { changeAttendanceStatus } from "@/lib/utils/server_actions/hr";
import {
  Avatar,
  Button,
  Chip,
  Divider,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
import { FaDotCircle } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";

function AttendanceChip({ status, emp, session }) {
  const colors = {
    pending: "text-yellow-500",
    present: "text-emerald-500",
    onleave: "text-red-500",
    absent: "",
  };

  function ChangeAttendance() {
    // console.log("this employee att = ", emp?.attendance);
    const date1 = emp?.attendance?.punch_out
      ? new Date(emp?.attendance?.punch_out)
      : new Date();
    const date2 = new Date(emp?.attendance?.punch_in) || new Date();
    const diffInMs = Math.abs(date2 - date1);
    const total_hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const total_minutes = Math.floor(
      (diffInMs % (1000 * 60 * 60)) / (1000 * 60)
    );
    const point = total_hours >= 8 ? 1 : total_hours >= 4 ? 0.5 : 0;
    const overtime_hours =
      total_hours > 8
        ? total_hours - 8
        : total_hours > 4
        ? total_hours - 4
        : total_hours;

    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formdata = new FormData(e.target);
          formdata.append("_id", emp?.attendance?._id);
          formdata.append("overtime_hours", overtime_hours);
          formdata.append("point", point);
          formdata.append("updated_by", session?.user?._id);
          // if (formdata.get("state") === "pending") return alert("You Can Not Fill Proxy Of Employee")
          if (session?.user?._id) {
            const res = await changeAttendanceStatus(formdata);
            if (res) return alert("Attendance is Changed Successfully");
            alert("Failed To Change Attendance of Employee");
          }
        }}
      >
        <div className="flex flex-col gap-3 bg-purple-900/10 backdrop-blur-2xl p-5 rounded-xl border-1 border-purple-900">
          {status === "absent" || status === "onleave" ? (
            <></>
          ) : (
            <>
              <div>
                <p>
                  Punch In Time :{" "}
                  {new Date(emp?.attendance?.punch_in).toLocaleTimeString()}
                </p>
                {status === "present" && (
                  <>
                    <p>
                      Punch Out Time :{" "}
                      {new Date(
                        emp?.attendance?.punch_out
                      ).toLocaleTimeString()}
                    </p>
                    <p>Point : {emp?.attendance?.point}</p>
                  </>
                )}
                <p>
                  Total Time : {total_hours} hours&nbsp;|&nbsp;
                  {total_minutes} minutes
                </p>
                {total_hours > 8 && (
                  <p>
                    Over Time : {total_hours - 8} hours&nbsp;|&nbsp;
                    {total_minutes - 60} minutes
                  </p>
                )}
              </div>
              <Divider className="my-2" />
            </>
          )}
          <Select
            name="state"
            color="primary"
            size="sm"
            // placeholder="Change Attendance Status"
            defaultSelectedKeys={[status]}
            isRequired
            aria-label="change attendance status"
            className="uppercase"
          >
            <SelectItem key={"pending"} value={"pending"}>
              pending
            </SelectItem>
            <SelectItem key={"present"} value={"present"}>
              present
            </SelectItem>
            <SelectItem key={"onleave"} value={"onleave"}>
              onleave
            </SelectItem>
            <SelectItem key={"absent"} value={"absent"}>
              absent
            </SelectItem>
          </Select>
          <Button
            type="submit"
            color="primary"
            size="sm"
            variant="shadow"
            className="uppercase"
            endContent={<GrUpdate />}
            isDisabled={!emp.attendance}
          >
            Change Attendance
          </Button>
        </div>
      </form>
    );
  }

  return (
    <Tooltip
      color="secondary"
      placement="top"
      // delay={500}
      content={<ChangeAttendance />}
      className="bg-transparent border-none shadow-none"
    >
      <Chip
        variant={emp.designation === "Manager" ? "solid" : "faded"}
        color="default"
        size="lg"
        // className="min-w-48 uppercase"
        avatar={<Avatar src={emp.image} size="lg" />}
      >
        <span className="flex justify-between w-full gap-1 items-center uppercase">
          {emp.middle_name} {emp.first_name}
          <FaDotCircle className={colors[status]} />
        </span>
      </Chip>
    </Tooltip>
  );
}

export default AttendanceChip;
