"use client";

import React, { useState } from "react";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { GrPowerReset, GrTask } from "react-icons/gr";
import { Button } from "@nextui-org/react";

function SubmitBtn() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  function load() {
    setLoading(true);
    setTimeout(() => {
      setMsg("Operation Successfully Carried Out 👍");
      setTimeout(() => {
        setMsg("");
      }, [5000]);
      setLoading(false);
    }, 2000);
  }
  return (
    <span className="flex gap-3 flex-row flex-wrap justify-start items-end">
      <Button
        type="submit"
        variant="shadow"
        name="notice"
        size="md"
        color="secondary"
        className="max-w-max"
        endContent={<MdOutlineNotificationsActive className="scale-125" />}
        isLoading={loading}
      >
        SEND NOTICE
      </Button>
      <Button
        type="submit"
        name="task"
        variant="shadow"
        size="md"
        color="secondary"
        className="max-w-max"
        endContent={<GrTask />}
        isLoading={loading}
      >
        ASSIGN TASK
      </Button>
      <Button
        type="reset"
        variant="shadow"
        size="md"
        color="secondary"
        className="max-w-max"
        endContent={<GrPowerReset />}
        isLoading={loading}
      >
        RESET
      </Button>
      <span className="text-green-500 font-semibold uppercase">{msg}</span>
    </span>
  );
}

export default SubmitBtn;
