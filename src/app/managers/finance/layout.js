import ChatModel from "@/components/ChatModel";
import DashBoardNavBar from "@/components/DashBoardNavBar";
import SideBar from "@/components/SideBar";

export const metadata = {
  title: "finance manager's Dashboard",
  description:
    "Dashboard for finance manager for managing finance related activities",
};

export default function FinanceLayout({ children }) {
  const menuItems = [
    "tasks",
    "salary_metadata",
    "payroll",
    "incomes",
    "expenses",
    "revenue",
    "reports",
  ];
  return (
    <section>
      <DashBoardNavBar menuItems={menuItems} />
      <div className="hidden md:block">
        <SideBar mainPath={"/managers/finance/"} menuItems={menuItems} />
      </div>
      <main className="md:pl-[241px]  relative pt-16">{children}</main>
      <ChatModel />
    </section>
  );
}
