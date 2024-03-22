"use client";

import InputCon from "@/components/InputCon";
import { Button, Divider } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GiMoneyStack } from "react-icons/gi";
import { GrUpdate } from "react-icons/gr";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  function handleChangeMetaData(formdata) {
    setIsLoading(true);
    console.log(formdata.salary_da);
    console.log(formdata.salary_hra);
    console.log(formdata.salary_bonus);
    console.log(formdata.salary_pf);
    console.log(formdata.salary_professionl_tax);
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
                    required: "salary dearness allowence is required",
                    min: {
                      value: 0,
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
                  startContent: <GiMoneyStack />,
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
                    required: "salary housing rent allowence is required",
                    min: {
                      value: 0,
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
                  startContent: <GiMoneyStack />,
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
                    required: "salary bonus is required",
                    min: {
                      value: 0,
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
                  startContent: <GiMoneyStack />,
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
                    required: "provident fund is required",
                    min: {
                      value: 0,
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
                  startContent: <GiMoneyStack />,
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
                    required: "salary dearness allowence is required",
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
                  startContent: <GiMoneyStack />,
                }}
              />
              <p className="text-red-500">
                {" "}
                {errors?.salary_professionl_tax?.message}{" "}
              </p>
            </span>

            <span>
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
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
