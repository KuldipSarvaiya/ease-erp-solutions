import DashBoardNavBar from "@/components/DashBoardNavBar";
import SideBar from "@/components/SideBar";

export const metadata = {
  title: "General Department manager's Dashboard",
  description:
    "Dashboard for general department manager for managing departmental work flow",
};

export default function GenManagerLayout({ children }) {
  const menuItems = [
    "tasks",
    "assign_task",
    "employees",
    "raw_material",
    "used_stock",
    "produced_stock",
    "send_notice",
    "reports",
  ];
  return (
    <section>
      <DashBoardNavBar menuItems={menuItems} />
      <div className="hidden md:block">
        <SideBar mainPath="/managers/general_manager/" menuItems={menuItems} />
      </div>
      <div className="md:pl-[241px]">{children}</div>
    </section>
  );
}