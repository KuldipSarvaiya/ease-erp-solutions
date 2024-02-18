"use client";

import { Input } from "@nextui-org/react";
import { HoliDay, OnLeave, Present } from "./PresentPages";
import { PunchIn, PunchOut } from "./PunchInOut";
import { useState } from "react";
import AttendanceCard from "@/components/cards/AttendanceCard";

export default function AttendancePage() {
  const attendance_status = null;
  const [date, setDate] = useState("2024-01-10");

  function handleDateChange(event) {
    setDate(event.target.value);
    console.log(event.target.value);
  }
  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* today */}
      {(new Date().getHours() <= 20 || new Date().getHours() >= 8) && <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        <p className="uppercase text-2xl max-md:text-lg tracking-wider font-bold">
          today's attendance status
        </p>
        {attendance_status === "holiday" && <HoliDay />}
        {attendance_status === "onleave" && <OnLeave />}
        {attendance_status === "present" && <Present />}
        {attendance_status === "pending" && <PunchOut />}
        {attendance_status === null && <PunchIn />}
      </div>}
      {/* old attendance */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500 mt-8">
        <span className="uppercase text-2xl max-md:text-lg tracking-wider font-bold flex flex-wrap flex-row justify-between items-center">
          <span>previous attendances</span>
          <Input
            onChange={handleDateChange}
            variant="faded"
            radius="md"
            color="secondary"
            type="date"
            size="sm"
            value={date}
            className="w-52"
          />
        </span>
        <div className="mt-2 flex gap-2 flex-row flex-wrap justify-between items-stretch">
          <AttendanceCard
            date={Date.now()}
            point={1}
            from={Date.now()}
            to={Date.now()}
            holiday={false}
            leave={false}
            ot={0}
          />
          <AttendanceCard
            date={Date.now()}
            point={1}
            from={Date.now()}
            to={Date.now()}
            holiday={true}
            leave={false}
            ot={0}
          />
          <AttendanceCard
            date={Date.now()}
            point={1}
            from={Date.now()}
            to={Date.now()}
            holiday={false}
            leave={true}
            ot={0}
          />
          <AttendanceCard
            date={Date.now()}
            point={0.5}
            from={Date.now()}
            to={Date.now()}
            holiday={false}
            leave={false}
            ot={0}
          />
          <AttendanceCard
            date={Date.now()}
            point={1}
            from={Date.now()}
            to={Date.now()}
            holiday={false}
            leave={false}
            ot={0}
          />
          <AttendanceCard
            date={Date.now()}
            point={0.5}
            from={Date.now()}
            to={Date.now()}
            holiday={false}
            leave={false}
            ot={0}
          />
        </div>
      </div>
    </div>
  );
}
