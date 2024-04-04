import AdminNavBoll from "@/components/AdminNavBoll";
import ChatModel from "@/components/ChatModel";
import DashBoardNavBar from "@/components/DashBoardNavBar";
import SideBar from "@/components/SideBar";

export const metadata = {
  title: "ERP Admin Dashboard",
  description:
    "Dashboard for Admin for managing all the flow of work and activities",
};

export default function AdminLayout({ children }) {
  const menuItems = ["assign_task", "managers", "departments", "reports"];
  return (
    <section>
      <DashBoardNavBar menuItems={menuItems} />
      <div className="hidden md:block">
        <SideBar mainPath="/admin/" menuItems={menuItems} />
      </div>
      <ChatModel />
      <AdminNavBoll />
      <div className="md:pl-[241px] relative pt-16">{children}</div>
    </section>
  );
}
