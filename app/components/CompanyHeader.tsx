import { auth } from "@/auth";
import LogOut from "../../components/LogOut";
import { Bell } from "lucide-react";

export default async function CompanyHeader() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="border-b border-gray-800">
      <pre>{JSON.stringify(session)}</pre>
      <div className="flex items-center justify-end h-16 px-4">
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Bell className="w-6 h-6" />
          </button>
          {user && (
            <div className="flex items-center space-x-3">
              {typeof (user as any)?.image === "string" &&
              (user as any)?.image ? (
                <img
                  src={(user as any).image}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-600">
                  {user.name ? user.name[0] : "?"}
                </div>
              )}
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
