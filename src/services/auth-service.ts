/**
 * Mock authentication service.
 *
 * ⚠️ Development / demo only. NOT production secure.
 *
 * The credentials live here and ONLY here, clearly isolated so they can be
 * deleted in one go the moment Supabase Auth is wired up on Monday. On Monday
 * these functions are reimplemented with `@supabase/supabase-js` — the
 * `AuthUser` shape and the function names stay the same, so the UI is untouched.
 */

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  company: string;
  role: "client";
}

/**
 * Demo client account.
 *
 * In the mock layer the password is intentionally not validated — any
 * non-empty password authenticates a known demo account. This is flagged in the
 * UI so nobody mistakes it for real auth. Replace with Supabase Auth on Monday.
 */
const DEMO_CLIENTS: AuthUser[] = [
  {
    id: "client-1",
    email: "client@raghavengineering.com",
    name: "Ramesh Patel",
    company: "Flowline Industries",
    role: "client",
  },
];

const STORAGE_KEY = "rrf_auth_session";

export function getDemoAccounts(): AuthUser[] {
  return [...DEMO_CLIENTS];
}

export async function login(
  email: string,
  _password: string
): Promise<AuthUser> {
  // Simulate a network round-trip so the login loading state is visible.
  await new Promise((resolve) => setTimeout(resolve, 550));

  const user = DEMO_CLIENTS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (!user) {
    throw new Error("Invalid email or password");
  }
  // Demo behaviour: any non-empty password authenticates a known demo account.
  persistSession(user);
  return user;
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getCurrentUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

function persistSession(user: AuthUser): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}
