import Sidebar from "../components/Sidebar";
import CompanyHeader from "../components/CompanyHeader";

export default async function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Sidebar />

      {/* Main Content */}
      <div className="lg:ml-64">
        <CompanyHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
