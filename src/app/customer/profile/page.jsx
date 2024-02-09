import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

async function ProfilePage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Member");
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <h4>{session?.user?.role}</h4>
      <h4>{session?.user?.name}</h4>
      <h4>{session?.user?.email}</h4>
      <h4>{session?.user?.image}</h4>
    </div>
  );
}

export default ProfilePage;
