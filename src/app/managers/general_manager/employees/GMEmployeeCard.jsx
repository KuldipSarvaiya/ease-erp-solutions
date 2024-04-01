import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { FaDotCircle } from "react-icons/fa";

function GMEmployeeCard() {
  function ToolTipDialog() {
    return (
      <div className="flex flex-col gap-3 bg-purple-900/10 backdrop-blur-2xl p-5 rounded-xl border-1 border-purple-900">
        <u>TODAY</u>
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
      content={<ToolTipDialog />}
      // placement="top"
      delay={1000}
      className="bg-transparent border-none shadow-none "
    >
      <div className="p-2 flex flex-row gap-3 bg-purple-100/10 backdrop-blur-2xl rounded-xl border-1 border-purple-400 min-w-80 max-w-[350px] flex-1 hover:bg-purple-200/20">
        <Image
          alt="employee logo"
          height={100}
          radius="sm"
          src="/adminPage.svg"
          width={100}
          className="object-contain rounded-lg bg-slate-800"
        />
        <div className="flex flex-col">
          <p className="text-lg capitalize text-default-800">
            sarvaiya kuldip kishorbhai
          </p>
          <p className="text-small text-default-500 lowercase">
            +91 9724924494
          </p>
          <p className="text-small text-default-500 lowercase">
            kuldipsarvaiya94@gmail.com
          </p>
          <p className="text-small text-default-500">
            DOJ : {new Date().toLocaleDateString()}
          </p>
          <p className="text-sm text-default-600 capitalize flex gap-2 items-center">
            Attendance : present
            <FaDotCircle className={colors["present"]} />
          </p>
        </div>
      </div>
    </Tooltip>
  );
}

export default GMEmployeeCard;
