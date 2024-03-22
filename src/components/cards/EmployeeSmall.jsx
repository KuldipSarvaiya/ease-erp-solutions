import { Button, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { MdUpdate } from "react-icons/md";

function EmployeeSmall() {
  function ToolTipDialog() {
    return (
      <div className="flex flex-col gap-3 bg-purple-900/10 backdrop-blur-2xl p-3 rounded-xl border-1 border-purple-900">
        <Image
          alt="profile image"
          height={100}
          radius="sm"
          src="/AdminPage.svg"
          width={250}
          className="object-cover overflow-hidden rounded-lg bg-slate-800"
        />
        <div className="flex flex-col">
          <p className="text-lg capitalize text-default-800">
            sarvaiya kuldip kishorbhai
          </p>
          <p className="text-sm text-default-600 capitalize">
            {" "}
            DOB : {new Date().toDateString()}
            <br />
            male
          </p>
          <p className="text-sm text-default-600 capitalize">
            <a href="mailto:kuldipsarvaiya94@gmail.com">
              kuldipsarvaiya94@gmail.com
            </a>
          </p>
          <p className="text-sm text-default-600 capitalize">+91 97249 24494</p>
          <p className="text-sm text-default-600 capitalize">
            coords : 72.323 , 21.432
            <br /> radius : 100 meters
          </p>
        </div>
        <Button
          href={`/managers/hr/manage_employee/update/${"zfsdf"}`}
          as={Link}
          size="sm"
          color="secondary"
          variant="solid"
          endContent={<MdUpdate className="scale-150" />}
        >
          U P D A T E &nbsp;&nbsp; D E T A I L S
        </Button>
      </div>
    );
  }

  return (
    <Tooltip
      content={<ToolTipDialog />}
      placement="top"
      delay={1000}
      className="bg-transparent border-none shadow-none "
    >
      <div className="p-2 flex flex-row gap-3 bg-purple-100/10 backdrop-blur-2xl rounded-xl border-1 border-purple-400 min-w-80 max-w-[350px] flex-1 hover:bg-purple-200/20">
        <Image
          alt="employee logo"
          height={60}
          radius="sm"
          src="/adminPage.svg"
          width={60}
          className="object-contain rounded-lg bg-slate-800"
        />
        <div className="flex flex-col">
          <p className="text-lg capitalize text-default-800">
            sarvaiya kuldip kishorbhai
          </p>
          <p className="text-small text-default-500 lowercase">
            Employee &rarr; kd_sarvaiya_
          </p>
          <p className="text-sm text-default-600 capitalize">
            Serving Since {new Date().toDateString()}
          </p>
        </div>
      </div>
    </Tooltip>
  );
}

export default EmployeeSmall;
