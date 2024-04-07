"use client";

import isWithinRange from "@/lib/utils/isWithinRange";
import { Button } from "@nextui-org/react";
import { startTransition, useState } from "react";
import { GiEntryDoor, GiExitDoor } from "react-icons/gi";

// todo : add dynamic employee's attendance coordinates

export function PunchIn({ id }) {
  // if time is ealry or too late
  const h = new Date().getHours();
  if (h > 15 || h < 8) return;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function handlePunchIn() {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (a) => {
      console.log("Latitude : " + a.coords.latitude);
      console.log("Longitute : " + a.coords.longitude);
      const res = isWithinRange(
        100,
        // { latitude: 21.7631, longitude: 72.1485 }, //azziptech
        { latitude: 23.0302, longitude: 72.5772 }, //home
        a.coords
      );

      if (res) {
        const res = await fetch("/api/employee/attendance", {
          method: "POST",
          body: JSON.stringify({
            _id: id,
            coordinates: {
              latitude: a.coords.latitude,
              longitude: a.coords.longitude,
            },
          }),
        });

        if (res.ok) alert("success attendace");
      }

      console.log("Function responce = ", res);
      startTransition(() => {
        setLoading(false);
        !res &&
          setError(
            "******Sorry, Failed To Verify Location. Please Try Again...******"
          );
      });
    });
  }

  return (
    <>
      <center>
        <p>Its Time To Punch In...</p>
        <Button
          variant="faded"
          color={error ? "danger" : "success"}
          size="lg"
          className="tracking-widest uppercase text-4xl font-extrabold"
          disabled={loading}
          onPress={handlePunchIn}
          isLoading={loading}
        >
          punch in {!loading && <GiExitDoor />}
        </Button>
        <p className="text-red-500">
          Please Turn On Location Service Before Processed Further
          <br />
          <br />
          {error}
        </p>
      </center>
    </>
  );
}

export function PunchOut({ data }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // punchin time
  const date1 = new Date();
  const date2 = new Date(data.punch_in);
  const diffInMs = Math.abs(date2 - date1);
  const total_hours = Math.floor(diffInMs / (1000 * 60 * 60));
  const total_minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

  function handlePunchOut() {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(async (a) => {
      console.log("Latitude : " + a.coords.latitude);
      console.log("Longitute : " + a.coords.longitude);
      const res = isWithinRange(
        100,
        { latitude: 23.0302, longitude: 72.5772 },
        a.coords
      );
      console.log("Function responce = ", res);

      if (res) {
        const point = total_hours >= 8 ? 1 : total_hours >= 4 ? 0.5 : 0;
        const overtime_hours =
          total_hours > 8
            ? total_hours - 8
            : total_hours > 4
            ? total_hours - 4
            : total_hours;

        const response = await fetch("/api/employee/attendance", {
          method: "PUT",
          body: JSON.stringify({
            _id: data._id,
            employee_id: data.employee_id,
            point: point,
            overtime_hours: overtime_hours,
            state: "present",
            coordinates: {
              latitude: a.coords.latitude,
              longitude: a.coords.longitude,
            },
          }),
        });

        if (response.ok) alert("success attendace");
      }

      startTransition(() => {
        setLoading(!res);
        !res &&
          setError(
            "******Sorry, Failed To Verify Location. Please Try Again...******"
          );
      });
    });
  }

  return (
    <>
      <center>
        <p>Punch In Time : {new Date(data.punch_in).toLocaleTimeString()}</p>
        <p>
          Total Time : {total_hours} hours&nbsp;|&nbsp;
          {total_minutes} minutes
        </p>
        {total_hours > 8 && (
          <p>
            Over Time Hours : {total_hours - 8} hours&nbsp;|&nbsp;
            {total_minutes - 60} minutes
          </p>
        )}
        <Button
          variant="faded"
          color={error ? "danger" : "warning"}
          size="lg"
          className="tracking-widest uppercase text-4xl font-extrabold"
          disabled={loading}
          onPress={handlePunchOut}
          isLoading={loading}
        >
          {!loading && <GiEntryDoor />}punch out
        </Button>
        <p className="text-red-500">
          Please Turn On Location Service Before Processed Further
          <br />
          <br />
          {error}
        </p>
      </center>
    </>
  );
}
