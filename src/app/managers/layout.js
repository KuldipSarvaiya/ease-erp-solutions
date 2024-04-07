import ChatModel from "@/components/ChatModel";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "ERP Managere Dashboard",
  description:
    "Dashboard for mamagers for managing all the flow of work and activities",
};

export default async function ManagersLayout({ children }) {
  const session = await getServerSession(options);

  // if (
  //   !session?.user?.designation ||
  //   session?.user?.designation === "Employee"
  // ) {
  //   redirect("/api/auth/signin?callbackUrl=/");
  // }

  return (
    <>
      <ChatModel />
      {children}
    </>
  );
}
