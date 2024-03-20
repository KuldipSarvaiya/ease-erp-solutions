"use client";

import InputCon from "@/components/InputCon";
import { newEmployee } from "@/lib/utils/server_actions/hr";
import {
  Avatar,
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { BsPersonFillAdd } from "react-icons/bs";
import { GrMapLocation, GrPowerReset } from "react-icons/gr";

function Page({ params: { id } }) {
  const {
    register,
    reset,
    setValue,
    control,
    setError,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "kuldip",
      middle_name: "kishorbhai",
      last_name: "sarvaiya",
      image: "kd.png",
      username: "username",
      password: "password",
      email: "kuldipsarvaiya95@gmail.com",
      contact_no: "1234567890",
      designation: "Manager",
      expert_area: "code",
      course_studied: "bca",
      latitude: 34.234,
      longitude: 43.2232,
      attendance_radius: 11,
      department_id: 3,
      basic_salary: 12345,
      home_address: "home is mine",
      bank_name: "sbi",
      bank_acc_no: 12345678909,
      bank_ifsc_code: 12345678901,
      salary_cut_per_day: 3,
      ot_salary_per_hour: 2,
      allowed_leave_per_month: 1,
    },
  });

  async function handelAction(formdata) {
    const res = await newEmployee(formdata);
    if (res) return reset();
    res.forEach((item) => {
      setError(item.field, { message: item.message });
    });
  }

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        <p className="uppercase text-2xl max-md:text-lg tracking-wider font-bold mb-5">
          update emplyee : {id}
        </p>
        <Divider className="my-5" />
        <form
          action={handelAction}
          noValidate={false}
          className="flex flex-col flex-nowrap gap-5 md:flex-nowrap"
        >
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">First Name : </span>
            <Input
              {...register("first_name", {
                required: "Please enter first name",
              })}
              defaultValue={getValues("first_name")}
              variant="faded"
              size="sm"
              color="secondary"
              type="text"
              name="first_name"
              aria-label="first_name"
              aria-labelledby="first_name"
              // isRequired
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.first_name?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Middle Name : </span>
            <Input
              {...register("middle_name", {
                required: "Please enter middle name",
              })}
              defaultValue={getValues("middle_name")}
              variant="faded"
              size="sm"
              color="secondary"
              type="text"
              name="middle_name"
              aria-label="middle_name"
              aria-labelledby="middle_name"
              // isRequired
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.middle_name?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Last Name : </span>
            <Input
              {...register("last_name", {
                required: "Please enter Last name",
              })}
              defaultValue={getValues("last_name")}
              variant="faded"
              size="sm"
              color="secondary"
              type="text"
              name="last_name"
              aria-label="last_name"
              aria-labelledby="last_name"
              // isRequired
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.last_name?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Profile Image : </span>
            <Input
              {...register("image", {
                required: "Please Select a Profile Image",
                validate: (v) =>
                  v[0].size < 500 * 1024 || "Imgae Size is Large, max 500kb",
              })} 
              startContent={<Avatar size="sm" src={getValues("image")} />}
              variant="faded"
              size="sm"
              color="secondary"
              type="file"
              multiple={false}
              accept=".png, .jpg, .jpeg"
              name="image"
              aria-label="image"
              aria-labelledby="image"
              // isRequired
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.image?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Username : </span>
            <Input
              {...register("username", {
                required: "Please enter username",
                pattern: {
                  value: /[a-zA-Z0-9]{8,}/,
                  message:
                    "Please use a valid alphanumeric username > 8 characters",
                },
              })}
              defaultValue={getValues("username")}
              startContent="@"
              variant="faded"
              size="sm"
              color="secondary"
              type="text"
              name="username"
              aria-label="username"
              aria-labelledby="username"
              // isRequired
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.username?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Password : </span>
            <Input
              {...register("password", {
                required: "Please enter password",
                pattern: {
                  value: /[a-zA-Z0-9]{8,}/,
                  message:
                    "Please use a valid alphanumeric password > 8 characters",
                },
              })}
              defaultValue={getValues("password")}
              startContent="#"
              variant="faded"
              size="sm"
              color="secondary"
              type="password"
              name="password"
              aria-label="password"
              aria-labelledby="password"
              // isRequired
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.password?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Email : </span>
            <Input
              {...register("email", {
                required: "Please enter email address",
              })}
              defaultValue={getValues("email")}
              variant="faded"
              size="sm"
              color="secondary"
              type="mail"
              name="email"
              aria-label="email"
              aria-labelledby="email"
              // isRequired
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.email?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Contact : </span>
            <Input
              {...register("contact_no", {
                required: "Please enter contact Number of employee",
                max: {
                  value: 9999999999,
                  message: "Please enter valid 10 digit contact Number ",
                },
                min: {
                  value: 100000000,
                  message: "Please enter valid 10 digit contact Number ",
                },
              })}
              defaultValue={getValues("contact_no")}
              startContent="+91"
              variant="faded"
              size="sm"
              color="secondary"
              type="tel"
              name="contact_no"
              aria-label="contact_no"
              aria-labelledby="contact_no"
              // isRequired
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.contact_no?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Designation : </span>
            <div className="flex gap-5">
              <Input
                {...register("designation", {
                  required: "Please Select Gender",
                })}
                defaultChecked={getValues("designation") === "Employee"}
                variant="faded"
                size="sm"
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
                size="sm"
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
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Expert Area : </span>
            <Input
              {...register("expert_area", {
                required: "Please fill in the expertiese part of job",
              })}
              defaultValue={getValues("expert_area")}
              variant="faded"
              size="sm"
              color="secondary"
              type="text"
              name="expert_area"
              aria-label="expert_area"
              aria-labelledby="expert_area"
              // isRequired
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.expert_area?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Course Studied : </span>
            <Input
              {...register("course_studied", {
                required:
                  "Please enter detail about course studied by employee",
              })}
              defaultValue={getValues("course_studied")}
              variant="faded"
              size="sm"
              endContent="🎓"
              color="secondary"
              type="text"
              name="course_studied"
              aria-label="course_studied"
              aria-labelledby="course_studied"
              // isRequired
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.course_studied?.message} </p>
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
            <Input
              {...register("attendance_radius", {
                required:
                  "Please enter radius of attendance within which employee is allowed to attend in meters",
                max: 100,
                min: 10,
              })}
              defaultValue={getValues("attendance_radius")}
              variant="faded"
              size="sm"
              color="secondary"
              type="number"
              name="attendance_radius"
              aria-label="attendance_radius"
              aria-labelledby="attendance_radius"
              endContent="METERS"
              // isRequired
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500">
              {" "}
              {errors?.attendance_radius?.message}{" "}
            </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Department : </span>
            <Select
              {...register("department_id", {
                required: "Please select department of the employee",
              })}
              aria-selected={getValues("department_id")}
              variant="faded"
              size="sm"
              color="secondary"
              name="department_id"
              aria-label="department_id"
              startContent="🪪"
              aria-labelledby="department_id"
              // isRequired
              className="md:col-start-2 md:col-end-4"
            >
              {[
                "hr",
                "finance",
                "inventory",
                "fabric manufacturing",
                "cleaning and finishing",
                "dying and printing",
                "cutting",
                "sewing",
                "packing and labeling",
              ].map((item, i) => {
                return (
                  <SelectItem key={i} value={+i}>
                    {item.toUpperCase()}
                  </SelectItem>
                );
              })}
            </Select>
            <p className="text-red-500"> {errors?.department_id?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Basic Salary : </span>
            <Input
              {...register("basic_salary", {
                required: "Please enter basic salary of employee",
                min: 1,
              })}
              defaultValue={getValues("basic_salary")}
              variant="faded"
              endContent="💸"
              size="sm"
              color="secondary"
              type="number"
              name="basic_salary"
              aria-label="basic_salary"
              aria-labelledby="basic_salary"
              // isRequired
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.basic_salary?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Home Address : </span>
            <Textarea
              {...register("home_address", {
                required: "Please fill in the home address",
              })}
              defaultValue={getValues("home_address")}
              variant="faded"
              endContent="📌"
              size="sm"
              color="secondary"
              name="home_address"
              aria-label="home_address"
              aria-labelledby="home_address"
              // isRequired
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.home_address?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Bank Name : </span>
            <Input
              {...register("bank_name", {
                required: "Please enter bank name",
              })}
              defaultValue={getValues("bank_name")}
              variant="faded"
              size="sm"
              color="secondary"
              type="text"
              name="bank_name"
              aria-label="bank_name"
              aria-labelledby="bank_name"
              // isRequired
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.bank_name?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">
              Bank Account Number :{" "}
            </span>
            <Input
              {...register("bank_acc_no", {
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
              })}
              defaultValue={getValues("bank_acc_no")}
              variant="faded"
              size="sm"
              color="secondary"
              type="number"
              name="bank_acc_no"
              aria-label="bank_acc_no"
              aria-labelledby="bank_acc_no"
              // isRequired
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.bank_acc_no?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Bank IFSC Code : </span>
            <Input
              {...register("bank_ifsc_code", {
                required: "Please enter bank branch IFSC code",
                maxLength: {
                  value: 11,
                  message: "Bank Branch IFSC Code Must be 11 Digit",
                },
                minLength: {
                  value: 11,
                  message: "Bank Branch IFSC Code Must be 11 Digit",
                },
              })}
              defaultValue={getValues("bank_ifsc_code")}
              variant="faded"
              size="sm"
              color="secondary"
              type="text"
              name="bank_ifsc_code"
              aria-label="bank_ifsc_code"
              aria-labelledby="bank_ifsc_code"
              // isRequired
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.bank_ifsc_code?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">
              Salary Cut Per Leave Day :{" "}
            </span>
            <Input
              {...register("salary_cut_per_day", {
                required:
                  "Please enter Amount of salary should cut per day for being absent without leave report",
                validate: {
                  value: (v) =>
                    v < getValues("basic_salary") ||
                    "Salary Cut Per Leave Can not be More Than Basic Salary",
                },
              })}
              defaultValue={getValues("salary_cut_per_day")}
              variant="faded"
              size="sm"
              color="secondary"
              type="number"
              name="salary_cut_per_day"
              aria-label="salary_cut_per_day"
              aria-labelledby="salary_cut_per_day"
              // isRequired
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500">
              {" "}
              {errors?.salary_cut_per_day?.message}{" "}
            </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">
              OverTime Salary Per Hour :{" "}
            </span>
            <Input
              {...register("ot_salary_per_hour", {
                required: "Please enter amount to credit on overtime per hour",
                validate: (v) =>
                  v < getValues("basic_salary") ||
                  "Over Time Salary Per Hour Can not be More Than Basic Salary",
              })}
              defaultValue={getValues("ot_salary_per_hour")}
              variant="faded"
              size="sm"
              color="secondary"
              type="number"
              name="ot_salary_per_hour"
              aria-label="ot_salary_per_hour"
              aria-labelledby="ot_salary_per_hour"
              // isRequired
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500">
              {" "}
              {errors?.ot_salary_per_hour?.message}{" "}
            </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">
              Allowed Leave Per Month :{" "}
            </span>
            <Input
              {...register("allowed_leave_per_month", {
                required: "Please enter Number of days allowed for leave",
                max: 25,
                valueAsNumber: true,
              })}
              defaultValue={getValues("allowed_leave_per_month")}
              variant="faded"
              size="sm"
              color="secondary"
              type="number"
              name="allowed_leave_per_month"
              aria-label="allowed_leave_per_month"
              aria-labelledby="allowed_leave_per_month"
              // isRequired
              className="md:col-start-2 md:col-end-4"
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
              endContent={<BsPersonFillAdd className="scale-125" />}
              aria-label="submit"
            >
              CREATE EMPLOYEE
            </Button>
            &nbsp; &nbsp; &nbsp;
            <Button
              size="md"
              color="secondary"
              variant="shadow"
              type="reset"
              endContent={<GrPowerReset className="scale-125" />}
              aria-label="submit"
            >
              RESET DETAILS
            </Button>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Page;
