"use client";

import { Button, Input, Textarea } from "@nextui-org/react";
import { TbExchange } from "react-icons/tb";
import { Controller, useForm } from "react-hook-form";
import { startTransition, useEffect, useState } from "react";
import { GiCancel } from "react-icons/gi";
import { GrUpdate } from "react-icons/gr";
import InputCon from "@/components/InputCon";
import Image from "next/image";

export default function DetailsPage() {
  const [isEditable, setIsEditable] = useState(false);

  const {
    // register,
    setError,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset({
      username: "kd",
      password: "password",
      first_name: "kuldip",
      middle_name: "father",
      last_name: "saraviya",
      email: "kuldip@gmail.com",
      contact: 1234512345,
      image: "okokok.png",
      address: "my home",
      account_number: 12345678989,
      bank_name: "world bank",
      ifsc_code: "WRLD00029",
    });
  }, [isEditable]);

  async function handleChange(formdata) {
    console.log(formdata);
    for (let i in formdata)
      if (!formdata[i])
        setError(i, {
          type: "Invalid Type",
          message: "Please enter Valid Detail here",
        });
    setIsEditable(false);
  }

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-3 flex-col">
        <p className="text-2xl font-bold tracking-wide">CHANGE YOUR DETAILS</p>
        <form onSubmit={handleSubmit(handleChange)} encType="multipart/form-data">
          <div className="flex flex-col flex-nowrap gap-5 md:flex-nowrap">
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Username : </span>
              <InputCon
                controller={{
                  name: "username",
                  control: control,
                  rules: {
                    required: "username is required",
                  },
                }}
                input={{
                  name: "username",
                  isRequired: true,
                  disabled: !isEditable,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              {/* <Controller
                name={"username"}
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      type={"username"}
                      // label={"UserName"}
                      radius="sm"
                      size="sm"
                      // labelPlacement="outside"
                      variant="faded"
                      color="secondary"
                      name={"username"}
                      // placeholder={placeholder}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      isRequired={true}
                      disabled={!isEditable}
                      className="md:col-start-2 md:col-end-4"
                    />
                  </>
                )}
              /> */}
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
                      source: /[A-Za-z0-9]{8,}.*/,
                      message:
                        "use Alphanumeric characters, small,capital letters, numbers...",
                    },
                  },
                }}
                input={{
                  type: "password",
                  name: "password",
                  isRequired: true,
                  disabled: !isEditable,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              {/* <Controller
                name={"password"}
                control={control}
                rules={{
                  required: "Password is required to go ahead",
                  minLength: {
                    value: 8,
                    message: "Password is not strong enough",
                  },
                  pattern: {
                    source: /[A-Za-z0-9]{8,}.* /,
                    message:
                      "use Alphanumeric characters, small,capital letters, numbers...",
                  },
                }}
                render={({ field }) => (
                  <>
                    <Input
                      type={"password"}
                      // label={"Password"}
                      radius="sm"
                      size="sm"
                      // labelPlacement="outside"
                      variant="faded"
                      color="secondary"
                      name={"password"}
                      // placeholder={placeholder}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        // handleChange(e);
                        // onChanged(e);
                      }}
                      disabled={!isEditable}
                      className="md:col-start-2 md:col-end-4"
                      isRequired={true}
                    />
                  </>
                )}
              /> */}
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
                    },
                  },
                }}
                input={{
                  name: "first_name",
                  isRequired: true,
                  disabled: !isEditable,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              {/* <Controller
                name={"first_name"}
                control={control}
                rules={{
                  required: "Please provide your first name.",
                  pattern: {
                    value: /[a-z]* /i,
                  },
                }}
                render={({ field }) => (
                  <>
                    <Input
                      type={"text"}
                      // label={"First Name"}
                      radius="sm"
                      size="sm"
                      // labelPlacement="outside"
                      variant="faded"
                      color="secondary"
                      name={"first_name"}
                      // placeholder={placeholder}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        // handleChange(e);
                        // onChanged(e);
                      }}
                      disabled={!isEditable}
                      className="md:col-start-2 md:col-end-4"
                      isRequired={true}
                    />
                  </>
                )}
              /> */}
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
                    },
                  },
                }}
                input={{
                  name: "middle_name",
                  isRequired: true,
                  disabled: !isEditable,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              {/* <Controller
                name={"middle_name"}
                control={control}
                rules={{
                  required: "Please provide your middle name.",
                  pattern: {
                    value: /[a-z]* /i,
                  },
                }}
                render={({ field }) => (
                  <>
                    <Input
                      type={"text"}
                      // label={"Middle Name"}
                      radius="sm"
                      size="sm"
                      // labelPlacement="outside"
                      variant="faded"
                      color="secondary"
                      name={"middle_name"}
                      // placeholder={placeholder}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        // handleChange(e);
                        // onChanged(e);
                      }}
                      disabled={!isEditable}
                      className="md:col-start-2 md:col-end-4"
                      isRequired={true}
                    />
                  </>
                )}
              /> */}
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
                    },
                  },
                }}
                input={{
                  name: "last_name",
                  isRequired: true,
                  disabled: !isEditable,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              {/* <Controller
                name={"last_name"}
                control={control}
                rules={{
                  required: "Please provide your last name.",
                  pattern: {
                    value: /[a-z]* /i,
                  },
                }}
                render={({ field }) => (
                  <>
                    <Input
                      type={"text"}
                      // label={"Last Name"}
                      radius="sm"
                      size="sm"
                      // labelPlacement="outside"
                      variant="faded"
                      color="secondary"
                      name={"last_name"}
                      // placeholder={placeholder}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        // handleChange(e);
                        // onChanged(e);
                      }}
                      disabled={!isEditable}
                      className="md:col-start-2 md:col-end-4"
                      isRequired={true}
                    />
                  </>
                )}
              /> */}
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
                  type: "email",
                  name: "email",
                  isRequired: true,
                  disabled: !isEditable,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              {/* <Controller
                name={"email"}
                control={control}
                rules={{
                  required: "Please provide your Email Address",
                }}
                render={({ field }) => (
                  <>
                    <Input
                      type={"email"}
                      // label={"Email"}
                      radius="sm"
                      size="sm"
                      // labelPlacement="outside"
                      variant="faded"
                      color="secondary"
                      name={"email"}
                      // placeholder={placeholder}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        // handleChange(e);
                        // onChanged(e);
                      }}
                      disabled={!isEditable}
                      className="md:col-start-2 md:col-end-4"
                      isRequired={true}
                    />
                  </>
                )}
              /> */}
              <p className="text-red-500"> {errors?.email?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Contact : </span>
              <InputCon
                controller={{
                  name: "contact",
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
                  type: "tel",
                  name: "contact",
                  isRequired: true,
                  disabled: !isEditable,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              {/* <Controller
                name={"contact"}
                control={control}
                rules={{
                  required: "Please provide your contect.",
                  valueAsNumber: true,
                  pattern: {
                    value: /[0-9]{10} /,
                    message: "Enter Valid 10 Digit Number",
                  },
                }}
                render={({ field }) => (
                  <>
                    <Input
                      type={"tel"}
                      // label={"Contact"}
                      radius="sm"
                      size="sm"
                      // labelPlacement="outside"
                      variant="faded"
                      color="secondary"
                      name={"contact"}
                      // placeholder={placeholder}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        // handleChange(e);
                        // onChanged(e);
                      }}
                      disabled={!isEditable}
                      className="md:col-start-2 md:col-end-4"
                      isRequired={true}
                    />
                  </>
                )}
              /> */}
              <p className="text-red-500"> {errors?.contact?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Profile Image : </span>
              <Controller
                name={"image"}
                control={control}
                rules={{
                  required: "Please provide your image.",
                  accept: "image/jpeg,image/png,image/gif",
                }}
                render={({ field }) => (
                  <>
                    <Input
                      type={"file"}
                      accept="image/jpeg,image/png,image/gif"
                      radius="sm"
                      size="sm"
                      variant="faded"
                      color="secondary"
                      name={"image"}
                      value={field.file}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      disabled={!isEditable}
                      className="md:col-start-2 md:col-end-4"
                      isRequired={true}
                    />
                    {field.file && (
                      <Image
                        src={URL.createObjectURL(field.file)}
                        alt="Profile Preview"
                        width={100}
                        height={100}
                      />
                    )}
                  </>
                )}
              />
              <p className="text-red-500"> {errors?.image?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Address : </span>
              <Controller
                name={"address"}
                control={control}
                rules={{
                  required: "Please provide your address.",
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
                      size="sm"
                      variant="faded"
                      color="secondary"
                      name={"address"}
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
              <p className="text-red-500"> {errors?.address?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Account Number : </span>
              <InputCon
                controller={{
                  name: "account_number",
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
                  type: "number",
                  name: "account_number",
                  isRequired: true,
                  disabled: !isEditable,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              {/* <Controller
                name={"account_number"}
                control={control}
                rules={{
                  required: "Please provide your account number.",
                  minLength: 11,
                  valueAsNumber: true,
                  pattern: {
                    value: /[0-9]{11,} /,
                  },
                }}
                render={({ field }) => (
                  <>
                    <Input
                      type={"number"}
                      // label={"Account Number"}
                      radius="sm"
                      size="sm"
                      // labelPlacement="outside"
                      variant="faded"
                      color="secondary"
                      name={"account_number"}
                      // placeholder={placeholder}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        // handleChange(e);
                        // onChanged(e);
                      }}
                      disabled={!isEditable}
                      className="md:col-start-2 md:col-end-4"
                      isRequired={true}
                    />
                  </>
                )}
              /> */}
              <p className="text-red-500"> {errors?.account_number?.message}</p>
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
                  name: "bank_name",
                  isRequired: true,
                  disabled: !isEditable,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              {/* <Controller
                name={"bank_name"}
                control={control}
                rules={{
                  required: "Please provide the name of your bank.",
                }}
                render={({ field }) => (
                  <>
                    <Input
                      type={"text"}
                      // label={"Bank Name"}
                      radius="sm"
                      size="sm"
                      // labelPlacement="outside"
                      variant="faded"
                      color="secondary"
                      name={"bank_name"}
                      // placeholder={placeholder}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        // handleChange(e);
                        // onChanged(e);
                      }}
                      disabled={!isEditable}
                      className="md:col-start-2 md:col-end-4"
                      isRequired={true}
                    />
                  </>
                )}
              /> */}
              <p className="text-red-500"> {errors?.bank_name?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Branch IFSC Code : </span>
              <InputCon
                controller={{
                  name: "ifsc_code",
                  control: control,
                  rules: {
                    required: "ifsc code of branch is required",
                  },
                }}
                input={{
                  name: "ifsc_code",
                  isRequired: true,
                  disabled: !isEditable,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              {/* <Controller
                name={"ifsc_code"}
                control={control}
                rules={{
                  required: "ifsc code of branch is required",
                }}
                render={({ field }) => (
                  <>
                    <Input
                      type={"text"}
                      // label={"IFSC Code"}
                      radius="sm"
                      size="sm"
                      // labelPlacement="outside"
                      variant="faded"
                      color="secondary"
                      name={"text"}
                      // placeholder={placeholder}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        // handleChange(e);
                        // onChanged(e);
                      }}
                      disabled={!isEditable}
                      className="md:col-start-2 md:col-end-4"
                      isRequired={true}
                    />
                  </>
                )}
              /> */}
              <p className="text-red-500"> {errors?.ifsc_code?.message} </p>
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
                    onClick={() =>
                      startTransition(() => {
                        setIsEditable(false);
                      })
                    }
                  >
                    Cancel
                  </Button>
                </>
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
