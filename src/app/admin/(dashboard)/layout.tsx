import AdminSidebar from '@/components/AdminSidebar';
import AdminFooter from '@/components/AdminFooter';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout flex min-h-screen bg-[#fdfcfb]">
      <AdminSidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <main className="flex-1">
          {children}
        </main>
        <AdminFooter />
      </div>
    </div>
  );
}
