import { Navigate, Route, Routes } from "react-router-dom";
import { PortalRoot } from "@/pages/PortalRoot";
import { PortalLogin } from "@/pages/PortalLogin";
import { PortalDashboard } from "@/pages/PortalDashboard";
import { PortalRFQDetail } from "@/pages/PortalRFQDetail";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { AuthGuard } from "@/components/portal/AuthGuard";

/**
 * All `/client-portal/*` routes. Kept in its own file so the public site
 * (`src/App.tsx`) and the portal stay logically separated.
 */
export function PortalRoutes() {
  return (
    <Routes>
      <Route index element={<PortalRoot />} />
      <Route path="login" element={<PortalLogin />} />
      {/* Protected routes share one layout + auth guard. */}
      <Route element={<AuthGuard />}>
        <Route element={<PortalLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<PortalDashboard />} />
          <Route path="rfqs/:id" element={<PortalRFQDetail />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/client-portal" replace />} />
    </Routes>
  );
}
