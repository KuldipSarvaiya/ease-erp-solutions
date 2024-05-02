"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  Button,
  Link as UiLink,
  Textarea,
  Input,
  Divider,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputCon from "@/components/InputCon";
import { GrMapLocation } from "react-icons/gr";
import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import MyOrderTable from "./MyOrderTable";
import Image from "next/image";

function ProfilePage() {
  const [localData, setLocalData] = useState(null);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/customer/profile");
    },
  });
  const {
    register,
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [currLocation, setCurrLocation] = useState(false);

  useEffect(() => {
    if (localStorage)
      setLocalData(JSON.parse(localStorage.getItem?.("my_address")));
  }, []);

  // change address data
  function saveAddress(data) {
    // console.log(data);
    localStorage?.setItem(
      "my_address",
      JSON.stringify({
        address: data.address,
        contact_no: data.contact_no,
        address_coordinates: {
          longitude: data.longitude,
          latitude: data.latitude,
        },
      })
    );
    setLocalData({
      address: data.address,
      contact_no: data.contact_no,
      address_coordinates: {
        longitude: data.longitude,
        latitude: data.latitude,
      },
    });

    //
    fetch("/api/customer/profile", {
      method: "PUT",
      body: JSON.stringify({
        _id: session?.user?._id,
        address: data.address,
        contact_no: data.contact_no,
        address_coordinates: {
          longitude: data.longitude,
          latitude: data.latitude,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          reset();
        }
      })
      .catch((e) => {
        // console.log(e);
        alert("Failed To Save Your Address\nTry Again");
      });
  }

  return (
    <section className="lg:mx-32 relative">
      <div className="flex flex-row gap-8 flex-wrap lg:flex-nowrap max-w-full justify-center">
        {/* my details */}
        <div className="flex-grow max-w-full border-4 rounded-3xl my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
          <p className="text-xl font-bold tracking-wide">PERSONAL DETAILS</p>
          <Divider className="my-5" />
          <div className="flex flex-row flex-nowrap gap-10 items-center mr-10">
            <Image
              src={session?.user?.picture}
              height={200}
              width={200}
              alt="profile picture"
              className="rounded-full ring-slate-200 ring-2 bg-transparent aspect-square"
            />
            <div className="text-xl max-md:text-base text-balance max-sm:text-sm ">
              <p>NAME : {session?.user?.name}</p>
              <p className="my-5 max-sm:break-all">
                EMAIL : {session?.user?.email}
              </p>
              <p className="mb-5">
                CONTACT :
                {localData?.contact_no || session?.user?.contact_no || ""}
              </p>
              <Button
                variant="flat"
                className="max-md:-scale-75 max-md:translate-x-1/3 max-md:rotate-180"
              >
                <UiLink
                  as={Link}
                  href="/api/auth/signout?callbackUrl=/"
                  size="sm"
                  color="foreground"
                  onClick={() => {
                    setActive("signout");
                  }}
                >
                  <FaSignOutAlt />
                  &nbsp;Sign Out
                </UiLink>
              </Button>
            </div>
          </div>
          <br />
          <div className="ml-5 text-xl font-normal flex flex-row flex-nowrap max-md:text-base max-sm:text-sm">
            <span> ADDRESS&nbsp;:&nbsp;</span>{" "}
            <span className="text-balance">
              {localData?.address || session?.user?.address || ""}
            </span>
          </div>
          <div className="ml-5 mt-5 text-xl font-normal flex flex-row flex-nowrap max-md:text-base max-sm:text-sm">
            <Link
              href={`https://www.google.com/maps/search/?api=1&query=${
                localData?.address_coordinates?.latitude ||
                session?.user?.address_coordinates?.latitude
              },${
                localData?.address_coordinates?.longitude ||
                session?.user?.address_coordinates?.longitude
              }`}
              target="_blank"
            >
              CURRENT&nbsp;ADDRESS&nbsp;{"(Google Map) "}↗️{" "}
            </Link>
          </div>
        </div>

        {/* change address */}
        <div
          className={
            "w-1/4 lg:w-1/3 min-w-80 border-4 rounded-3xl my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500" +
            `${
              !session?.user?.address &&
              !session?.user?.contact_no &&
              !localData
                ? " border-red-500"
                : " border-white"
            }`
          }
        >
          <form
            onSubmit={handleSubmit(saveAddress)}
            className="flex flex-col flex-nowrap gap-5 md:flex-nowrap w-full"
          >
            <p
              className={
                "text-xl font-bold tracking-wide" +
                `${
                  !session?.user?.address &&
                  !session?.user?.contact_no &&
                  !localData
                    ? " text-red-500 animate-pulse"
                    : ""
                }`
              }
            >
              {" "}
              {!session?.user?.address &&
              !session?.user?.contact_no &&
              !localData
                ? "ONBOARDING : ADD DETAILS "
                : "CHANGE ADDRESS"}
            </p>
            <Divider />
            <div className="flex flex-col gap-5">
              <span className="columns-1">
                <Input
                  {...register("contact_no", {
                    required: "Please Enter Your Contact No",
                  })}
                  label="Contact Number"
                  labelPlacement="inside"
                  variant="faded"
                  size="lg"
                  color="secondary"
                  type="tel"
                  name="contact_no"
                  aria-label="contact_no"
                  aria-labelledby="contact_no"
                  title="Enter Your Contact No"
                />
                <p className="text-red-500"> {errors?.contact_no?.message} </p>
              </span>
              <span className="columns-1">
                <Textarea
                  {...register("address", {
                    required: "Please Enter Your Address",
                  })}
                  label="Address"
                  labelPlacement="inside"
                  placeholder="Ex : HouseNo, Street/Socity, City/Village, Tehsil, District, State, PIN"
                  variant="faded"
                  size="lg"
                  color="secondary"
                  name="address"
                  aria-label="address"
                  aria-labelledby="address"
                  title="Enter Address of Supplier"
                />
                <p className="text-red-500"> {errors?.address?.message} </p>
              </span>
              <span className="columns-1 gap-3">
                <span className="flex gap-3 items-stretch">
                  <span className="hidden">
                    <InputCon
                      controller={{
                        name: "latitude",
                        control: control,
                        rules: {},
                      }}
                      input={{
                        size: "lg",
                        variant: "faded",
                        color: "secondary",
                        type: "number",
                        name: "latitude",
                        id: "latitude",
                        "aria-label": "latitude",
                        "aria-labelledby": "latitude",
                        startContent: "Latitude: ",
                        hidden: true,
                      }}
                    />
                    <InputCon
                      controller={{
                        name: "longitude",
                        control: control,
                        rules: {},
                      }}
                      input={{
                        size: "lg",
                        variant: "faded",
                        color: "secondary",
                        type: "number",
                        name: "longitude",
                        id: "longitude",
                        "aria-label": "longitude",
                        "aria-labelledby": "longitude",
                        startContent: "Longitude: ",
                        hidden: true,
                      }}
                    />
                  </span>
                  <Button
                    variant={currLocation === false ? "ghost" : "faded"}
                    size="lg"
                    title="Make Sure To Connect To Internet"
                    color="secondary"
                    startContent={<GrMapLocation />}
                    onPress={() => {
                      try {
                        if (!navigator.geolocation)
                          return alert("Please Allow location Permission");
                        navigator.geolocation.getCurrentPosition(
                          (coordinates) => {
                            setValue("latitude", coordinates.coords.latitude);
                            setValue("longitude", coordinates.coords.longitude);
                            setCurrLocation(true);
                          }
                        );
                      } catch (error) {
                        // console.error(error);
                        setCurrLocation("Cannot Access Your Current Location");
                      }
                    }}
                  >
                    USE CURRENT LOCATION
                  </Button>
                  {currLocation !== false && (
                    <span>{currLocation === true ? "✔️" : currLocation}</span>
                  )}
                </span>
              </span>
            </div>
            <center>
              <Button
                type="submit"
                variant="shadow"
                radius="full"
                color="secondary"
              >
                SAVE ADDRESS
              </Button>
            </center>
          </form>
        </div>
      </div>

      {/* orders */}
      <MyOrderTable customer_id={session?.user?.id} />
    </section>
  );
}

export default ProfilePage;
