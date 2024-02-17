import ChatModel from "@/components/ChatModel";
import DashBoardNavBar from "@/components/DashBoardNavBar";
import SideBar from "@/components/SideBar";

export const metadata = {
  title: "Human Resource manager's Dashboard",
  description:
    "Dashboard for human resource manager for managing employees and behavior",
};

export default function HrLayout({ children }) {
  const menuItems = [
    "tasks",
    "employees",
    "attendance",
    "leave_report",
    "holiday",
    "manage_employee",
    "event",
    "reports",
  ];
  return (
    <section>
      <DashBoardNavBar menuItems={menuItems} />
      <div className="hidden md:block">
        <SideBar mainPath="/managers/hr/" menuItems={menuItems} />
      </div>
      <div className="md:pl-[241px]  relative pt-16">{children}</div>
      <ChatModel />
    </section>
  );
}
