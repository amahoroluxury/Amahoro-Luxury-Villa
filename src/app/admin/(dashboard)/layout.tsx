import AdminSidebar from '@/components/AdminSidebar';
import AdminFooter from '@/components/AdminFooter';
import AdminHeader from '@/components/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />
        <main className="admin-page-content">
          {children}
        </main>
        <AdminFooter />
      </div>
    </div>
  );
}
