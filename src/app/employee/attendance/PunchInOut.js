"use client";

import Loading from "@/components/Loading";
import isWithinRange from "@/lib/utils/isWithinRange";
import { Button } from "@nextui-org/react";
import { startTransition, useState } from "react";
import { GiEntryDoor, GiExitDoor } from "react-icons/gi";

export function PunchIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function handlePunchIn() {
    setLoading(true);
    navigator.geolocation.getCurrentPosition((a) => {
      console.log("Latitude : " + a.coords.latitude);
      console.log("Longitute : " + a.coords.longitude);
      const res = isWithinRange(
        100,
        { latitude: 23.0302, longitude: 72.5772 },
        a.coords
      );
      console.log("Function responce = ", res);
      startTransition(() => {
        setLoading(!res);
        !res &&
          setError(
            "******Sorry, Failed To Verify Location. Please Try Again...******"
          );
      });
    });
  }
  if (new Date().getHours() > 15 || new Date().getHours() < 8) return;

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
        >
          punch in{" "}
          {loading ? (
            <Loading inline={true} />
          ) : (
            <>
              <GiExitDoor />
            </>
          )}
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

export function PunchOut() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function handlePunchOut() {
    setLoading(true);

    navigator.geolocation.getCurrentPosition((a) => {
      console.log("Latitude : " + a.coords.latitude);
      console.log("Longitute : " + a.coords.longitude);
      const res = isWithinRange(
        100,
        { latitude: 23.0302, longitude: 72.5772 },
        a.coords
      );
      console.log("Function responce = ", res);
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
        <p>Punch In Time : {new Date().toLocaleTimeString()}</p>
        <p>
          Total Hours :{" "}
          {new Date(new Date().setHours(14) - new Date()).getHours()}
        </p>
        <p>
          Over Time Hours :{" "}
          {new Date(new Date().setHours(14) - new Date()).getHours()}
        </p>
        <Button
          variant="faded"
          color={error ? "danger" : "warning"}
          size="lg"
          className="tracking-widest uppercase text-4xl font-extrabold"
          disabled={loading}
          onPress={handlePunchOut}
        >
          {loading ? (
            <Loading inline={true} />
          ) : (
            <>
              <GiEntryDoor />
            </>
          )}{" "}
          punch out
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
