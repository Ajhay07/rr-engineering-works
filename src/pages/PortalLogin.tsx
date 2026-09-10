import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getDemoAccounts } from "@/services/auth-service";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/data/company";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function PortalLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [touched, setTouched] = useState(false);

  const demoAccount = getDemoAccounts()[0];
  const emailInvalid = touched && email.trim() !== "" && !EMAIL_REGEX.test(email.trim());
  const emailRequired = touched && email.trim() === "";

  const from =
    (location.state as { from?: string })?.from ?? "/client-portal/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setServerError("");
    if (email.trim() === "" || !EMAIL_REGEX.test(email.trim())) return;

    setSubmitting(true);
    try {
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f141f] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img src="/brand/raghav-engineering-logo.png" alt={COMPANY.name} className="mx-auto h-14 w-auto" />
          <p className="mt-3 font-display text-2xl font-bold text-white">Client Portal</p>
          <p className="mt-1 text-xs text-slate-400">
            Raghav Engineering — secure client access
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-slate-800 bg-[#111820] p-8 shadow-soft"
          noValidate
        >
          <h2 className="font-display text-xl font-semibold text-white mb-1">
            Sign in to your account
          </h2>
          <p className="mb-6 text-sm text-slate-400">
            Enter your credentials to view submitted RFQs and status updates.
          </p>

          {serverError && <Alert variant="error" className="mb-5">{serverError}</Alert>}

          <div className="mb-4">
            <Input
              label="Email address"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              icon={<Mail className="h-4 w-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              error={emailInvalid ? "Please enter a valid email address" : undefined}
              className={emailRequired ? "border-red-500" : undefined}
            />
            {emailRequired && (
              <p className="mt-1 text-xs text-red-400">Email address is required</p>
            )}
          </div>

          <div className="mb-1">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="• • • • • • • •"
              autoComplete="current-password"
              icon={
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  className="cursor-pointer text-slate-400 hover:text-slate-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={touched && password === "" ? "Password is required" : undefined}
            />
          </div>

          <div className="mt-2 flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className="h-4 w-4 rounded border-slate-600 text-accent focus:ring-accent"
              />
              Show password
            </label>
            <a
              href="#forgot"
              className="text-xs text-slate-400 hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                alert("Password reset is not yet connected. Contact your administrator.");
              }}
            >
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full bg-accent py-6 font-display text-white hover:bg-accent-hover disabled:opacity-70"
          >
            {submitting ? "Signing in…" : (<>
              <LogIn className="mr-2 h-4 w-4" /> Sign in
            </>)}
          </Button>

          <p className="mt-5 text-xs text-slate-500">
            ⚠️ Demo only: mock authentication, not production secure. Replace with
            Supabase Auth on Monday. Account:{" "}
            <span className="font-mono-data text-slate-200">{demoAccount?.email}</span>
          </p>
        </form>
      </div>
    </div>
  );
}
