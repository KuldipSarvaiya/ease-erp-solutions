import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function ProfilePage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/customer/profile");
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <h4>{session?.user?.designation}</h4>
      <h4>{session?.user?.name}</h4>
      <h4>{session?.user?.email}</h4>
      <h4>{session?.user?.picture}</h4>
      <h4>{session?.user?.first_name}</h4>
    </div>
  );
}

export default ProfilePage;
