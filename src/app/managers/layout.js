import AdminNavBoll from "@/components/AdminNavBoll";
import ChatModel from "@/components/ChatModel";

export const metadata = {
  title: "ERP Managere Dashboard",
  description:
    "Dashboard for mamagers for managing all the flow of work and activities",
};

export default function ManagersLayout({ children }) {
  return (
    <>
      <AdminNavBoll />
      <ChatModel />
      {children}
    </>
  );
}
