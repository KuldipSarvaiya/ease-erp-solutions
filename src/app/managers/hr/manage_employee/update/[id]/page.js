"use client";

import InputCon from "@/components/InputCon";
import { resignEmployee } from "@/lib/utils/server_actions/hr";
import { ImageUploadButton } from "@/lib/utils/uploadthing";
import {
  Avatar,
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Snippet,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { GrMapLocation, GrPowerReset } from "react-icons/gr";
import { IoPersonRemoveSharp } from "react-icons/io5";

function Page({ params: { id } }) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callback_url=/managers/hr/manage_employee");
    },
  });
  const route = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState(false);
  const [depts, setDepts] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const {
    register,
    reset,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  // fetch employee data
  useEffect(() => {
    if (!data) {
      (async () => {
        const res = await fetch("/api/employee/details/" + id, {
          method: "GET",
          next: { tags: "UpdateEmployees" },
        });

        if (res.ok) {
          const data = await res.json();
          // console.log("employee data = ", data);
          setData(data);
        } else {
          alert("Can Not Get Employee Details Due To Network Error");
          route.back();
        }
      })();
    }
  }, []);

  // reset form with employee data
  useEffect(() => {
    if (data && depts.length !== 0) {
      data.latitude = data.attendance_coordinates.latitude;
      data.longitude = data.attendance_coordinates.longitude;
      reset(data);
      setImage(data.image);
      // setValue("home_address", data.home_address );
    }
  }, [data, depts]);

  // fetch departments
  useEffect(() => {
    if (depts.length <= 0)
      (async function () {
        const res = await fetch("/api/hr/department", {
          method: "GET",
        });
        if (!res.ok) return;

        const depts = await res.json();
        // console.log(depts);
        setDepts(depts);
      })();
  }, []);

  async function handelAction(formdata) {
    setLoading(true);
    formdata.append("id", id);
    formdata.append("image", image);
    formdata.append("rezorpay_contact_id", data?.rezorpay_contact_id);
    formdata.append("rezorpay_fund_id", data?.rezorpay_fund_id);
    formdata.append("updated_by", session?.user?._id);
    if (formdata.get("department_id") === "") {
      formdata.append("department_id", data?.department_id);
    }
    if (
      data.bank_acc_no.toString() !== formdata.get("bank_acc_no").toString() ||
      data.bank_ifsc_code.toString() !==
        formdata.get("bank_ifsc_code").toString()
    ) {
      formdata.append("change_acc", "1");
    }

    const res = await fetch("/api/hr/employee", {
      method: "PUT",
      body: formdata,
    });

    if (res.ok) {
      setSuccess("Employee Details Has Updated Successfully");
    } else setSuccess("Faild To Update Employee. Try Again Later");
    setTimeout(() => setSuccess(false), [5000]);
    setLoading(false);
  }

  return (
    <>
      <div className="relative w-full h-full max-h-full max-w-full">
        <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
          <p className="uppercase text-2xl max-md:text-lg tracking-wider font-bold mb-5 flex flex-row flex-nowrap justify-between">
            update emplyee
            {!data && (
              <span className="flex gap-3 flex-row items-center text-base">
                <AiOutlineLoading3Quarters className="animate-spin duration-75" />
                Getting employee data
              </span>
            )}
            <Button
              size="md"
              color="secondary"
              variant="shadow"
              endContent={<IoPersonRemoveSharp className="scale-125" />}
              aria-label="resign employee"
              aria-labelledby="resign employee"
              onPress={onOpen}
              isDisabled={!data}
            >
              RESIGN EMPLOYEE
            </Button>
          </p>
          <Divider className="my-5" />
          <form
            action={handelAction}
            noValidate={false}
            className="flex flex-col flex-nowrap gap-5 md:flex-nowrap"
          >
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
              <span className="text-xl font-semibold">First Name : </span>
              <InputCon
                controller={{
                  name: "first_name",
                  control: control,
                  rules: {
                    required: "Please enter first name",
                  },
                }}
                input={{
                  disabled: !data,
                  // defaultValue: getValues("first_name"),
                  size: "lg",
                  variant: "faded",
                  isRequired: true,
                  color: "secondary",
                  type: "text",
                  name: "first_name",
                  "aria-label": "first_name",
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500"> {errors?.first_name?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
              <span className="text-xl font-semibold">Middle Name : </span>
              <InputCon
                controller={{
                  name: "middle_name",
                  control: control,
                  rules: {
                    required: "Please enter middle name",
                  },
                }}
                input={{
                  disabled: !data,
                  // defaultValue: getValues("middle_name"),
                  size: "lg",
                  variant: "faded",
                  isRequired: true,
                  color: "secondary",
                  type: "text",
                  name: "middle_name",
                  "aria-label": "middle_name",
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500"> {errors?.middle_name?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
              <span className="text-xl font-semibold">Last Name : </span>
              <InputCon
                controller={{
                  name: "last_name",
                  control: control,
                  rules: {
                    required: "Please enter last name",
                  },
                }}
                input={{
                  disabled: !data,
                  // defaultValue: getValues("last_name"),
                  size: "lg",
                  variant: "faded",
                  isRequired: true,
                  color: "secondary",
                  type: "text",
                  name: "last_name",
                  "aria-label": "last_name",
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500"> {errors?.last_name?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
              <span className="text-xl font-semibold">Profile Image : </span>
              {/* <Input
                {...register("image", {
                  // required: "Please Select a Profile Image",
                  validate: (v) =>
                    getValues("image")[0]
                      ? v[0].size < 500 * 1024 ||
                        "Imgae Size is Large, max 500kb"
                      : true,
                })}
                isDisabled={!data}
                startContent={
                  <Avatar size="md" src={"/kuldip_upload/" + data?.image} />
                } 
                variant="faded"
                size="md"
                color="secondary"
                type="file"
                multiple={false}
                accept=".png, .jpg, .jpeg"
                name="image"
                aria-label="image"
                aria-labelledby="image"
                // isRequired
                className="md:col-start-2 md:col-end-4"
              /> */}
              <ImageUploadButton image={image} setImage={setImage} />
              <p className="text-red-500"> {errors?.image?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
              <span className="text-xl font-semibold">Username : </span>
              <InputCon
                controller={{
                  name: "username",
                  control: control,
                  rules: {
                    required: "Please enter username",
                    pattern: {
                      value: /[a-zA-Z0-9]{8,}/,
                      message:
                        "Please use a valid alphanumeric username > 8 characters",
                    },
                  },
                }}
                input={{
                  disabled: !data,
                  startContent: "@",
                  // defaultValue: getValues("username"),
                  size: "lg",
                  variant: "faded",
                  isRequired: true,
                  color: "secondary",
                  type: "text",
                  name: "username",
                  "aria-label": "username",
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500"> {errors?.username?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
              <span className="text-xl font-semibold">Password : </span>
              <InputCon
                controller={{
                  name: "password",
                  control: control,
                  rules: {
                    required: "Please enter password",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                      // value: /[a-zA-Z0-9]{8,}/,
                      message:
                        "Please use a valid alphanumeric password > 8 characters",
                    },
                  },
                }}
                input={{
                  disabled: !data,
                  startContent: "#",
                  // defaultValue: getValues("password"),
                  size: "lg",
                  variant: "faded",
                  isRequired: true,
                  color: "secondary",
                  type: "password",
                  name: "password",
                  "aria-label": "password",
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500"> {errors?.password?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
              <span className="text-xl font-semibold">Email : </span>
              <InputCon
                controller={{
                  name: "email",
                  control: control,
                  rules: {
                    required: "Please enter email address",
                  },
                }}
                input={{
                  disabled: !data,
                  // defaultValue: getValues("email"),
                  size: "lg",
                  variant: "faded",
                  isRequired: true,
                  color: "secondary",
                  type: "mail",
                  name: "email",
                  "aria-label": "email",
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500"> {errors?.email?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
              <span className="text-xl font-semibold">Contact : </span>
              <InputCon
                controller={{
                  name: "contact_no",
                  control: control,
                  rules: {
                    required: "Please enter contact Number of employee",
                    max: {
                      value: 9999999999,
                      message: "Please enter valid 10 digit contact Number ",
                    },
                    min: {
                      value: 100000000,
                      message: "Please enter valid 10 digit contact Number ",
                    },
                  },
                }}
                input={{
                  disabled: !data,
                  // defaultValue: getValues("contact_no"),
                  startContent: "+91",
                  size: "lg",
                  variant: "faded",
                  isRequired: true,
                  color: "secondary",
                  type: "tel",
                  name: "contact_no",
                  "aria-label": "contact_no",
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500"> {errors?.contact_no?.message} </p>
            </span>
            {/* <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
              <span className="text-xl font-semibold">Designation : </span>
              <div className="flex gap-5">
                <Input
                  {...register("designation", {
                    required: "Please Select Gender",
                  })}
                  defaultChecked={getValues("designation") === "Employee"}
                  variant="faded"
                  size="md"
                  color="secondary"
                  type="radio"
                  endContent="EMPLOYEE"
                  // labelPlacement="outside-left"
                  value={"Employee"}
                  name="designation"
                  aria-label="designation"
                  aria-labelledby="designation"
                  // isRequired
                  className="md:col-start-2 md:col-end-4"
                />
                <Input
                  {...register("designation", {
                    required: "Please Select Gender",
                  })}
                  defaultChecked={getValues("designation") === "Manager"}
                  variant="faded"
                  size="md"
                  color="secondary"
                  type="radio"
                  endContent="MANAGER"
                  // labelPlacement="outside-left"
                  value={"Manager"}
                  name="designation"
                  aria-label="designation"
                  aria-labelledby="designation"
                  // isRequired
                  className="md:col-start-2 md:col-end-4"
                />
              </div>
              <p className="text-red-500"> {errors?.designation?.message} </p>
            </span> */}
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
              <span className="text-xl font-semibold">Expert Area : </span>
              <InputCon
                controller={{
                  name: "expert_area",
                  control: control,
                  rules: {
                    required: "Please fill in the expertiese part of job",
                  },
                }}
                input={{
                  disabled: !data,
                  // defaultValue: getValues("expert_area"),
                  size: "lg",
                  variant: "faded",
                  isRequired: true,
                  color: "secondary",
                  type: "text",
                  name: "expert_area",
                  "aria-label": "expert_area",
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500"> {errors?.expert_area?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
              <span className="text-xl font-semibold">Course Studied : </span>
              <InputCon
                controller={{
                  name: "course_studied",
                  control: control,
                  rules: {
                    required:
                      "Please enter detail about course studied by employee",
                  },
                }}
                input={{
                  disabled: !data,
                  // defaultValue: getValues("course_studied"),
                  endContent: "🎓",
                  size: "lg",
                  variant: "faded",
                  isRequired: true,
                  color: "secondary",
                  type: "text",
                  name: "course_studied",
                  "aria-label": "course_studied",
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500">{errors?.course_studied?.message}</p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 gap-3">
              <span className="text-xl font-semibold">
                Attendace Coordinates :{" "}
              </span>
              <span className="flex gap-3 items-stretch md:col-start-2 md:col-end-4">
                <InputCon
                  controller={{
                    name: "latitude",
                    control: control,
                    rules: {
                      required: "Please enter latitude of attendace place",
                      validate: (v) =>
                        !v.toString().includes("e") ||
                        "latitude must be a valid number",
                    },
                  }}
                  input={{
                    disabled: !data,
                    defaultValue: getValues("latitude"),
                    size: "lg",
                    variant: "faded",
                    isRequired: true,
                    color: "secondary",
                    type: "number",
                    name: "latitude",
                    id: "latitude",
                    "aria-label": "latitude",
                    "aria-labelledby": "latitude",
                    startContent: "Latitude: ",
                  }}
                />
                <InputCon
                  controller={{
                    name: "longitude",
                    control: control,
                    rules: {
                      required: "Please enter Longitude of attendace place",
                      validate: (v) =>
                        !v.toString().includes("e") ||
                        "Longitude must be a valid number",
                    },
                  }}
                  input={{
                    disabled: !data,
                    defaultValue: getValues("longitude"),
                    size: "lg",
                    variant: "faded",
                    isRequired: true,
                    color: "secondary",
                    type: "number",
                    name: "longitude",
                    id: "longitude",
                    "aria-label": "longitude",
                    "aria-labelledby": "longitude",
                    startContent: "Longitude: ",
                  }}
                />
                <Button
                  variant="ghost"
                  isIconOnly
                  isDisabled={!data}
                  size="lg"
                  title="use current coordinates"
                  color="secondary"
                  startContent={<GrMapLocation />}
                  onClick={() => {
                    if (!navigator.geolocation)
                      return alert("Please Allow location Permission");
                    navigator.geolocation.getCurrentPosition((coordinates) => {
                      setValue("latitude", coordinates.coords.latitude);
                      setValue("longitude", coordinates.coords.longitude);
                    });
                  }}
                ></Button>
              </span>
              <p className="text-red-500">
                {errors?.latitude?.message} <br /> {errors?.longitude?.message}
              </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
              <span className="text-xl font-semibold">Attendace Radius : </span>
              <InputCon
                controller={{
                  name: "attendance_radius",
                  control: control,
                  rules: {
                    required:
                      "Please enter radius of attendance within which employee is allowed to attend in meters",
                    max: 100,
                    min: 10,
                  },
                }}
                input={{
                  disabled: !data,
                  // defaultValue: getValues("attendance_radius"),
                  size: "lg",
                  variant: "faded",
                  isRequired: true,
                  color: "secondary",
                  endContent: "METERS",
                  type: "text",
                  name: "attendance_radius",
                  "aria-label": "attendance_radius",
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500">
                {errors?.attendance_radius?.message}
              </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
              <span className="text-xl font-semibold">Department : </span>
              <Select
                {...register("department_id", {
                  required: "Please select department of the employee",
                })}
                selectedKeys={[data?.department_id]}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    department_id: e.target.value,
                  }));
                }}
                // label={depts
                //   .filter((item) => item._id === data?.department_id)?.[0]
                //   ?.dept_name?.toUpperCase()
                //   .replaceAll("-", " ")}
                // labelPlacement="outside"
                isDisabled={!data}
                variant="faded"
                size="md"
                color="secondary"
                name="department_id"
                aria-label="department_id"
                startContent="🪪"
                aria-labelledby="department_id"
                // isRequired
                className="md:col-start-2 md:col-end-4"
              >
                {depts?.map((item) => {
                  return (
                    <SelectItem key={item._id} value={item._id}>
                      {item.dept_name.toUpperCase().replaceAll("-", " ")}
                    </SelectItem>
                  );
                })}
              </Select>
              <p className="text-red-500"> {errors?.department_id?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
              <span className="text-xl font-semibold">Basic Salary : </span>
              <InputCon
                controller={{
                  name: "basic_salary",
                  control: control,
                  rules: {
                    required: "Please enter first name",
                  },
                }}
                input={{
                  disabled: !data,
                  // defaultValue: getValues("basic_salary"),
                  size: "lg",
                  variant: "faded",
                  isRequired: true,
                  color: "secondary",
                  endContent: "💸",
                  type: "text",
                  name: "basic_salary",
                  "aria-label": "basic_salary",
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500"> {errors?.basic_salary?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
              <span className="text-xl font-semibold">Home Address : </span>
              <Controller
                name={"home_address"}
                control={control}
                rules={{
                  required: "Please fill in the home address",
                }}
                render={({ field }) => (
                  <>
                    <Textarea
                      isDisabled={!data}
                      defaultValue={getValues("home_address")}
                      radius={"sm"}
                      size={"lg"}
                      variant={"faded"}
                      color={"secondary"}
                      name={"home_address"}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        // handleChange(e);
                        // onChanged(e);
                      }}
                      className="md:col-start-2 md:col-end-4"
                    />
                  </>
                )}
              />
              <p className="text-red-500"> {errors?.home_address?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
              <span className="text-xl font-semibold">Bank Name : </span>
              <InputCon
                controller={{
                  name: "bank_name",
                  control: control,
                  rules: {
                    required: "Please enter bank name",
                  },
                }}
                input={{
                  disabled: !data,
                  // defaultValue: getValues("bank_name"),
                  size: "lg",
                  variant: "faded",
                  isRequired: true,
                  color: "secondary",
                  type: "text",
                  name: "bank_name",
                  "aria-label": "bank_name",
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500"> {errors?.bank_name?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
              <span className="text-xl font-semibold">
                Bank Account Number :{" "}
              </span>
              <InputCon
                controller={{
                  name: "bank_acc_no",
                  control: control,
                  rules: {
                    required: "Please enter bank account number",
                    maxLength: {
                      value: 11,
                      message: "Bank Account Number Must be 11 Digit Number",
                    },
                    minLength: {
                      value: 11,
                      message: "Bank Account Number Must be 11 Digit Number",
                    },
                    min: 10000000000,
                    max: 99999999999,
                  },
                }}
                input={{
                  disabled: !data,
                  // defaultValue: getValues("bank_acc_no"),
                  size: "lg",
                  variant: "faded",
                  isRequired: true,
                  color: "secondary",
                  type: "number",
                  name: "bank_acc_no",
                  "aria-label": "bank_acc_no",
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500"> {errors?.bank_acc_no?.message} </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
              <span className="text-xl font-semibold">Bank IFSC Code : </span>
              <InputCon
                controller={{
                  name: "bank_ifsc_code",
                  control: control,
                  rules: {
                    required: "Please enter bank branch IFSC code",
                    maxLength: {
                      value: 11,
                      message: "Bank Branch IFSC Code Must be 11 Digit",
                    },
                    minLength: {
                      value: 11,
                      message: "Bank Branch IFSC Code Must be 11 Digit",
                    },
                  },
                }}
                input={{
                  disabled: !data,
                  // defaultValue: getValues("bank_ifsc_code"),
                  size: "lg",
                  variant: "faded",
                  isRequired: true,
                  color: "secondary",
                  type: "text",
                  name: "bank_ifsc_code",
                  "aria-label": "bank_ifsc_code",
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500">{errors?.bank_ifsc_code?.message}</p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
              <span className="text-xl font-semibold">
                Salary Cut Per Leave Day :{" "}
              </span>
              <InputCon
                controller={{
                  name: "salary_cut_per_day",
                  control: control,
                  rules: {
                    required:
                      "Please enter Amount of salary should cut per day for being absent without leave report",
                    validate: {
                      value: (v) =>
                        v < getValues("basic_salary") ||
                        "Salary Cut Per Leave Can not be More Than Basic Salary",
                    },
                  },
                }}
                input={{
                  disabled: !data,
                  // defaultValue: getValues("salary_cut_per_day"),
                  size: "lg",
                  variant: "faded",
                  isRequired: true,
                  color: "secondary",
                  type: "number",
                  name: "salary_cut_per_day",
                  "aria-label": "salary_cut_per_day",
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500">
                {errors?.salary_cut_per_day?.message}
              </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
              <span className="text-xl font-semibold">
                OverTime Salary Per Hour :
              </span>
              <InputCon
                controller={{
                  name: "ot_salary_per_hour",
                  control: control,
                  rules: {
                    required:
                      "Please enter amount to credit on overtime per hour",
                    validate: (v) =>
                      v < getValues("basic_salary") ||
                      "Over Time Salary Per Hour Can not be More Than Basic Salary",
                  },
                }}
                input={{
                  disabled: !data,
                  // defaultValue: getValues("ot_salary_per_hour"),
                  size: "lg",
                  variant: "faded",
                  isRequired: true,
                  color: "secondary",
                  type: "number",
                  name: "ot_salary_per_hour",
                  "aria-label": "ot_salary_per_hour",
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500">
                {errors?.ot_salary_per_hour?.message}
              </p>
            </span>
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
              <span className="text-xl font-semibold">
                Allowed Leave Per Month :{" "}
              </span>
              <InputCon
                controller={{
                  name: "allowed_leave_per_month",
                  control: control,
                  rules: {
                    required: "Please enter Number of days allowed for leave",
                    max: 28,
                    valueAsNumber: true,
                  },
                }}
                input={{
                  disabled: !data,
                  // defaultValue: getValues("allowed_leave_per_month"),
                  size: "lg",
                  variant: "faded",
                  isRequired: true,
                  color: "secondary",
                  type: "text",
                  name: "allowed_leave_per_month",
                  "aria-label": "allowed_leave_per_month",
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500">
                {" "}
                {errors?.allowed_leave_per_month?.message}{" "}
              </p>
            </span>
            <span>
              <Button
                size="md"
                color="secondary"
                variant="shadow"
                type="submit"
                endContent={<BsFillPersonCheckFill className="scale-125" />}
                aria-label="submit"
                isDisabled={!data}
                isLoading={loading}
              >
                UPDATE EMPLOYEE
              </Button>
              &nbsp; &nbsp; &nbsp;
              <Button
                isLoading={loading}
                isDisabled={!data}
                size="md"
                color="secondary"
                variant="shadow"
                type="reset"
                endContent={<GrPowerReset className="scale-125" />}
                aria-label="submit"
                onClick={() => {
                  data.latitude = data.attendance_coordinates.latitude;
                  data.longitude = data.attendance_coordinates.longitude;
                  reset(data);
                }}
              >
                RESET DETAILS
              </Button>
              &nbsp; &nbsp; &nbsp;
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
          </form>
        </div>
      </div>

      {/* resign employee modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                const formdata = new FormData(e.target);
                formdata.append("updated_by", session?.user?._id);
                const res = await resignEmployee(formdata);
                // console.log(res);
                if (res.success) {
                  onClose();
                  route.push("/managers/hr/manage_employee");
                }
              }}
            >
              <ModalHeader className="flex flex-col gap-1">
                CONFIRM RESIGNATION
              </ModalHeader>
              <ModalBody>
                <p>PLEASE ENTER REASON TO RESIGN EMPLOYEE :</p>
                <Textarea
                  name="reason_for_resign"
                  variant="faded"
                  color="secondary"
                  size="lg"
                  isRequired
                  aria-label="reason_for_resign"
                  aria-labelledby="reason_for_resign"
                />
                <input
                  label="employee"
                  name="id"
                  value={id}
                  type="text"
                  hidden
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  type="reset"
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  CANCEL
                </Button>
                <Button type="submit" color="secondary" isLoading={false}>
                  CONFIRM
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Page;
