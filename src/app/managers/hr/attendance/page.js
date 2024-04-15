"use client";

import AttendanceChip from "@/components/cards/AttendanceChip";
import { Accordion, AccordionItem, Divider } from "@nextui-org/react";
// bar chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Page() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/managers/hr/attendance");
    },
  });
  const [data, setData] = useState([]);
  useEffect(() => {
    if (data.length === 0) {
      (async () => {
        const res = await fetch(
          "/api/employee/attendance?job=allEmpGroupDept&_id=no-way",
          { method: "GET", next: { tags: "allEmployeeAttendance" } }
        );

        if (!res.ok)
          return alert("Can Not Get Employee Details Due To Network Error");

        const json = await res.json();
        // console.log(json);
        setData(json);
      })();
    }
  }, []);

  // chart ////////////////////////////////////////////////
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Attendnace Status of Employees of Each Department",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        label: "Departments",
      },
      y: {
        stacked: true,
        label: "Total Employees In Each Department",
      },
    },
  };

  const labels = [
    "hr",
    "finance",
    "inventory",
    "fabri-manufacturing",
    "cleaning-and-finishing",
    "dying-and-printing",
    "cutting",
    "sewing",
    "packing-and-labeling",
  ];
  const chart_data = {
    labels,
    datasets: [
      {
        label: "Present",
        data: [23, 12, 24, 24, 43, 34, 34, 43, 34],
        backgroundColor: "#10b981",
      },
      {
        label: "Onleave",
        data: [22, 32, 43, 32, 53, 34, 24, 43, 34],
        backgroundColor: "#ef4444",
      },
      {
        label: "Pending",
        data: [24, 22, 22, 23, 21, 22, 24, 23, 33],
        backgroundColor: "#eab308",
      },
      {
        label: "Absent",
        data: [43, 12, 22, 24, 11, 22, 24, 23, 34],
        backgroundColor: "#cbd5e1",
      },
    ],
  };
  /////////////////////////////////////////////////////////

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <p className="text-2xl font-bold tracking-wide w-full">
          MANAGE ATTENDANCE
        </p>
        <Divider className="my-5" />

        {/* employess group by departments */}
        {data.length === 0 ? (
          <div className="flex flex-row items-center justify-center gap-5">
            <span className="duration-75 animate-spinner-ease-spin">
              <AiOutlineLoading3Quarters />
            </span>
            Employee Attendance Details Are Retriving
          </div>
        ) : (
          <Accordion
            className="grid  grid-cols-1 row-auto gap-5"
            variant="splitted"
          >
            {data?.map((dept) => {
              return (
                <AccordionItem
                  title={
                    <p className="text-lg font-bold tracking-wide w-full uppercase">
                      {dept?.dept_name?.replaceAll("-", " ")}
                    </p>
                  }
                  key={dept?._id + "asjk23hegb"}
                  aria-label={dept?.dept_name}
                >
                  <Divider className="my-5" />
                  {/* person attendance chips */}
                  <div className="flex flex-wrap flex-row justify-start gap-3 max-md:justify-center">
                    {dept?.employees?.map((emp, i) => (
                      <AttendanceChip
                        key={emp?._id + "asjk23hegb" + i}
                        session={session}
                        emp={emp}
                        status={emp?.attendance?.state || "absent"}
                      />
                    ))}
                  </div>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </div>

      {/* chart */}
      <div className="border-4 rounded-3xl mx-10 mt-10 mb-7 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <Bar options={options} data={chart_data} />
      </div>
    </div>
  );
}
