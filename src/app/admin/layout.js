import DashBoardNavBar from "@/components/DashBoardNavBar";
import SideBar from "@/components/SideBar";

export const metadata = {
  title: "ERP Admin Dashboard",
  description:
    "Dashboard for Admin for managing all the flow of work and activities",
};

export default function AdminLayout({ children }) {
  const menuItems = [
    "assign_tasks",
    "finance",
    "inventory",
    "manage_employees",
    "manage_managers",
    "send_notice", 
    "reports",
  ];
  return (
    <section>
      <DashBoardNavBar menuItems={menuItems} />
      <div className="hidden md:block">
        <SideBar mainPath="/admin/" menuItems={menuItems} />
      </div>
      <div className="md:pl-[241px]">{children}</div>
    </section>
  );
}
