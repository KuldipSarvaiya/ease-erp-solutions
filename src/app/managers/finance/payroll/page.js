"use client";

import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Checkbox,
  Chip,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Snippet,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdUpdate } from "react-icons/md";
import { FcMoneyTransfer } from "react-icons/fc";
import { PiArrowBendDoubleUpRightFill } from "react-icons/pi";
import { GrLinkNext } from "react-icons/gr";
import Loading from "@/components/Loading";

export default function PayrollPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [salMon, setSalMon] = useState();
  const [empData, setEmpData] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (empData.length === 0) {
      (async () => {
        const res = await fetch("/api/finance/payroll", { method: "GET" });
        const data = await res.json();
        // console.log("\n\n*********** Employees Payroll DATA  =   ", data);
        setEmpData(data);
      })();
    }
  });

  // procced payroll work ahead for payment
  async function payrollConfirmed() {
    if (getSelectedEmployees().length <= 0 || !salMon)
      return alert("!! No Employees Has Selected For Payroll");

    const selectedEmployees = getSelectedEmployees();
    makeAllEmployeesSelected(false);
    try {
      const res = await fetch("/api/finance/payroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employees: selectedEmployees,
          month: salMon,
        }),
      });
      if (res.ok)
        setSuccess("Salary Employees Has Been Distributed Successfully");
      else throw new Error(res);
    } catch (error) {
      // console.log(error);
      setSuccess("Failed To Distribute Employees Salary");
    }
    setTimeout(() => setSuccess(false), [5000]);
  }

  const makeEmployeeSelected = (departmentId, employeeId, data) => {
    return data.map((department) => {
      if (department._id === departmentId) {
        return {
          ...department,
          employees: department.employees.map((employee) => {
            if (employee._id === employeeId) {
              return {
                ...employee,
                selected: !employee.selected,
              };
            }
            return employee;
          }),
        };
      }
      return department;
    });
  };
  const selectEmployeesInDepartment = (departmentId, data, selected) => {
    return data.map((department) => {
      if (department._id === departmentId) {
        return {
          ...department,
          employees: department.employees.map((employee) => ({
            ...employee,
            selected: selected,
          })),
        };
      }
      return department;
    });
  };
  const makeAllEmployeesSelected = (selected) => {
    setEmpData((data) =>
      data.map((department) => ({
        ...department,
        employees: department.employees.map((employee) => ({
          ...employee,
          selected: selected,
        })),
      }))
    );
  };
  const getSelectedEmployees = () => {
    const selectedEmployees = [];
    const data = empData;
    data?.forEach((department) => {
      department?.employees?.forEach((employee) => {
        if (employee.selected) {
          const ot_hours =
            employee?.attendance?.reduce((acc, curr) => {
              return acc + (curr.overtime_hours || 0);
            }, 0) || 0;
          const points =
            employee?.attendance?.reduce((acc, curr) => {
              return acc + (curr.point || 0);
            }, 0) || 0;
          selectedEmployees.push({
            ...employee,
            total_ot_hours: ot_hours,
            total_points: points,
          });
        }
      });
    });

    return selectedEmployees;
  };

  return (
    <>
      <div className="relative w-full h-full max-h-full max-w-full">
        <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
          {/* title */}
          <p className="uppercase text-2xl flex justify-between flex-row max-md:text-lg tracking-wider font-bold mb-5">
            <span className="tracking-widest">SALARY PAYROLL</span>
            {success !== false && (
              <Snippet
                color={success.includes("Successfully") ? "success" : "danger"}
                hideCopyButton
                hideSymbol
              >
                {success}
              </Snippet>
            )}
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
            <span className="flex flex-row gap-5 justify-center">
              <Input
                type="month"
                value={salMon}
                onChange={(e) => setSalMon(e.target.value)}
                variant="faded"
                color="secondary"
                size="sm"
                className="max-w-fit"
                aria-label="month of salary"
                title="Select Month Of SALARY"
              />
              <Checkbox
                title="Select All Employees for SALARY Payroll"
                color="secondary"
                size="lg"
                aria-label="select all employees for payroll"
                onChange={(e) => {
                  makeAllEmployeesSelected(e.target.checked);
                }}
              >
                SELECT ALL EMPLOYEES
              </Checkbox>
            </span>
            <Button
              variant="shadow"
              size="md"
              color="secondary"
              endContent={<GrLinkNext />}
              className="tracking-widest"
              isDisabled={getSelectedEmployees().length === 0 || !!!salMon}
              onPress={onOpen}
              title="Confirm and Procced Payroll"
            >
              N E X T
            </Button>
          </div>

          <br />
          {/* loading indicator */}
          {empData.length === 0 && (
            <div className="flex flex-row gap-5 justify-center items-center p-20">
              <span className="animate-spinner-linear-spin duration-75">
                <Loading inline={true} />
              </span>
              Loading Employee Details
            </div>
          )}

          {/* select emp department wise */}
          <Accordion
            className="grid  grid-cols-1 row-auto gap-5"
            variant="splitted"
          >
            {empData?.map((dept, deptIndex) => (
              <AccordionItem
                title={
                  <div className="text-lg font-bold tracking-wide w-full uppercase flex justify-between">
                    {dept?.dept_name.replaceAll("-", " ")}
                    <Checkbox
                      color="secondary"
                      size="lg"
                      className="text-base font-normal"
                      onChange={(e) => {
                        setEmpData((prev) =>
                          selectEmployeesInDepartment(
                            dept._id,
                            prev,
                            e.target.checked
                          )
                        );
                      }}
                    >
                      SELECT ALL
                    </Checkbox>
                  </div>
                }
                key={dept?._id}
                aria-label={dept?.dept_name}
              >
                <Divider className="my-5" />
                {/* employee select chips */}
                <div className="flex flex-wrap flex-row justify-items-stretch gap-3 max-md:justify-center uppercase">
                  {dept?.employees?.map((item, empIndex) => {
                    const ot_hours =
                      item?.attendance?.reduce((acc, curr) => {
                        return acc + (curr.overtime_hours || 0);
                      }, 0) || 0;
                    const points =
                      item?.attendance?.reduce((acc, curr) => {
                        return acc + (curr.point || 0);
                      }, 0) || 0;

                    return (
                      <Chip
                        key={item?._id}
                        avatar={
                          <Avatar
                            size="lg"
                            isBordered={item?.designation === "Manager"}
                            src={"/kuldip_upload/" + item?.image}
                            color="secondary"
                          />
                        }
                        size="lg"
                        variant={item?.selected ? "solid" : "flat"}
                        color="secondary"
                        className="flex flex-row flex-nowrap cursor-pointer p-2"
                        title="click on, to select and remove"
                        onClick={() => {
                          setEmpData((prev) =>
                            makeEmployeeSelected(dept._id, item._id, prev)
                          );
                        }}
                      >
                        {item?.first_name} {item?.middle_name} | {points} -{" "}
                        {ot_hours}
                        <small className="font-normal text-xs lowercase">
                          h
                        </small>
                      </Chip>
                    );
                  })}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* final confirmation modal */}
      <Modal isOpen={isOpen} placement="bottom" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>CONFIRM EMPLOYEES</ModalHeader>
              <ModalBody>
                <div className="flex flex-wrap gap-2 text-foreground-700 max-h-[485px] max-md::max-h-[550px] overflow-x-auto">
                  {getSelectedEmployees()?.map((emp, i) => {
                    return (
                      <Chip
                        key={emp._id + i}
                        variant="dot"
                        color="secondary"
                        size="sm"
                      >
                        {emp.first_name} {emp.middle_name}
                      </Chip>
                    );
                  })}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  variant="shadow"
                  size="md"
                  color="secondary"
                  startContent={<FcMoneyTransfer />}
                  endContent={<PiArrowBendDoubleUpRightFill />}
                  className="tracking-widest"
                  isDisabled={getSelectedEmployees().length === 0}
                  onPress={() => {
                    onClose();
                    payrollConfirmed();
                  }}
                >
                  CONFIRM PAYROLL OPERATION
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
