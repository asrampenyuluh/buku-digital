import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function AdminRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="font-body-sm text-body-sm text-on-surface-variant">Memuat...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

export default AdminRoute;
