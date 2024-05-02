import DashBoardNavBar from "@/components/DashBoardNavBar";
import SideBar from "@/components/SideBar";

export const metadata = {
  title: "General Department manager's Dashboard",
  description:
    "Dashboard for general department manager for managing departmental work flow",
};

export default async function GenManagerLayout({ children }) {
  const menuItems = [
    "tasks",
    "assign_task",
    "employees",
    "raw_material",
    "used_stock",
    "produced_stock",
    // "reports",
  ];

  return (
    <section>
      <DashBoardNavBar
        mainPath="/managers/general_manager/"
        menuItems={menuItems}
      />
      <div className="hidden md:block">
        <SideBar mainPath="/managers/general_manager/" menuItems={menuItems} />
      </div>
      <div className="md:pl-[241px]  relative pt-16">{children}</div>
    </section>
  );
}
