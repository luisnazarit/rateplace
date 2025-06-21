import { auth } from "@/auth";
import ProfileForm from "./ProfileForm";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {

  const session = await auth();
  const user = await prisma?.user.findUnique({
    where: {
      email: session?.user?.email
    },
  })

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-6">Mis Datos</h3>
        <ProfileForm user={user} />
      </div>
    </div>
  );
}
