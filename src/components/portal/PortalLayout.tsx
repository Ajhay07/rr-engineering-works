import { LogOut, LayoutDashboard } from "lucide-react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { COMPANY } from "@/data/company";
import { cn } from "@/lib/utils";

export function PortalLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/client-portal/login", { replace: true });
  };

  const nav = [
    { label: "Dashboard", to: "/client-portal/dashboard", icon: LayoutDashboard },
  ];

  return (
    <>
      {/* Top navigation bar */}
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-slate-800 bg-[#0f141f] px-4 sm:px-6">
        <Link to="/client-portal/dashboard" className="flex items-center gap-3">
          <img
            src="/brand/raghav-engineering-logo.png"
            alt={COMPANY.name}
            className="h-8 w-auto"
          />
          <span className="font-display font-bold text-lg text-white">
            Client Portal
          </span>
        </Link>

        <nav className="flex items-center gap-1.5 text-sm">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-md px-3 py-1.5 font-medium transition-colors",
                  isActive
                    ? "bg-accent text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={handleLogout}
            className="ml-2 flex items-center gap-2 rounded-md px-3 py-1.5 font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </nav>
      </header>

      {/* Authenticated user summary */}
      <div className="border-b border-slate-800 bg-[#0f141f] px-4 sm:px-6 py-3">
        <div className="text-sm text-slate-300">
          Logged in as{" "}
          <span className="font-semibold text-white">{user?.name}</span>
          <span className="text-slate-500"> / {user?.company}</span>
          <span className="mx-2 text-slate-600">·</span>
          <span className="text-slate-400">{user?.email}</span>
        </div>
      </div>

      <main className="flex-1 bg-[#0f141f]">
        <Outlet />
      </main>
    </>
  );
}

