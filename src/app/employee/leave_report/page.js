"use client";

import {
  Button,
  ButtonGroup,
  Divider,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { RiMailSendLine } from "react-icons/ri";
import { GrAdd } from "react-icons/gr";
import { FaMinus } from "react-icons/fa";
import PastLeaveCard from "@/components/cards/PastLeaveCard";
import { useSession } from "next-auth/react";
import { applyLeave } from "./action";
import { redirect } from "next/navigation";

export default function LeavePage() {
  const [leaveDays, setLeaveDays] = useState(1);
  const [myLeaves, setMyLeave] = useState([]);
  // const [validDate, setValidDate] = useState(false);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/employee/leave_report");
    },
  });

  useEffect(() => {
    if (session?.user?._id)
      (async () => {
        const res = await fetch("/api/leave_report?_id=" + session?.user?._id, {
          method: "GET",
          next: { tags: ["my-leave-report"] },
        });

        if (res.ok) {
          const leaves = await res.json();
          console.log(leaves);
          setMyLeave(leaves);
        }
      })();
  }, [session]);

  async function handleLeaveReport(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);

    const res = await applyLeave(formdata);

    if (res) {
      alert("Leave Report Applied Successfully.");
      e.target.reset();
    }
  }

  const today =
    new Date().getFullYear() +
    "-" +
    (new Date().getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    (new Date().getUTCDate() + 1).toString().padStart(2, "0");

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* leave report form */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-3 flex-col">
        <p className="text-2xl font-bold tracking-wide">APPLY FOR LEAVE</p>
        <Divider className="my-5" />
        <form onSubmit={handleLeaveReport}>
          <span className="uppercase text-base max-sm:text-sm tracking-wider font-normal">
            take Leave For &nbsp;&nbsp;
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
          <input name="total_leave_days" value={leaveDays} readOnly hidden />
          <input name="emp" value={session?.user?._id} hidden readOnly />
          <div className="flex flex-col flex-nowrap gap-5 mt-3 md:flex-nowrap">
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 row-auto gap-4">
              <span className="text-xl font-semibold row-span-2">
                Select Leave Dates :
              </span>
              {Array.from({ length: leaveDays }).map((d, i) => (
                <Input
                  key={`${i}key${i * 1 * i}`}
                  type="date"
                  name="dates_of_leave"
                  variant="faded"
                  size="md"
                  color="secondary"
                  isRequired
                  min={today}
                />
              ))}
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
              <span className="text-xl font-semibold">Reason : </span>
              <Textarea
                cols={5}
                rows={3}
                radius="sm"
                size="lg"
                variant="faded"
                color="secondary"
                name={"reason"}
                className="md:col-start-2 md:col-end-4"
                isRequired={true}
              />
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
        <div className="text-2xl font-bold tracking-wide flex justify-between flex-wrap">
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
        </div>
        <Divider className="my-3" />
        <div className="mt-2 flex gap-3 flex-row flex-wrap justify-start items-stretch">
          {myLeaves?.map((leave) => {
            return (
              <PastLeaveCard
                key={leave._id}
                total_leave_days={leave.total_leave_days}
                leave_state={leave.leave_state}
                reason={leave.reason}
                dates_of_leave={leave.dates_of_leave}
              />
            );
          })}
          {myLeaves.length === 0 && <h1>Hurray 🥳, No Leave Report Applied</h1>}
        </div>
      </div>
    </div>
  );
}
