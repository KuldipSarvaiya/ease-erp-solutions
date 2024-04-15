"use client";

import isWithinRange from "@/lib/utils/isWithinRange";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { GiEntryDoor, GiExitDoor } from "react-icons/gi";

// todo : add dynamic employee's attendance coordinates

export function PunchIn({ id }) {
  const [myCoords, setMyCoords] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!!!myCoords.attendance_coordinates && id) {
      (async () => {
        const res = await fetch("/api/employee/details/" + id, {
          method: "GET",
        });
        if (!res.ok) {
          setError(
            "Sorry, Failed To Get Your Attendance Details\nTry Refreshing This Page"
          );
          return;
        }
        const json = await res.json();
        const dt = {
          attendance_coordinates: json.attendance_coordinates,
          attendance_radius: json.attendance_radius,
        };
        // console.log("my coords = ", dt);
        setMyCoords(dt);
      })();
    }
  }, [id]);

  // if time is ealry or too late
  const h = new Date().getHours();
  if (h > 15 || h < 8)
    return (
      <center className="text-red-500 w-full py-10 font-semibold text-base">
        Please punch in between 8am to 3pm
      </center>
    );

  function handlePunchIn() {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (a) => {
      // console.log("Latitude : " + a.coords.latitude);
      // console.log("Longitute : " + a.coords.longitude);
      try {
        const res = isWithinRange(
          myCoords.attendance_radius,
          // 100,
          // { latitude: 21.7631, longitude: 72.1485 }, //azziptech
          // { latitude: 22.9977, longitude: 72.5759 }, //home
          myCoords.attendance_coordinates,
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

        // console.log("Function responce = ", res);
        !res &&
          setError(
            "******Sorry, Failed To Verify Location. Please Try Again...******"
          );
      } catch (error) {
        // console.warn(error);
        setError("******Sorry, Failed To Punch In. Please Try Again...******");
      }
      setLoading(false);
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
          isLoading={loading || !!!myCoords.attendance_coordinates}
        >
          punch in {!loading && <GiExitDoor />}
        </Button>
        <p className="text-red-500">
          <span className="text-yellow-500">
            Please Turn On Location Service Before Processed Further
          </span>
          <br />
          <br />
          {!!!myCoords.attendance_coordinates &&
            "Getting Your Coordinates Details..."}
          {error}
        </p>
      </center>
    </>
  );
}

export function PunchOut({ data, myCoords }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // console.log("punch out = ", myCoords);

  // punchin time
  const date1 = new Date();
  const date2 = new Date(data.punch_in);
  const diffInMs = Math.abs(date2 - date1);
  const total_hours = Math.floor(diffInMs / (1000 * 60 * 60));
  const total_minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

  function handlePunchOut() {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(async (a) => {
      // console.log("Latitude : " + a.coords.latitude);
      // console.log("Longitute : " + a.coords.longitude);
      try {
        const res = isWithinRange(
          myCoords.attendance_radius,
          // 100,
          // { latitude: 21.7631, longitude: 72.1485 }, //azziptech
          // { latitude: 22.9977, longitude: 72.5759 }, //home
          myCoords.attendance_coordinates,
          a.coords
        );
        // console.log("Function responce = ", res);

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
      } catch (error) {
        // console.warn(error);
        setError(
          "******Sorry, Failed To Verify Location. Please Try Again...******"
        );
      }
      setLoading(false);
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
          <span className="text-yellow-500">
            Please Turn On Location Service Before Processed Further
          </span>{" "}
          <br />
          <br />
          {error}
        </p>
      </center>
    </>
  );
}
