import AdminSidebar from '@/components/AdminSidebar';
import AdminFooter from '@/components/AdminFooter';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <main className="admin-page-content">
          {children}
        </main>
        <AdminFooter />
      </div>
    </div>
  );
}
