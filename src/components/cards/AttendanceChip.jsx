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

function AttendanceChip({ id, status, role }) {
  const colors = {
    pending: "text-yellow-500",
    present: "text-emerald-500",
    onleave: "text-red-500",
    "": "",
  };

  function ChangeAttendance({ id, status }) {
    return (
      <form action={changeAttendanceStatus}>
        <div className="flex flex-col gap-3 bg-purple-900/10 backdrop-blur-2xl p-5 rounded-xl border-1 border-purple-900">
          <div>
            <p>Punch In Time : {new Date().toLocaleTimeString()}</p>
            <p>Punch Out Time : {new Date().toLocaleTimeString()}</p>
            <p>
              Total Hours : 
              {new Date(new Date().setHours(14) - new Date()).getHours()}
            </p>
            <p>
              Over Time Hours : 
              {new Date(new Date().setHours(14) - new Date()).getHours()}
            </p>
          </div>
          <Divider className="my-2" />
          <Select
            name="status"
            color="primary"
            size="sm"
            // placeholder="Change Attendance Status"
            placeholder={status}
            isRequired
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
          <input type="text" value={id} hidden readOnly name="id" />
          <Button
            type="submit"
            color="primary"
            size="sm"
            variant="shadow"
            className="uppercase"
            endContent={<GrUpdate />}
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
      content={<ChangeAttendance id={id} status={status} />}
      className="bg-transparent border-none shadow-none"
    >
      <Chip
        variant={role === "manager" ? "solid" : "faded"}
        color="default"
        size="lg"
        // className="min-w-48 uppercase"
        avatar={
          <Avatar
            src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
            size="lg"
          />
        }
      >
        <span className="flex justify-between w-full gap-1 items-center uppercase">
          Kuldip Sarvaiya
          <FaDotCircle className={colors[status]} />
        </span>
      </Chip>
    </Tooltip>
  );
}

export default AttendanceChip;
