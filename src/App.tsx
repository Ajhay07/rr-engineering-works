import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { PortalRoutes } from "@/routes/PortalRoutes";

/**
 * Application shell.
 *
 * - `/`               → public marketing home page (single scroll page).
 * - `/client-portal/*` → authenticated Client Portal (see PortalRoutes).
 * - anything else      → fall back to home.
 */
export default function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/client-portal/*" element={<PortalRoutes />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

