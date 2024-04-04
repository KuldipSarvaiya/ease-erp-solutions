import { Avatar, Button, Chip, Divider, Textarea } from "@nextui-org/react";
import { FaDotCircle } from "react-icons/fa";
import { GrPowerReset, GrTask } from "react-icons/gr";
import { MdOutlineNotificationsActive } from "react-icons/md";

export default function Page() {
  const colors = {
    pending: "text-yellow-500",
    present: "text-emerald-500",
    onleave: "text-red-500",
    "": "text-white",
  };

  const employees = [
    {
      _id: "fhmewew23",
      department: "finance",
      name: "John",
      image: "/AdminPage.svg",
      attendance: "pending",
    },
    {
      _id: "fhmewew23",
      department: "inventory",
      name: "kuldip",
      image: "/AdminPage.svg",
      attendance: "",
    },
    {
      _id: "fhmewew23",
      department: "hr",
      name: "John",
      image: "/AdminPage.svg",
      attendance: "present",
    },
    {
      _id: "fhmewew23",
      department: "fabric-manufacturing",
      name: "kuldips",
      image: "/AdminPage.svg",
      attendance: "present",
    },
    {
      _id: "fhmewew23",
      department: "cleaning-and-finishing",
      name: "John",
      image: "/AdminPage.svg",
      attendance: "onleave",
    },
    {
      _id: "fhmewew23",
      department: "dying-and-printing",
      name: "ramesh",
      image: "/AdminPage.svg",
      attendance: "present",
    },
    {
      _id: "fhmewew23",
      department: "cutting",
      name: "John",
      image: "/AdminPage.svg",
      attendance: "pending",
    },
    {
      _id: "fhmewew23",
      department: "sewing",
      name: "man",
      image: "/AdminPage.svg",
      attendance: "onleave",
    },
    {
      _id: "fhmewew23",
      department: "packing-and-labeling",
      name: "mohan",
      image: "/AdminPage.svg",
      attendance: "pending",
    },
  ];

  async function handleSubit(formdata) {
    "use server";

    console.log("task clicked = ", formdata.get("task") !== null);
    console.log("notice clicked = ", formdata.get("notice") !== null);
    console.log(formdata.get("text"));
    console.log(formdata.getAll("employees"));
  }

  return (
    <div className="relative w-full h-full max-h-full max-w-full"> 
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <p className="text-2xl font-bold tracking-wide w-full">ASSIGN TASKS</p>
        <Divider className="my-3" />
        <div>
          <form action={handleSubit} className="flex flex-col gap-5">
            <Textarea
              label="Task / Notice   Text"
              labelPlacement="inside"
              name="text"
              color="secondary"
              variant="faded"
              isRequired
              aria-label="employee task text"
              aria-labelledby="employee task text"
              cols={70}
              className="max-w-max"
            />
            <span className="text-lg font-semibold">Select Employees : </span>
            <div className="flex flex-row flex-wrap gap-4 ">
              {employees.map((emp, i) => (
                <Chip
                  key={emp?._id + i}
                  variant="faded"
                  color="secondary"
                  aria-label="employee chip"
                  aria-labelledby="employee chip"
                  startContent={
                    <input
                      type="checkbox"
                      name="employees"
                      value={emp?._id}
                      className="accent-purple-500 cursor-pointer"
                      aria-label="employee checkbox"
                      aria-labelledby="employee checkbox"
                    />
                  }
                  endContent={
                    <FaDotCircle className={colors[emp?.attendance]} />
                  }
                  className="h-fit p-1"
                >
                  <span className="flex gap-3 justify-around items-center capitalize">
                    <Avatar
                      size="sm"
                      src={emp?.image}
                      aria-label="employee avatar"
                      aria-labelledby="employee avatar"
                    />
                    <span className="grid grid-rows-1">
                      {emp?.name}
                      <span className="text-xs">{emp?.department.replaceAll("-"," ")}</span>
                    </span>
                  </span>
                </Chip>
              ))}
            </div>
            <span>
              <Button
                type="submit"
                variant="shadow"
                name="notice"
                size="md"
                color="secondary"
                className="max-w-max"
                endContent={
                  <MdOutlineNotificationsActive className="scale-125" />
                }
              >
                SEND NOTICE
              </Button>
              &nbsp; &nbsp;
              <Button
                type="submit"
                name="task"
                variant="shadow"
                size="md"
                color="secondary"
                className="max-w-max"
                endContent={<GrTask />}
              >
                ASSIGN TASK
              </Button>
              &nbsp; &nbsp;
              <Button
                type="reset"
                variant="shadow"
                size="md"
                color="secondary"
                className="max-w-max"
                endContent={<GrPowerReset />}
              >
                RESET
              </Button>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
