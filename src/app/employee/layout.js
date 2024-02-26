import DashBoardNavBar from "@/components/DashBoardNavBar";
import SideBar from "@/components/SideBar";

export const metadata = {
  title: "Employee's Dashboard",
  description: "Dashboard for Employees for thier tasks and details",
};

export default function EmployeeLayout({ children }) {
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
      <DashBoardNavBar menuItems={menuItems} />
      <div className="hidden md:block">
        <SideBar mainPath={"/employee/"} menuItems={menuItems} />
      </div>
      <main className="md:pl-[241px] pt-16">{children}</main>
    </section>
  );
}
