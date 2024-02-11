import DashBoardNavBar from "@/components/DashBoardNavBar";
import SideBar from "@/components/SideBar";

export const metadata = {
  title: "finance manager's Dashboard",
  description:
    "Dashboard for finance manager for managing finance related activities",
};

export default function InventoryLayout({ children }) {
  const menuItems = [
    "tasks",
    "product",
    "product_stock",
    "raw_material",
    "raw_material_stock",
    "sales",
    "purchases",
    "crm",
    "reports",
  ];
  return (
    <section>
      <DashBoardNavBar menuItems={menuItems} />
      <div className="hidden md:block">
        <SideBar mainPath="/managers/inventory/" menuItems={menuItems} />
      </div>
      <div className="md:pl-[241px]">{children}</div>
    </section>
  );
}
