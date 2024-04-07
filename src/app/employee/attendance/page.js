"use client";

import { Divider, Input } from "@nextui-org/react";
import { HoliDay, OnLeave, Present } from "./PresentPages";
import { PunchIn, PunchOut } from "./PunchInOut";
import { useCallback, useEffect, useState } from "react";
import AttendanceCard from "@/components/cards/AttendanceCard";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AttendancePage() {
  const [attendance, setAttendance] = useState({});
  const [oldAttendance, setOldAttendance] = useState([]);
  const [date, setDate] = useState("2024-01-10");

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/employee/attendance");
    },
  });

  const fetchTodayAttendance = useCallback(() => {
    if (session?.user?._id)
      fetch(`/api/employee/attendance?_id=${session?.user?._id}&job=myToday`, {
        method: "GET",
        next: { tags: ["myTodayAttendance"] },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setAttendance(data);
        })
        .catch((err) => console.log(err));
  }, [session]);
  useEffect(() => {
    if (session?.user?._id) fetchTodayAttendance();
  }, [session]);

  useEffect(() => {
    if (oldAttendance.length === 0 && session?.user?._id)
      (async () => {
        fetch(`/api/employee/attendance?_id=${session?.user?._id}&job=myOld`, {
          method: "GET",
          next: { tags: ["myOldAttendance"] },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("old attendance = ", data);
            setOldAttendance(data);
          })
          .catch((err) => console.log(err));
      })();
  }, [session]);

  function handleDateChange(event) {
    setDate(event.target.value);
    console.log(event.target.value);
  }

  function Banner() {
    switch (attendance?.state) {
      case "holiday":
        return <HoliDay />;
      case "onleave":
        return <OnLeave />;
      case "present":
        return <Present data={attendance} />;
      case "pending":
        return <PunchOut data={attendance} />;
      default:
        return <PunchIn id={session?.user?._id} />;
    }
  }

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* today */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        <p className="uppercase text-2xl max-md:text-lg tracking-wider font-bold">
          today&apos;s attendance status
        </p>
        <Divider className="my-5" />
        <Banner />
      </div>

      {/* old attendance */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500 mt-8">
        <div className="uppercase text-2xl max-md:text-lg tracking-wider font-bold flex flex-wrap flex-row justify-between items-center">
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
        </div>
        <Divider className="my-3" />
        <div className="mt-2 flex gap-3 flex-row flex-wrap justify-start items-stretch">
          {oldAttendance?.map((item) => (
            <AttendanceCard
              date={item.date}
              point={item.point}
              from={item.punch_in}
              to={item.punch_out}
              holiday={item.state === "holiday"}
              leave={item.state === "onleave"}
              ot={item.overtime_hours}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
