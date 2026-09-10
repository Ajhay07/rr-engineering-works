import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

/**
 * Layout-route guard.
 *
 * Centralised authentication check for every protected portal route. When
 * Supabase Auth replaces the mock layer, this component stays the same — it
 * only depends on `useAuth()`, which will read the Supabase session instead.
 */
export function AuthGuard() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f141f]">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/client-portal/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <Outlet />;
}
