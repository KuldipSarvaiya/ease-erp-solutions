"use client";

import { announceEvent, declareHoliday } from "@/lib/utils/server_actions/hr";
import {
  Button,
  ButtonGroup,
  Divider,
  Input,
  Snippet,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";
import { FaMinus } from "react-icons/fa";
import { GrAdd, GrAnnounce } from "react-icons/gr";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Page() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/managers/hr/attendance");
    },
  });
  // const [days, setDays] = useState(1);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handelDeclareHoliday(formdata) {
    const res = await declareHoliday(formdata);

    alert(res);
    document.querySelector("#holiday_form").reset();
  }

  const today =
    new Date().getFullYear() +
    "-" +
    (new Date().getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    (new Date().getUTCDate() + 1).toString().padStart(2, "0");

  function handleEventSubmit(data) {
    console.log(data);
    setLoading(true);
    data.formalities = data.formalities.replaceAll("\n", " ").split(";");
    fetch("/api/sendmail", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        setSuccess("Event Email Has Been Sent To Employees Successfully");
        reset();
        setTimeout(() => setSuccess(false), [5000]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setSuccess("Failed To Send Event Email To Employees");
        setTimeout(() => setSuccess(false), [5000]);
        setLoading(false);
      });
  }

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* holiday */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        <p className="uppercase text-2xl max-md:text-lg tracking-wider font-bold mb-5">
          declare holiday
        </p>
        <Divider className="my-5" />
        <form id="holiday_form" action={handelDeclareHoliday}>
          <div className="flex flex-col flex-nowrap gap-5 md:flex-nowrap">
            <span className="flex flex-nowrap gap-5 flex-col">
              <p>Date : </p>
              <div>
                <input
                  type="text"
                  readOnly
                  value={session?.user?._id.toString()}
                  name="updated_by"
                  hidden
                />
                <Input
                  variant="faded"
                  type="date"
                  color="secondary"
                  name="date"
                  size="md"
                  aria-label="Holiday Date"
                  isRequired
                  min={today}
                  className="max-w-96"
                />
              </div>
              <span>
                <Button
                  className=" uppercase inline"
                  type="submit"
                  variant="shadow"
                  color="secondary"
                >
                  Declare as holiday
                </Button>
              </span>
            </span>
          </div>
        </form>
      </div>

      {/* event */}
      <div className="border-4 rounded-3xl mx-10 my-4 mt-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        <p className="uppercase text-2xl max-md:text-lg tracking-wider font-bold mb-5">
          Organize event
        </p>
        <Divider className="my-5" />
        <form id="event_form" onSubmit={handleSubmit(handleEventSubmit)}>
          <div className="flex flex-col flex-nowrap gap-5 md:flex-nowrap">
            {/* <span className="uppercase text-base max-sm:text-sm tracking-wider font-normal">
              event will held For &nbsp;&nbsp;
              <ButtonGroup size="sm" variant="faded" color="secondary">
                <Button
                  isDisabled={days === 1}
                  onClick={() => setDays((prev) => prev - 1)}
                >
                  <FaMinus />
                </Button>
                <Button className="cursor-default">{days}</Button>
                <Button onClick={() => setDays((prev) => prev + 1)}>
                  <GrAdd />
                </Button>
              </ButtonGroup>
              &nbsp;&nbsp;Days.
            </span> */}
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 row-auto gap-4">
              <span className="text-xl font-semibold row-span-2">
                Select Event Date :
              </span>
              <Input
                {...register("date", {
                  required: "Please Select The Date",
                })}
                variant="faded"
                color="secondary"
                type="date"
                min={today}
                isDisabled={loading}
                className="w-52"
              />
              <p className="text-red-500">{errors?.date?.message}</p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 gap-3">
              <span className="text-xl font-semibold">Time Stamp : </span>
              <Input
                {...register("start_time", {
                  required: "Please Select Event Start Time",
                })}
                variant="faded"
                color="secondary"
                isDisabled={loading}
                type="time"
                size="lg"
                // name="start_time"
                label="Event Start Time"
                labelPlacement="outside"
                // isRequired
                className="md:col-start-2 md:col-end-3"
              />
              <Input
                {...register("end_time", {
                  required: "Please Select Event End Time",
                })}
                variant="faded"
                size="lg"
                color="secondary"
                isDisabled={loading}
                type="time"
                // name="end_time"
                label="Event End Time"
                labelPlacement="outside"
                // isRequired
                className="md:col-start-3 md:col-end-4"
              />
              <p>
                <p className="text-red-500">{errors?.start_time?.message}</p>
                <p className="text-red-500">{errors?.end_time?.message}</p>
              </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Event Title : </span>
              <Input
                {...register("title", {
                  required: "Please Enter Event Title",
                })}
                size="lg"
                variant="faded"
                isDisabled={loading}
                color="secondary"
                type="text"
                // name="title"
                // isRequired
                className="md:col-start-2 md:col-end-4"
              />
              <p className="text-red-500">{errors?.title?.message}</p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Subject Of Event : </span>
              <Textarea
                {...register("subject", {
                  required: "Please Enter The Subject of Event Email",
                })}
                size="lg"
                variant="faded"
                color="secondary"
                isDisabled={loading}
                type="text"
                // name="subject"
                // isRequired
                className="md:col-start-2 md:col-end-4"
              />
              <p className="text-red-500">{errors?.subject?.message}</p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Details Of Event : </span>
              <Textarea
                {...register("details", {
                  required: "Please Enter Details of Event",
                })}
                size="lg"
                variant="faded"
                isDisabled={loading}
                color="secondary"
                // name="details"
                // isRequired
                className="md:col-start-2 md:col-end-4"
              />
              <p className="text-red-500">{errors?.details?.message}</p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">
                Formalities To Follow :{" "}
              </span>
              <Textarea
                {...register("formalities", {
                  required: "Please Enter Formalities To Follow in Event",
                })}
                size="lg"
                variant="faded"
                color="secondary"
                isDisabled={loading}
                // name="formalities"
                // isRequired
                className="md:col-start-2 md:col-end-4"
              />
              <p className="text-red-500">
                {errors?.formalities?.message || (
                  <span className="text-orange-500">
                    Put (;)Sign For New Line
                  </span>
                )}
              </p>
            </span>
            <span className="flex gap-5 w-full">
              <Button
                type="submit"
                variant="solid"
                size="lg"
                color="secondary"
                isLoading={loading}
                endContent={<GrAnnounce />}
              >
                ANNOUNCE
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
