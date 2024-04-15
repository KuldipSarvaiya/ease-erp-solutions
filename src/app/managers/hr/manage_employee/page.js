"use client";

import Loading from "@/components/Loading";
import EmployeeSmall from "@/components/cards/EmployeeSmall";
import { Accordion, AccordionItem, Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsPersonVcardFill } from "react-icons/bs";

export default function ManageEmpAdmin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (data.length === 0) {
      (async () => {
        const res = await fetch("/api/hr/employee", { method: "GET" });

        if (!res.ok)
          return alert("Can Not Get Employee Details Due To Network Error");

        const json = await res.json();
        // console.log(json);

        setData(json);
      })();
    }
  }, []);

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        {/* title */}
        <p className="uppercase text-2xl flex justify-between flex-row max-md:text-lg tracking-wider font-bold mb-5">
          <span>manage employees</span>

          <Button
            href={"/managers/hr/manage_employee/new"}
            as={Link}
            color="secondary"
            variant="shadow"
            size="md"
            className="uppercase tracking-widest"
            startContent={<BsPersonVcardFill className="scale-150" />}
          >
            Hire New Employee
          </Button>
        </p>
        <Divider className="my-5" />
        {data.length === 0 && (
          <div className="py-10 flex flex-row items-center gap-3 justify-center">
            <Loading /> Loading Employee Deatils
          </div>
        )}

        <Accordion
          className="grid  grid-cols-1 row-auto gap-5"
          variant="splitted"
        >
          {data?.map((dept) => {
            return (
              <AccordionItem
                title={
                  <p className="text-lg font-bold tracking-wide w-full uppercase">
                    {dept?.dept_name?.replaceAll("-", " ")}
                  </p>
                }
                key={dept.dept_name}
                aria-label={dept.dept_name}
              >
                <Divider className="my-5" />
                {/* person attendance chips */}
                <div className="flex flex-wrap flex-row justify-items-stretch gap-3 max-md:justify-center ">
                  {dept.employees?.map((emp, i) => (
                    <EmployeeSmall emp={emp} key={i} />
                  ))}
                  {dept?.employees.length === 0 && (
                    <h1>
                      This Department Is <b>ABANDON</b>, No Employee Works Here
                    </h1>
                  )}
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
