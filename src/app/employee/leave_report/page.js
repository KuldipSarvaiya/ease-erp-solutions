"use client";

import {
  Button,
  ButtonGroup,
  Divider,
  Input,
  Textarea,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { RiMailSendLine } from "react-icons/ri";
import { GrAdd } from "react-icons/gr";
import { FaMinus } from "react-icons/fa";
import PastLeaveCard from "@/components/cards/PastLeaveCard";
import InputCon from "@/components/InputCon";

export default function LeavePage() {
  const {
    // register,
    // setError,
    handleSubmit,
    // reset,
    control,
    formState: { errors },
  } = useForm();
  const [leaveDays, setLeaveDays] = useState(1);

  useEffect(() => {}, []);

  function DatePicker() {
    return Array.from({ length: leaveDays }).map((d, i) => (
      <InputCon
        key={`${i}key${i * 1 * i}`}
        controller={{
          name: `date${i + 1}`,
          control: control,
          rules: {
            required: "Please Select Leave Date",
          },
        }}
        input={{
          type: "date",
          name: `date${i + 1}`,
          isRequired: true,
          className: "w-52",
        }}
      />
    ));
  }

  async function handleChange(formdata) {
    console.log(formdata);
  }
  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-3 flex-col">
        <p className="text-2xl font-bold tracking-wide">APPLY FOR LEAVE</p>
        <form onSubmit={handleSubmit(handleChange)}>
          <span className="uppercase text-base max-sm:text-sm tracking-wider font-normal">
            Leave For &nbsp;&nbsp;
            <ButtonGroup size="sm">
              <Button
                isDisabled={leaveDays === 1}
                onClick={() => setLeaveDays((prev) => prev - 1)}
              >
                <FaMinus />
              </Button>
              <Button>{leaveDays}</Button>
              <Button onClick={() => setLeaveDays((prev) => prev + 1)}>
                <GrAdd />
              </Button>
            </ButtonGroup>
            &nbsp;&nbsp;Days.
          </span>
          <div className="flex flex-col flex-nowrap gap-5 mt-3 md:flex-nowrap">
            <span className=" flex gap-2 flex-wrap">
              <span className="text-xl font-semibold">
                Select Leave Dates :
              </span>
              <DatePicker />
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Reason : </span>

              <Controller
                name={"reason"}
                control={control}
                rules={{
                  required: "Please provide your reason.",
                  pattern: {
                    value: /[a-z0-9,-]*/i,
                  },
                }}
                render={({ field }) => (
                  <>
                    <Textarea
                      cols={16}
                      rows={10}
                      radius="sm"
                      size="sm"
                      variant="faded"
                      color="secondary"
                      name={"reason"}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      className="md:col-start-2 md:col-end-4"
                      isRequired={true}
                    />
                  </>
                )}
              />
              <p className="text-red-500"> {errors?.reason?.message} </p>
            </span>
            <span className="flex w-full">
              <Button
                type="submit"
                variant="solid"
                size="lg"
                color="secondary"
                startContent={<RiMailSendLine />}
              >
                APPLY
              </Button>
            </span>
          </div>
        </form>
      </div>

      {/* past leave reports */}
      <div className="border-4 rounded-3xl mx-10 my-8 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-3 flex-col">
        <p className="text-2xl font-bold tracking-wide flex justify-between flex-wrap">
          PREVIOUS LEAVE REPORTS
          <Input
            // onChange={handleDateChange}
            variant="faded"
            radius="md"
            color="secondary"
            type="date"
            size="sm"
            // value={new Date()}
            className="w-52"
          />
        </p>
        <Divider className="my-3" />
        <div className="mt-2 flex gap-2 flex-row flex-wrap justify-between items-stretch">
          <PastLeaveCard
            total_leave_days={1}
            leave_state="pending"
            reason="thi is random reason to get sick leave for marriage function which is lie at all text"
            dates_of_leave={[new Date()]}
          />
          <PastLeaveCard
            total_leave_days={2}
            leave_state="accepted"
            reason="thi is random reason to get sick leave for marriage function which is lie at all text"
            dates_of_leave={[new Date(), new Date()]}
          />
          <PastLeaveCard
            total_leave_days={4}
            leave_state="rejected"
            reason="thi is random reason to get sick leave for marriage function which is lie at all text"
            dates_of_leave={[new Date(), new Date(), new Date(), new Date()]}
          />
          <PastLeaveCard
            total_leave_days={2}
            leave_state="accepted"
            reason="thi is random reason to get sick leave for marriage function which is lie at all text"
            dates_of_leave={[new Date(), new Date()]}
          />
        </div>
      </div>
    </div>
  );
}
