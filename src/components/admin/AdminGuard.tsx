
import { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminGuard } from "@/hooks/useAdminGuard";

interface AdminGuardProps {
  children: ReactNode;
}

const AdminGuard: FC<AdminGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isLoading, isAdmin, isAuthenticated } = useAdminGuard();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate("/auth");
      } else if (!isAdmin) {
        navigate("/");
      }
    }
  }, [isLoading, isAdmin, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return <>{children}</>;
};

export default AdminGuard;
