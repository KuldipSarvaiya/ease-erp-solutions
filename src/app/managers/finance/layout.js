import DashBoardNavBar from "@/components/DashBoardNavBar";
import SideBar from "@/components/SideBar";

export const metadata = {
  title: "finance manager's Dashboard",
  description: "Dashboard for finance manager for managing finance related activities",
};

export default function FinanceLayout({ children }) {
  const menuItems = [
    "tasks",
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
      <main className="md:pl-[241px] overflow-auto relative">{children}</main>
    </section>
  );
}
