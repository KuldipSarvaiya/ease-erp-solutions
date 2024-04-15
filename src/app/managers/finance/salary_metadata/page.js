"use client";

import InputCon from "@/components/InputCon";
import { Button, Divider, Snippet } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPercent, FaRupeeSign } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(
        "/api/auth/signin?callbackUrl=/managers/finance/salary_metadata"
      );
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/finance/salary_metadata", {
        method: "GET",
        next: { tags: "SalaryMetadata" },
      });
      if (res.ok) {
        const json = await res.json();
        reset(json);
      }
    })();
  });

  async function handleChangeMetaData(formdata) {
    setIsLoading(true);
    const data = {
      salary_da: formdata.salary_da,
      salary_hra: formdata.salary_hra,
      salary_bonus: formdata.salary_bonus,
      salary_pf: formdata.salary_pf,
      salary_professionl_tax: formdata.salary_professionl_tax,
      travel_expense: formdata.travel_expense,
      updated_by: session?.user?._id,
    };

    const res = await fetch("/api/finance/salary_metadata", {
      method: "PUT",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setSuccess("Salary Metadata Has Been Updated Successfully");
    } else setSuccess("Salary Metadata Is Unable To Updated Right Now.");
    setTimeout(() => setSuccess(false), [5000]);
    setIsLoading(false);
  }

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* create new income */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        <p className="uppercase text-2xl max-md:text-lg tracking-wider font-bold mb-5">
          manage salary metadata
        </p>
        <Divider className="my-5" />

        <form onSubmit={handleSubmit(handleChangeMetaData)}>
          <div className="flex flex-col flex-nowrap gap-5 md:flex-nowrap">
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">
                Dearness Allowance :{" "}
              </span>
              <InputCon
                controller={{
                  name: "salary_da",
                  control: control,
                  rules: {
                    valueAsNumber: true,
                    required: "  dearness allowence is required",
                    min: {
                      value: 0,
                      message: "Please Enter valid amount",
                    },
                    max: {
                      value: 100,
                      message: "Please Enter valid amount",
                    },
                  },
                }}
                input={{
                  type: "number",
                  name: "salary_da",
                  size: "lg",
                  isRequired: true,
                  disabled: isLoading,
                  className: "md:col-start-2 md:col-end-4",
                  startContent: <FaPercent className="mr-5" />,
                  endContent: <i>&nbsp;:&nbsp;Of&nbsp;Basic&nbsp;Salary</i>,
                }}
              />
              <p className="text-red-500"> {errors?.salary_da?.message} </p>
            </span>

            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">
                Housing Rent Allowance :{" "}
              </span>
              <InputCon
                controller={{
                  name: "salary_hra",
                  control: control,
                  rules: {
                    valueAsNumber: true,
                    required: "  housing rent allowence is required",
                    min: {
                      value: 0,
                      message: "Please Enter valid amount",
                    },
                    max: {
                      value: 100,
                      message: "Please Enter valid amount",
                    },
                  },
                }}
                input={{
                  type: "number",
                  name: "salary_hra",
                  size: "lg",
                  isRequired: true,
                  disabled: isLoading,
                  className: "md:col-start-2 md:col-end-4",
                  startContent: <FaPercent className="mr-5" />,
                  endContent: <i>&nbsp;:&nbsp;Of&nbsp;Basic&nbsp;Salary</i>,
                }}
              />
              <p className="text-red-500"> {errors?.salary_hra?.message} </p>
            </span>

            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Bonus : </span>
              <InputCon
                controller={{
                  name: "salary_bonus",
                  control: control,
                  rules: {
                    valueAsNumber: true,
                    required: "  bonus is required",
                    min: {
                      value: 0,
                      message: "Please Enter valid amount",
                    },
                    max: {
                      value: 100,
                      message: "Please Enter valid amount",
                    },
                  },
                }}
                input={{
                  type: "number",
                  name: "salary_bonus",
                  size: "lg",
                  isRequired: true,
                  disabled: isLoading,
                  className: "md:col-start-2 md:col-end-4",
                  startContent: <FaPercent className="mr-5" />,
                  endContent: <i>&nbsp;:&nbsp;Of&nbsp;Basic&nbsp;Salary</i>,
                }}
              />
              <p className="text-red-500"> {errors?.salary_bonus?.message} </p>
            </span>

            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Provident Fund : </span>
              <InputCon
                controller={{
                  name: "salary_pf",
                  control: control,
                  rules: {
                    valueAsNumber: true,
                    required: "provident fund is required",
                    min: {
                      value: 0,
                      message: "Please Enter valid amount",
                    },
                    max: {
                      value: 100,
                      message: "Please Enter valid amount",
                    },
                  },
                }}
                input={{
                  type: "number",
                  name: "salary_pf",
                  size: "lg",
                  isRequired: true,
                  disabled: isLoading,
                  className: "md:col-start-2 md:col-end-4",
                  startContent: <FaPercent className="mr-5" />,
                  endContent: <i>&nbsp;:&nbsp;Of&nbsp;Basic&nbsp;Salary</i>,
                }}
              />
              <p className="text-red-500"> {errors?.salary_pf?.message} </p>
            </span>

            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Profesional TAX : </span>
              <InputCon
                controller={{
                  name: "salary_professionl_tax",
                  control: control,
                  rules: {
                    valueAsNumber: true,
                    required: "professional TAX is required",
                    min: {
                      value: 0,
                      message: "Please Enter valid amount",
                    },
                  },
                }}
                input={{
                  type: "number",
                  name: "salary_professionl_tax",
                  size: "lg",
                  isRequired: true,
                  disabled: isLoading,
                  className: "md:col-start-2 md:col-end-4",
                  startContent: <FaRupeeSign />,
                }}
              />
              <p className="text-red-500">
                {errors?.salary_professionl_tax?.message}
              </p>
            </span>

            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Travel Expense : </span>
              <InputCon
                controller={{
                  name: "travel_expense",
                  control: control,
                  rules: {
                    valueAsNumber: true,
                    required: "Travel expense amount is required",
                    min: {
                      value: 0,
                      message: "Please Enter valid amount",
                    },
                  },
                }}
                input={{
                  type: "number",
                  name: "travel_expense",
                  size: "lg",
                  isRequired: true,
                  disabled: isLoading,
                  className: "md:col-start-2 md:col-end-4",
                  startContent: <FaRupeeSign />,
                }}
              />
              <p className="text-red-500">{errors?.travel_expense?.message}</p>
            </span>

            <span className="flex flex-row gap-5 ">
              <Button
                size="md"
                color="secondary"
                variant="shadow"
                type="submit"
                endContent={<GrUpdate />}
                isLoading={isLoading}
                aria-label="submit"
              >
                UPDATE METADATA
              </Button>
              {success !== false && (
                <Snippet
                  color={
                    success.includes("Successfully") ? "success" : "danger"
                  }
                  hideCopyButton
                  hideSymbol
                >
                  {success}
                </Snippet>
              )}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
