"use client";

import EmployeeSmall from "@/components/cards/EmployeeSmall";
import { Accordion, AccordionItem, Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import { BsPersonVcardFill } from "react-icons/bs";

export default function ManageEmpAdmin() {
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

        <Accordion
          className="grid  grid-cols-1 row-auto gap-5"
          variant="splitted"
        >
          {[
            "hr",
            "finance",
            "inventory",
            "fabri-manufacturing",
            "cleaning-and-finishing",
            "dying-and-printing",
            "cutting",
            "sewing",
            "packing-and-labeling",
          ].map((dept) => {
            return (
              <AccordionItem
                title={
                  <p className="text-lg font-bold tracking-wide w-full uppercase">
                    {dept.replaceAll("-", " ")}
                  </p>
                }
                key={dept}
                aria-label={dept}
              >
                <Divider className="my-5" />
                {/* person attendance chips */}
                <div className="flex flex-wrap flex-row justify-items-stretch gap-3 max-md:justify-center ">
                  <EmployeeSmall />
                  <EmployeeSmall />
                  <EmployeeSmall />
                  <EmployeeSmall />
                  <EmployeeSmall />
                  <EmployeeSmall />
                  <EmployeeSmall />
                  <EmployeeSmall />
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
