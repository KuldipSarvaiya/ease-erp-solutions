"use client";

import EmployeeSmall from "@/components/cards/EmployeeSmall";
import { Button, Divider, Select, SelectItem } from "@nextui-org/react";

export default function ManagersAdminPage() {
  const data = {
    hr: [
      { name: "kuldip", _id: "2323rjneo32jk" },
      { name: "aarya", _id: "23r3jneo32jk" },
      { name: "man", _id: "23rjne3o32jk" },
      { name: "kush", _id: "23rjne3o32jk" },
      { name: "ved", _id: "23rjneo332jfe3k" },
      { name: "heer", _id: "23rjneo332jk" },
    ],
    finance: [
      { name: "kuldip", _id: "423rjneo32jk" },
      { name: "aarya", _id: "234rjneo32jk" },
      { name: "man", _id: "23rjn4eo32jk" },
      { name: "kush", _id: "23rjn4eo32jk" },
      { name: "ved", _id: "23rjneo432jfe3k" },
      { name: "heer", _id: "23rjneo432jk" },
    ],
    inventory: [
      { name: "kuldip", _id: "523rjneo32jk" },
      { name: "aarya", _id: "235rjneo32jk" },
      { name: "man", _id: "23rjn5eo32jk" },
      { name: "kush", _id: "23rjn5eo32jk" },
      { name: "ved", _id: "23rjneo532jfe3k" },
      { name: "heer", _id: "23rjneo532jk" },
    ],
    "fabri-manufacturing": [
      { name: "kuldip", _id: "623rjneo32jk" },
      { name: "aarya", _id: "236rjneo32jk" },
      { name: "man", _id: "23rjn6eo32jk" },
      { name: "kush", _id: "23rjn6eo32jk" },
      { name: "ved", _id: "23rjneo6632jfe3k" },
      { name: "heer", _id: "23rjneo362jk" },
    ],
    "cleaning-and-finishing": [
      { name: "kuldip", _id: "723rjneo32jk" },
      { name: "aarya", _id: "237rjneo32jk" },
      { name: "man", _id: "23rjn7eo32jk" },
      { name: "kush", _id: "23rjn7eo32jk" },
      { name: "ved", _id: "23rjneo732jfe3k" },
      { name: "heer", _id: "23rjneo732jk" },
    ],
    "dying-and-printing": [
      { name: "kuldip", _id: "823rjneo32jk" },
      { name: "aarya", _id: "238rjneo32jk" },
      { name: "man", _id: "23rjn8eo32jk" },
      { name: "kush", _id: "23rjn8eo32jk" },
      { name: "ved", _id: "23rjneo832jfe3k" },
      { name: "heer", _id: "23rjneo832jk" },
    ],
    cutting: [
      { name: "kuldip", _id: "923rjneo32jk" },
      { name: "aarya", _id: "239rjneo32jk" },
      { name: "man", _id: "23rjn9eo32jk" },
      { name: "kush", _id: "23rjn9eo32jk" },
      { name: "ved", _id: "23rjneo932jfe3k" },
      { name: "heer", _id: "23rjneo932jk" },
    ],
    sewing: [
      { name: "kuldip", _id: "123rjneo32jk" },
      { name: "aarya", _id: "231rjneo32jk" },
      { name: "man", _id: "23rjn1eo32jk" },
      { name: "kush", _id: "23rjn1eo32jk" },
      { name: "ved", _id: "23rjneo132jfe3k" },
      { name: "heer", _id: "23rjneo132jk" },
    ],
    "packing-and-labeling": [
      { name: "kuldip", _id: "223rjneo32jk" },
      { name: "aarya", _id: "232rjneo32jk" },
      { name: "man", _id: "23rjn2eo32jk" },
      { name: "kush", _id: "23rjn2eo32jk" },
      { name: "ved", _id: "23rjneo232jfe3k" },
      { name: "heer", _id: "23rjneo232jk" },
    ],
  };

  const departments = Object.keys(data);

  function handleChangeManager(event) {
    event.preventDefault();
    const fromdata = new FormData(event.target);

    console.log(fromdata.get("department"));
    console.log(fromdata.get("new_manager"));
  }

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500  gap-2 grid grid-cols-1 row-auto m-auto">
        <p className="text-2xl font-bold tracking-wide w-full">
          MANAGE MANAGERS
        </p>
        <Divider className="my-3" />
        {departments?.map((dept) => {
          return (
            <span
              key={dept}
              className="grid grid-cols-5 max-md:grid-cols-1 max-md:grid-rows-2 mt-5 items-end"
            >
              <span className="col-start-1 col-end-3 max-lg:col-start-1 max-lg:col-end-1">
                <b className="uppercase tracking-widest">
                  {dept.replaceAll("-", " ")} :
                </b>
                <EmployeeSmall />
              </span>
              <form
                onSubmit={handleChangeManager}
                className="col-start-3 col-end-5 flex flex-col gap-2  max-lg:col-start-1 max-lg:col-end-1"
              >
                <input
                  hidden
                  readOnly
                  type="text"
                  name="department"
                  value={dept}
                />
                <Select
                  variant="faded"
                  color="secondary"
                  size="md"
                  name="new_manager"
                  aria-label="new manager"
                  aria-labelledby="new manager"
                  isRequired
                >
                  {data[dept]?.map((emp) => (
                    <SelectItem key={emp?._id} value={dept?._id}>
                      {emp?.name}
                    </SelectItem>
                  ))}
                </Select>
                <Button
                  type="submit"
                  className="uppercase w-fit"
                  variant="shadow"
                  color="secondary"
                >
                  CHANGE {dept.replaceAll("-", " ")} MANAGER
                </Button>
              </form>
            </span>
          );
        })}
      </div>
    </div>
  );
}
