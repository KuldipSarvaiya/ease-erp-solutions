import DashBoardNavBar from "@/components/DashBoardNavBar";
import SideBar from "@/components/SideBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";

export const metadata = {
  title: "Employee's Dashboard",
  description: "Dashboard for Employees for thier tasks and details",
};

export default async function EmployeeLayout({ children }) {
  const session = await getServerSession(options);

  if (!session?.user?.designation)
    redirect("/api/auth/signin?callbackUrl=/employee");

  const menuItems = [
    "profile",
    "attendance",
    "tasks",
    "details",
    "salary_slip",
    "leave_report",
  ];
  return (
    <section>
      <DashBoardNavBar mainPath={"/employee/"} menuItems={menuItems} />
      <div className="hidden md:block">
        <SideBar mainPath={"/employee/"} menuItems={menuItems} />
      </div>
      <main className="md:pl-[241px] pt-16">{children}</main>
    </section>
  );
}
