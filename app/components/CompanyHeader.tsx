import { auth } from "@/auth";
import LogOut from "../../components/LogOut";
import { Bell } from "lucide-react";
import { Avatar } from "@/components/commons/ui/Avatar";

export default async function CompanyHeader() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="border-b border-gray-800">
      <div className="flex items-center justify-end h-16 px-4">
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Bell className="w-6 h-6" />
          </button>
          {user && (
            <div className="flex items-center space-x-3">
              <Avatar name={user.name} src={user.image || ""} />
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-gray-500">{user.email}</span>
              </div>
              <LogOut />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
