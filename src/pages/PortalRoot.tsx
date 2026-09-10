import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

/**
 * `/client-portal` — entry point that sends an already-authenticated user to
 * their dashboard, otherwise to the login page. Session state is read from the
 * auth context (currently mock/localStorage, later Supabase).
 */
export function PortalRoot() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f141f]">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/client-portal/dashboard" replace />;
  }
  return <Navigate to="/client-portal/login" replace />;
}
