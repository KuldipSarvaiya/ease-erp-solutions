import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { FaDotCircle } from "react-icons/fa";

function GMEmployeeCard({ emp }) {
  function ToolTipDialog({ attendance }) {
    const date1 = new Date(attendance?.punch_out || new Date());
    const date2 = new Date(attendance?.punch_in);
    const diffInMs = Math.abs(date2 - date1);
    const total_hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const total_minutes = Math.floor(
      (diffInMs % (1000 * 60 * 60)) / (1000 * 60)
    );

    return (
      <div className="flex flex-col gap-3 bg-purple-900/10 backdrop-blur-2xl p-5 rounded-xl border-1 border-purple-900">
        <u>TODAY</u>
        <p>
          Punch In Time : {new Date(attendance?.punch_in).toLocaleTimeString()}
        </p>
        {attendance.punch_out && (
          <p>
            Punch Out Time :{" "}
            {new Date(attendance?.punch_out).toLocaleTimeString()}
          </p>
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
    );
  }
  const colors = {
    pending: "text-yellow-500",
    present: "text-emerald-500",
    onleave: "text-red-500",
    "": "text-white",
  };

  return (
    <Tooltip
      content={
        emp?.attendance?.state === "present" ||
        emp?.attendance?.state === "pending" ? (
          <ToolTipDialog attendance={emp?.attendance} />
        ) : (
          <></>
        )
      }
      // placement="top"
      delay={1000}
      className="bg-transparent border-none shadow-none "
    >
      <div className="p-2 flex flex-row gap-3 bg-purple-100/10 backdrop-blur-2xl rounded-xl border-1 border-purple-400 min-w-80 max-w-[350px] flex-1 hover:bg-purple-200/20">
        <Image
          alt="employee logo"
          height={100}
          radius="sm"
          src={"/kuldip_upload/" + emp?.image}
          width={100}
          className="object-cover rounded-lg bg-slate-800"
        />
        <div className="flex flex-col">
          <p className="text-lg capitalize text-default-800">
            {" "}
            {emp?.first_name} {emp?.middle_name} {emp?.last_name}{" "}
          </p>
          <p className="text-small text-default-500 lowercase">
            +91 {emp?.contact_no}
          </p>
          <p className="text-small text-default-500 lowercase">{emp?.email}</p>
          <p className="text-small text-default-500">
            DOJ : {new Date(emp?.doj).toLocaleDateString()}
          </p>
          <p className="text-sm text-default-600 capitalize flex gap-2 items-center">
            Attendance : {emp?.attendance?.state || "Absent"}
            <FaDotCircle className={colors[emp?.attendance?.state]} />
          </p>
        </div>
      </div>
    </Tooltip>
  );
}

export default GMEmployeeCard;
