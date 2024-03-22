"use client";

import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Checkbox,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { MdUpdate } from "react-icons/md";
import { FcMoneyTransfer } from "react-icons/fc";
import { PiArrowBendDoubleUpRightFill } from "react-icons/pi";
import { payroll } from "@/lib/utils/server_actions/finance";
import { GrLinkNext } from "react-icons/gr";

export default function PayrollPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [emp, setEmp] = useState({
    hr: [
      {
        id: "31432ewd23",
        image: "/adminPage.svg",
        name: "kuldip sarvaiya",
        presents: 23,
        department: "hr",
        selected: false,
      },
      {
        id: "31432ewd23",
        image: "/adminPage.svg",
        name: "kuldip ",
        presents: 23,
        department: "hr",
        selected: false,
      },
    ],
    finance: [
      {
        id: "31432ewd23",
        image: "/adminPage.svg",
        name: "kuldip sarvaiya",
        presents: 23,
        department: "finance",
        selected: false,
      },
      {
        id: "31432ewd23",
        image: "/adminPage.svg",
        name: "kuldip sarvaiya",
        presents: 23,
        department: "finance",
        selected: false,
      },
    ],
    inventory: [
      {
        id: "31432ewd23",
        image: "/adminPage.svg",
        name: "kuldip sarvaiya",
        presents: 23,
        department: "inventory",
        selected: false,
      },
      {
        id: "31432ewd23",
        image: "/adminPage.svg",
        name: "kuldip sarvaiya",
        presents: 23,
        department: "inventory",
        selected: false,
      },
    ],
    "fabric manufacturing": [
      {
        id: "31432ewd23",
        image: "/adminPage.svg",
        name: "kuldip sarvaiya",
        presents: 23,
        department: "fabric manufacturing",
        selected: false,
      },
      {
        id: "31432ewd23",
        image: "/adminPage.svg",
        name: "kuldip sarvaiya",
        presents: 23,
        department: "fabric manufacturing",
        selected: false,
      },
    ],
    "cleaning and finishing": [
      {
        id: "31432ewd23",
        image: "/adminPage.svg",
        name: "kuldip sarvaiya",
        presents: 23,
        department: "cleaning and finishing",
        selected: false,
      },
      {
        id: "31432ewd23",
        image: "/adminPage.svg",
        name: "kuldip sarvaiya",
        presents: 23,
        department: "cleaning and finishing",
        selected: false,
      },
    ],
    "dying and printing": [
      {
        id: "31432ewd23",
        image: "/adminPage.svg",
        name: "kuldip sarvaiya",
        presents: 23,
        department: "dying and printing",
        selected: false,
      },
      {
        id: "31432ewd23",
        image: "/adminPage.svg",
        name: "kuldip sarvaiya",
        presents: 23,
        department: "dying and printing",
        selected: false,
      },
    ],
    cutting: [
      {
        id: "31432ewd23",
        image: "/adminPage.svg",
        name: "kuldip sarvaiya",
        presents: 23,
        department: "cutting",
        selected: false,
      },
      {
        id: "31432ewd23",
        image: "/adminPage.svg",
        name: "kuldip sarvaiya",
        presents: 23,
        department: "cutting",
        selected: false,
      },
    ],
    sewing: [
      {
        id: "31432ewd23",
        image: "/adminPage.svg",
        name: "kuldip sarvaiya",
        presents: 23,
        department: "sewing",
        selected: false,
      },
      {
        id: "31432ewd23",
        image: "/adminPage.svg",
        name: "kuldip sarvaiya",
        presents: 23,
        department: "sewing",
        selected: false,
      },
    ],
    "packing and labeling": [
      {
        id: "31432ewd23",
        image: "/adminPage.svg",
        name: "kuldip sarvaiya",
        presents: 23,
        department: "packing and labeling",
        selected: false,
      },
      {
        id: "31432ewd23",
        image: "/adminPage.svg",
        name: "kuldip sarvaiya",
        presents: 23,
        department: "packing and labeling",
        selected: false,
      },
    ],
  });

  // employees selected to give salary
  const selectedEmps = Object.values(emp)
    .flat()
    .filter((item) => item.selected === true);

  // for select all employees option
  function selectEmployees(select, dept) {
    if (dept)
      setEmp((prev) => {
        return {
          ...prev,
          [dept]: emp[dept].map((item) => {
            return { ...item, selected: select };
          }),
        };
      });
    else {
      const keys = Object.keys(emp);
      const temp = { ...emp };
      for (const key of keys) {
        temp[key].forEach((item, i) => {
          temp[key][i] = {
            ...item,
            selected: select,
          };
        });
      }
      console.log(temp);
      setEmp(temp);
    }
  }

  return (
    <>
      <div className="relative w-full h-full max-h-full max-w-full">
        <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
          {/* title */}
          <p className="uppercase text-2xl flex justify-between flex-row max-md:text-lg tracking-wider font-bold mb-5">
            <span className="tracking-widest">SALARY PAYROLL</span>

            <Button
              href={"/managers/finance/salary_metadata"}
              as={Link}
              color="secondary"
              variant="shadow"
              size="md"
              className="uppercase tracking-widest"
              startContent={<MdUpdate className="scale-150" />}
            >
              Change salary metadata
            </Button>
          </p>
          <Divider className="my-5" />

          {/* select all and next button */}
          <div className="flex flex-row justify-between gap-10 mr-2">
            <span>
              <Checkbox
                color="secondary"
                size="lg"
                onChange={(e) => {
                  selectEmployees(e.target.checked);
                }}
              >
                SELECT ALL
              </Checkbox>
            </span>
            <Button
              variant="shadow"
              size="md"
              color="secondary"
              endContent={<GrLinkNext />}
              className="tracking-widest"
              isDisabled={selectedEmps.length === 0}
              onPress={onOpen}
            >
              N E X T
            </Button>
          </div>

          <br />

          {/* select emp department wise */}
          <Accordion
            className="grid  grid-cols-1 row-auto gap-5"
            variant="splitted"
          >
            {[
              "hr",
              "finance",
              "inventory",
              "fabric manufacturing",
              "cleaning and finishing",
              "dying and printing",
              "cutting",
              "sewing",
              "packing and labeling",
            ].map((dept) => {
              return (
                <AccordionItem
                  title={
                    <div className="text-lg font-bold tracking-wide w-full uppercase flex justify-between">
                      {dept}
                      <Checkbox
                        color="secondary"
                        size="lg"
                        className="text-base font-normal"
                        onChange={(e) => {
                          selectEmployees(e.target.checked, dept);
                        }}
                      >
                        SELECT ALL
                      </Checkbox>
                    </div>
                  }
                  key={dept}
                  aria-label={dept}
                >
                  <Divider className="my-5" />
                  {/* person select chips */}
                  <div className="flex flex-wrap flex-row justify-items-stretch gap-3 max-md:justify-center uppercase">
                    {emp?.[dept]?.map((item, i) => {
                      return (
                        <Chip
                          key={item.name + i}
                          avatar={<Avatar size="lg" src={item?.image} />}
                          size="lg"
                          variant={item.selected ? "solid" : "flat"}
                          color="secondary"
                          className="flex flex-row flex-nowrap cursor-pointer "
                          title="click to select and disselecct"
                          onClick={() => {
                            // toggle employee selection
                            setEmp((prev) => {
                              const depEmp = emp[dept].splice(i, 1, {
                                ...item,
                                selected: !prev[dept][i].selected,
                              });
                              console.log(i, depEmp);
                              return {
                                ...prev,
                                [dept]: [...emp[dept]],
                              };
                            });
                          }}
                        >
                          {item.name} | {item.presents}
                        </Chip>
                      );
                    })}
                  </div>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>

      {/* final confirmation modal */}
      <Modal isOpen={isOpen} placement="bottom" onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>CONFIRM EMPLOYEES</ModalHeader>
          <ModalBody>
            <div className="flex flex-wrap gap-2 text-foreground-700 max-h-[485px] max-md::max-h-[550px] overflow-x-auto">
              {selectedEmps.map((emp, i) => {
                return (
                  <Chip
                    key={emp.id + i}
                    variant="dot"
                    color="secondary"
                    size="sm"
                  >
                    {emp.name}
                  </Chip>
                );
              })}
            </div>
          </ModalBody>
          <ModalFooter>
            <form action={payroll}>
              <select
                name="selected_employees"
                multiple
                required
                aria-label="selected employees"
                aria-labelledby="selected employees"
                className="w-96"
                hidden
              >
                {selectedEmps.map((item, i) => {
                  return (
                    <option selected key={item.id + i} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              <Button
                type="submit"
                variant="shadow"
                size="md"
                color="secondary"
                startContent={<FcMoneyTransfer />}
                endContent={<PiArrowBendDoubleUpRightFill />}
                className="tracking-widest"
                isDisabled={selectedEmps.length === 0}
              >
                SEND SALARY
              </Button>
            </form>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
