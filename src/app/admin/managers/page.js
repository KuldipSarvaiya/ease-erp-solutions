"use client";

import Loading from "@/components/Loading";
import EmployeeSmall from "@/components/cards/EmployeeSmall";
import { changeManager } from "@/lib/utils/server_actions/admin";
import { Button, Divider, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ManagersAdminPage() {
  const [data, setData] = useState([]);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(
        "/api/auth/signin?callback_url=/managers/hr/manage_employee/new"
      );
    },
  });

  useEffect(() => {
    if (data.length === 0) {
      (async () => {
        const res = await fetch("/api/hr/employee", {
          method: "GET",
          next: { tags: "ManageManagers" },
        });

        if (!res.ok)
          return alert("Can Not Get Manager Details Due To Network Error");

        const json = await res.json();
        console.log(json);

        setData(json);
      })();
    }
  }, []);

  async function handleChangeManager(event) {
    event.preventDefault();
    const formdata = new FormData(event.target);

    const res = await changeManager(formdata);

    if (res) alert("Manager Of The Department Has Changed Successfully");
    else alert("Faild To Change Manager Due to Network Issue");
  }

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500  gap-2 grid grid-cols-1 row-auto m-auto">
        <p className="text-2xl font-bold tracking-wide w-full">
          MANAGE MANAGERS
        </p>
        <Divider className="my-3" />
        {data.length === 0 && (
          <span>
            <Loading />
          </span>
        )}
        {data?.map((dept) => {
          return (
            <span
              key={dept?._id}
              className="grid grid-cols-5 max-md:grid-cols-1 max-md:grid-rows-2 mt-5 items-end"
            >
              <span className="col-start-1 col-end-3 max-lg:col-start-1 max-lg:col-end-1">
                <b className="uppercase tracking-widest">
                &nbsp;&nbsp;{dept?.dept_name?.replaceAll("-", " ")} :
                </b>
                <EmployeeSmall
                  emp={
                    dept?.employees?.filter(
                      (e) => e.designation === "Manager"
                    )[0]
                  }
                  manager={true}
                />
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
                  value={dept?._id}
                />
                <input
                  hidden
                  readOnly
                  type="text"
                  name="updated_by"
                  value={session?.user?._id}
                />
                <input
                  hidden
                  readOnly
                  type="text"
                  name="current_manager"
                  value={
                    dept?.employees?.filter(
                      (e) => e.designation === "Manager"
                    )?.[0]?._id
                  }
                />
                <Select
                  variant="faded"
                  color="secondary"
                  size="sm"
                  name="new_manager"
                  aria-label="new manager"
                  aria-labelledby="new manager"
                  isRequired
                  defaultSelectedKeys={[
                    dept?.employees?.filter(
                      (e) => e.designation === "Manager"
                    )?.[0]?._id,
                  ]}
                >
                  {dept?.employees?.map((emp) => (
                    <SelectItem
                      key={emp?._id}
                      value={dept?._id}
                      className="capitalize"
                    >
                      {`
                    ${emp?.middle_name} ${emp?.first_name} ${
                        "DOJ : ".padStart(100, "‎ ") +
                        new Date(emp?.doj).toLocaleDateString()
                      } 
                    `}
                    </SelectItem>
                  ))}
                </Select>
                <Button
                  type="submit"
                  className="uppercase w-fit"
                  variant="shadow"
                  color="secondary"
                >
                  CHANGE {dept?.dept_name?.replaceAll("-", " ")} MANAGER
                </Button>
              </form>
            </span>
          );
        })}
      </div>
    </div>
  );
}
