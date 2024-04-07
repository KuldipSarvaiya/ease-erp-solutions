import AdminNavBoll from "@/components/AdminNavBoll";
import ChatModel from "@/components/ChatModel";
import DashBoardNavBar from "@/components/DashBoardNavBar";
import SideBar from "@/components/SideBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";

export const metadata = {
  title: "ERP Admin Dashboard",
  description:
    "Dashboard for Admin for managing all the flow of work and activities",
};

export default async function AdminLayout({ children }) {
  const session = await getServerSession(options);

  if (session?.user?.designation !== "Admin") {
    redirect("/api/auth/signin?callbackUrl=/");
  }

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
