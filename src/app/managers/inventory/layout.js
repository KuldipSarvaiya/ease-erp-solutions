import DashBoardNavBar from "@/components/DashBoardNavBar";
import SideBar from "@/components/SideBar";

export const metadata = {
  title: "inventory manager's Dashboard",
  description:
    "Dashboard for inventory manager for managing inventory related activities",
};

export default function InventoryLayout({ children }) {
  const menuItems = [
    "tasks",
    "assign_task",
    "product",
    "product_stock",
    "raw_material",
    "raw_material_stock",
    "orders",
    "crm",
    // "reports",
  ];
  return (
    <section>
      <DashBoardNavBar menuItems={menuItems} />
      <div className="hidden md:block">
        <SideBar mainPath="/managers/inventory/" menuItems={menuItems} />
      </div>
      <div className="md:pl-[241px] relative pt-16">{children}</div>
    </section>
  );
}
