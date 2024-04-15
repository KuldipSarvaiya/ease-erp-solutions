"use client";

import {
  Avatar,
  Button,
  Divider,
  Input,
  Snippet,
  Textarea,
} from "@nextui-org/react";
import { TbExchange } from "react-icons/tb";
import { Controller, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { GiCancel } from "react-icons/gi";
import { GrUpdate } from "react-icons/gr";
import InputCon from "@/components/InputCon";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function DetailsPage() {
  const [isEditable, setIsEditable] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    setError,
    reset,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/employee/details");
    },
  });

  const fetchEmpData = useCallback(async () => {
    // console.log("in callback");
    const res = await fetch("/api/employee/details/" + session?.user?._id, {
      method: "GET",
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
    return {};
  }, [session]);

  useEffect(() => {
    (async () => {
      const data = await fetchEmpData();
      // console.log("api data ", data);
      reset(data);
    })();
  }, [isEditable, session]);

  async function handleUpdate(formdata) {
    // console.log(formdata);
    const formData = new FormData();

    for (const key in formdata) {
      if (key === "image") formData.append(key, formdata[key][0]);
      else formData.append(key, formdata[key]);
    }

    const result = await fetch("/api/employee/details/" + session?.user?._id, {
      method: "PUT",
      body: formData,
    });
    if (result.ok) {
      setIsEditable(false);
      setSuccess("Details Has Been Updated Successfully");
    } else setSuccess("Failed To Update Details");
    setTimeout(() => setSuccess(false), [5000]);
  }

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-3 flex-col">
        <p className="text-2xl font-bold tracking-wide">CHANGE YOUR DETAILS</p>
        <Divider className="my-5" />
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="flex flex-col flex-nowrap gap-5 md:flex-nowrap">
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Username : </span>
              <InputCon
                controller={{
                  name: "username",
                  control: control,
                  rules: {
                    required: "username is required",
                    pattern: {
                      // value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                      value: /[A-Za-z0-9_]{8,}.*/,
                      message:
                        "Username Does Not Match Required Pattern | a-z,A-Z,0-9",
                    },
                  },
                }}
                input={{
                  size: "lg",
                  name: "username",
                  isRequired: true,
                  disabled: !isEditable,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />

              <p className="text-red-500"> {errors?.username?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Password : </span>
              <InputCon
                controller={{
                  name: "password",
                  control: control,
                  rules: {
                    required: "Password is required to go ahead",
                    minLength: {
                      value: 8,
                      message: "Password is not strong enough",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                      // value: /[A-Za-z0-9]{8,}.*/,
                      message:
                        "use Alphanumeric characters, small,capital letters, numbers...",
                    },
                  },
                }}
                input={{
                  size: "lg",
                  type: "password",
                  name: "password",
                  isRequired: true,
                  disabled: !isEditable,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />

              <p className="text-red-500"> {errors?.password?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">First Name : </span>
              <InputCon
                controller={{
                  name: "first_name",
                  control: control,
                  rules: {
                    required: "Please provide your first name.",
                    pattern: {
                      value: /[a-z]*/i,
                      message: "Please use only small letters",
                    },
                  },
                }}
                input={{
                  size: "lg",
                  name: "first_name",
                  isRequired: true,
                  disabled: !isEditable,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />

              <p className="text-red-500"> {errors?.first_name?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Middle Name : </span>
              <InputCon
                controller={{
                  name: "middle_name",
                  control: control,
                  rules: {
                    required: "Please provide your middle name.",
                    pattern: {
                      value: /[a-z]*/i,
                      message: "Please use only small letters",
                    },
                  },
                }}
                input={{
                  size: "lg",
                  name: "middle_name",
                  isRequired: true,
                  disabled: !isEditable,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />

              <p className="text-red-500"> {errors?.middle_name?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Last Name : </span>
              <InputCon
                controller={{
                  name: "last_name",
                  control: control,
                  rules: {
                    required: "Please provide your last name.",
                    pattern: {
                      value: /[a-z]*/i,
                      message: "Please use only small letters",
                    },
                  },
                }}
                input={{
                  size: "lg",
                  name: "last_name",
                  isRequired: true,
                  disabled: !isEditable,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />

              <p className="text-red-500"> {errors?.last_name?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Email : </span>
              <InputCon
                controller={{
                  name: "email",
                  control: control,
                  rules: {
                    required: "Please provide your Email Address",
                  },
                }}
                input={{
                  size: "lg",
                  type: "email",
                  name: "email",
                  isRequired: true,
                  disabled: !isEditable,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />

              <p className="text-red-500"> {errors?.email?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Contact No. : </span>
              <InputCon
                controller={{
                  name: "contact_no",
                  control: control,
                  rules: {
                    required: "Please provide your contect.",
                    valueAsNumber: true,
                    pattern: {
                      value: /[0-9]{10}/,
                      message: "Enter Valid 10 Digit Number",
                    },
                  },
                }}
                input={{
                  size: "lg",
                  type: "tel",
                  name: "contact_no",
                  isRequired: true,
                  disabled: !isEditable,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500"> {errors?.contact_no?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Profile Image : </span>
              <Input
                {...register("image", {
                  // required: "Please provide your image.",
                  // validate: (v) =>
                  //   getValues("image")[0]
                  //     ? v[0].size < 500 * 1024 ||
                  //       "Imgae Size is Large, max 500kb"
                  //     : true,
                })}
                type={"file"}
                radius="sm"
                size="md"
                variant="faded"
                color="secondary"
                accept=".png, .jpg, .jpeg"
                disabled={!isEditable}
                className="md:col-start-2 md:col-end-4"
                // isRequired={true}
                // startContent={
                //   <Avatar src={"/kuldip_upload/" + getValues("image")} />
                // }
              />
              <p className="text-red-500"> {errors?.image?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Address : </span>
              <Controller
                name={"home_address"}
                control={control}
                rules={{
                  required: "Please provide your home address.",
                  pattern: {
                    value: /[a-z0-9,-]*/i,
                  },
                }}
                render={({ field }) => (
                  <>
                    <Textarea
                      cols={10}
                      rows={5}
                      radius="sm"
                      size="lg"
                      variant="faded"
                      color="secondary"
                      name={"home_address"}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      disabled={!isEditable}
                      className="md:col-start-2 md:col-end-4"
                      isRequired={true}
                    />
                  </>
                )}
              />
              <p className="text-red-500"> {errors?.home_address?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Bank Name : </span>
              <InputCon
                controller={{
                  name: "bank_name",
                  control: control,
                  rules: {
                    required: "Please provide the name of your bank.",
                  },
                }}
                input={{
                  size: "lg",
                  name: "bank_name",
                  isRequired: true,
                  disabled: !isEditable,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500"> {errors?.bank_name?.message} </p>
            </span>{" "}
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Account Number : </span>
              <InputCon
                controller={{
                  name: "bank_acc_no",
                  control: control,
                  rules: {
                    required: "Please provide your account number.",
                    minLength: 11,
                    valueAsNumber: true,
                    pattern: {
                      value: /[0-9]{11,}/,
                    },
                  },
                }}
                input={{
                  size: "lg",
                  type: "number",
                  name: "bank_acc_no",
                  isRequired: true,
                  disabled: !isEditable,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500"> {errors?.bank_acc_no?.message}</p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Branch IFSC Code : </span>
              <InputCon
                controller={{
                  name: "bank_ifsc_code",
                  control: control,
                  rules: {
                    required: "ifsc code of branch is required",
                  },
                }}
                input={{
                  size: "lg",
                  name: "bank_ifsc_code",
                  isRequired: true,
                  disabled: !isEditable,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500">
                {" "}
                {errors?.bank_ifsc_code?.message}{" "}
              </p>
            </span>
            <span className="flex gap-3 ">
              {isEditable && (
                <>
                  <Button
                    type="submit"
                    variant="solid"
                    size="md"
                    color="secondary"
                    startContent={<TbExchange />}
                  >
                    Change Details
                  </Button>
                  <Button
                    type="reset"
                    variant="solid"
                    size="md"
                    color="secondary"
                    startContent={<GiCancel />}
                    onClick={() => setIsEditable(false)}
                  >
                    Cancel
                  </Button>
                </>
              )}
              {success !== false && (
                <Snippet
                  color={
                    success.includes("Successfully") ? "success" : "danger"
                  }
                  hideCopyButton
                  hideSymbol
                >
                  {success}
                </Snippet>
              )}
            </span>
          </div>
        </form>
        {!isEditable && (
          <Button
            type="button"
            variant="solid"
            size="md"
            color="secondary"
            startContent={<GrUpdate />}
            onClick={() => setIsEditable(true)}
            className="max-w-sm"
          >
            Update Details
          </Button>
        )}
      </div>
    </div>
  );
}
