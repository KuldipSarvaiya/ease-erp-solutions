"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputCon from "@/components/InputCon";
import { GrMapLocation } from "react-icons/gr";

function ProfilePage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/customer/profile");
    },
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    register,
    control,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [currLocation, setCurrLocation] = useState(false);

  useEffect(() => {
    if (isOpen === false) {
      if (session?.user?.address === "") {
        onOpen();
      }
    }
  }, [session]);

  function saveAddress(data) {
    // console.log(data);

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
          onClose();
        }
      })
      .catch((e) => {
        // console.log(e);
        alert("Failed To Save Your Address\nTry Again");
      });
  }

  return (
    <>
      <div>
        <h4>{session?.user?._id}</h4>
        <h4>{session?.user?.role}</h4>
        <h4>{session?.user?.name}</h4>
        <h4>{session?.user?.email}</h4>
        <h4>{session?.user?.picture}</h4>
        <h4>{session?.user?.address}</h4>
        <h4>{session?.user?.address_coordinates?.latitude}</h4>
        <h4>{session?.user?.address_coordinates?.longitude}</h4>
      </div>
      <Modal
        isOpen={isOpen}
        placement="bottom"
        backdrop="opaque"
        onOpenChange={onOpenChange}
        closeButton={<></>}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          <form
            onSubmit={handleSubmit(saveAddress)}
            className="flex flex-col flex-nowrap gap-5 md:flex-nowrap w-full"
          >
            <ModalHeader>Customer Onboarding</ModalHeader>
            <ModalBody>
              <span className="columns-1">
                <Input
                  {...register("contact_no", {
                    required: "Please Enter Your Contact No",
                  })}
                  label="Contact Number"
                  labelPlacement="outside"
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
                  labelPlacement="outside"
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
                    title="use current coordinates"
                    color="secondary"
                    startContent={<GrMapLocation />}
                    onClick={() => {
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
            </ModalBody>
            <ModalFooter className="flex flex-row justify-center">
              <Button
                type="submit"
                variant="shadow"
                radius="full"
                color="secondary"
              >
                SAVE ADDRESS
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfilePage;
