"use client";

import { announceEvent, declareHoliday } from "@/lib/utils/server_actions/hr";
import {
  Button,
  ButtonGroup,
  Divider,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";
import { FaMinus } from "react-icons/fa";
import { GrAdd, GrAnnounce } from "react-icons/gr";

export default function Page() {
  const [days, setDays] = useState(1);

  async function handelDeclareHoliday(formdata) {
    const res = await declareHoliday(formdata);

    alert(res);
    document.querySelector("#holiday_form").reset();
  }

  function DatePicker() {
    return Array.from({ length: days }).map((d, i) => (
      <Input
        variant="faded"
        color="secondary"
        type="date"
        name={`date${i + 1}`}
        isRequired
        className="w-52"
      />
    ));
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
                <Input
                  variant="faded"
                  type="date"
                  color="secondary"
                  name="date"
                  size="md"
                  // label="Holiday Date"
                  // labelPlacement="outside-left"
                  isRequired
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
        <form
          id="event_form"
          action={async (fd) => {
            await announceEvent(fd);
            document.querySelector("#event_form").reset();
          }}
        >
          <div className="flex flex-col flex-nowrap gap-5 md:flex-nowrap">
            <span className="uppercase text-base max-sm:text-sm tracking-wider font-normal">
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
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 row-auto gap-4">
              <span className="text-xl font-semibold row-span-2">
                Select Event Dates :
              </span>
              <DatePicker />
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 gap-3">
              <span className="text-xl font-semibold">Time Stamp : </span>
              <Input
                variant="faded"
                color="secondary"
                type="time"
                name="start_time"
                label="Event Start Time"
                labelPlacement="outside"
                isRequired
                className="md:col-start-2 md:col-end-3"
              />
              <Input
                variant="faded"
                color="secondary"
                type="time"
                name="end_time"
                label="Event End Time"
                labelPlacement="outside"
                isRequired
                className="md:col-start-3 md:col-end-4"
              />
              {/* <p className="text-red-500"> {errors?.date?.message} </p> */}
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Subject : </span>
              <Input
                variant="faded"
                color="secondary"
                type="text"
                name="subject"
                isRequired
                className="md:col-start-2 md:col-end-4"
              />
              {/* <p className="text-red-500"> {errors?.date?.message} </p> */}
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Title : </span>
              <Input
                variant="faded"
                color="secondary"
                type="text"
                name="title"
                isRequired
                className="md:col-start-2 md:col-end-4"
              />
              {/* <p className="text-red-500"> {errors?.date?.message} </p> */}
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Details : </span>
              <Textarea
                variant="faded"
                color="secondary"
                name="details"
                isRequired
                className="md:col-start-2 md:col-end-4"
              />
              {/* <p className="text-red-500"> {errors?.date?.message} </p> */}
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">
                Formalities To Follow :{" "}
              </span>
              <Input
                variant="faded"
                color="secondary"
                type="text"
                name="formalities"
                isRequired
                className="md:col-start-2 md:col-end-4"
              />
              <p className="text-orange-500"> Put (*) Sign For New Line </p>
            </span>
            <span className="flex w-full">
              <Button
                type="submit"
                variant="solid"
                size="lg"
                color="secondary"
                endContent={<GrAnnounce />}
              >
                ANNOUNCE
              </Button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
