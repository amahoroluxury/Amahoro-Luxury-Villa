import AdminSidebar from '@/components/AdminSidebar';
import AdminFooter from '@/components/AdminFooter';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', background: '#fdfcfb' }}>
      <AdminSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <AdminFooter />
      </div>
    </div>
  );
}
