"use client";

import InputCon from "@/components/InputCon";
import {
  Avatar,
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Snippet,
  Textarea,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsPersonFillAdd } from "react-icons/bs";
import { GrMapLocation, GrPowerReset } from "react-icons/gr";

function Page() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(
        "/api/auth/signin?callback_url=/managers/hr/manage_employee/new"
      );
    },
  });
  const {
    register,
    reset,
    setValue,
    control,
    setError,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [depts, setDepts] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
    const formData = new FormData();

    for (const key in formdata) {
      if (key === "image") formData.append(key, formdata[key][0]);
      else formData.append(key, formdata[key]);
    }
    formData.append("updated_by", session?.user?._id);

    try {
      const res = await fetch("/api/hr/employee", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setSuccess("Employee Has Been Registered Successfully");
        reset();
        setTimeout(() => setSuccess(false), [5000]);
      } else {
        setSuccess("Failed To Registere Employee");
        setTimeout(() => setSuccess(false), [5000]);

        const json = await res.json();
        // console.log(json);
        [json].forEach((item) => {
          reset({ [item.field]: "" });
          setError(item.field, { message: item.message });
        });
      }
    } catch (error) {
      // console.log(error);
    }
    setLoading(false);
  }

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        <p className="uppercase text-2xl max-md:text-lg tracking-wider font-bold mb-5">
          Add new emplyee
        </p>
        <Divider className="my-5" />
        <form
          onSubmit={handleSubmit(handelAction)}
          // noValidate={false}
          className="flex flex-col flex-nowrap gap-5 md:flex-nowrap"
        >
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">First Name : </span>
            <Input
              {...register("first_name", {
                required: "Please enter first name",
              })}
              variant="faded"
              size="md"
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
              variant="faded"
              size="md"
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
              variant="faded"
              size="md"
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
              startContent={
                <Avatar
                  size="md"
                  src={
                    getValues("image")?.[0]
                      ? URL.createObjectURL(getValues("image")[0])
                      : null
                  }
                />
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
            />
            <p className="text-red-500"> {errors?.image?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Username : </span>
            <Input
              {...register("username", {
                required: "Please enter username",
                pattern: {
                  value: /[a-zA-Z0-9_]{8,}/,
                  message: "Please use A-Z, a-z, 0-9, 8+ characters",
                },
              })}
              startContent="@"
              variant="faded"
              size="md"
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
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                  // value: /[a-zA-Z0-9]{8,}/,
                  message:
                    "Please use a valid alphanumeric password > 8 characters",
                },
              })}
              startContent="#"
              variant="faded"
              size="md"
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
            <span className="text-xl font-semibold">Date Of Birth : </span>
            <Input
              {...register("dob", {
                required: "Please select a date of birth",
                validate: (v) =>
                  new Date().getFullYear() - new Date(v).getFullYear() >= 18 ||
                  "This person is not allowed to work as per GOV rules",
              })}
              variant="faded"
              size="md"
              color="secondary"
              type="date"
              name="dob"
              aria-label="dob"
              aria-labelledby="dob"
              // isRequired
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.dob?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Email : </span>
            <Input
              {...register("email", {
                required: "Please enter email address",
              })}
              variant="faded"
              size="md"
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
              startContent="+91"
              variant="faded"
              size="md"
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
            <span className="text-xl font-semibold">Gender : </span>
            <div className="flex gap-5">
              <Input
                {...register("gender", {
                  required: "Please Select Gender",
                })}
                variant="faded"
                size="md"
                color="secondary"
                type="radio"
                // label="Male"
                // labelPlacement="outside-left"
                value={"male"}
                name="gender"
                endContent="&nbsp;&nbsp;♂️&nbsp;&nbsp;MALE"
                aria-label="gender"
                aria-labelledby="gender"
                // isRequired
                className="md:col-start-2 md:col-end-4"
              />
              <Input
                {...register("gender", {
                  required: "Please Select Gender",
                })}
                variant="faded"
                endContent="&nbsp;&nbsp;♀️&nbsp;&nbsp;FEMALE"
                size="md"
                color="secondary"
                type="radio"
                // label="Female"
                // labelPlacement="outside-left"
                value={"female"}
                name="gender"
                aria-label="gender"
                aria-labelledby="gender"
                // isRequired
                className="md:col-start-2 md:col-end-4"
              />
            </div>
            <p className="text-red-500"> {errors?.gender?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Designation : </span>
            <div className="flex gap-5">
              <Input
                {...register("designation", {
                  required: "Please Select Employee Designation",
                })}
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
                  required: "Please Select Employee Designation",
                })}
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
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">
              Previous Experience :{" "}
            </span>
            <Input
              {...register("prev_experience", {
                required: "Please fill in the previous experience",
              })}
              variant="faded"
              size="md"
              endContent="Months"
              color="secondary"
              type="text"
              name="prev_experience"
              aria-label="prev_experience"
              aria-labelledby="prev_experience"
              // isRequired
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.prev_experience?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Expert Area : </span>
            <Input
              {...register("expert_area", {
                required: "Please fill in the expertiese part of job",
              })}
              variant="faded"
              size="md"
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
              variant="faded"
              size="md"
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
              variant="faded"
              size="md"
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
              {depts?.map((item, i) => {
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
            <Input
              {...register("basic_salary", {
                required: "Please enter basic salary of employee",
                min: 1,
              })}
              variant="faded"
              endContent="💸"
              size="md"
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
              variant="faded"
              endContent="📌"
              size="md"
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
              variant="faded"
              size="md"
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
              variant="faded"
              size="md"
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
              variant="faded"
              size="md"
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
                    +v < +getValues("basic_salary") ||
                    "Salary Cut Per Leave Can not be More Than Basic Salary",
                },
              })}
              variant="faded"
              size="md"
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
                  +v < +getValues("basic_salary") ||
                  "Over Time Salary Per Hour Can not be More Than Basic Salary",
              })}
              variant="faded"
              size="md"
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
              variant="faded"
              size="md"
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
              isLoading={loading}
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
              isDisabled={loading}
            >
              RESET DETAILS
            </Button>
            &nbsp; &nbsp; &nbsp;
            {success !== false && (
              <Snippet
                color={success.includes("Successfully") ? "success" : "danger"}
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
  );
}

export default Page;
