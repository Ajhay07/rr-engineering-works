import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Search, Filter } from "lucide-react";
import { getRFQs } from "@/services/rfq-service";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { Select } from "@/components/ui/select";
import type { RFQ, RFQStatus } from "@/types/rfq";

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: "All", label: "All statuses" },
  { value: "New", label: "New" },
  { value: "Under Review", label: "Under Review" },
  { value: "Quoted", label: "Quoted" },
  { value: "Completed", label: "Completed" },
  { value: "Rejected", label: "Rejected" },
];

function formatDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function PortalDashboard() {
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRFQs().then((data) => {
      setRfqs(data);
      setLoading(false);
    });
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = {
      total: rfqs.length,
      New: 0,
      "Under Review": 0,
      Quoted: 0,
      Completed: 0,
      Rejected: 0,
    };
    for (const r of rfqs) c[r.status] = (c[r.status] ?? 0) + 1;
    return c;
  }, [rfqs]);

  const filtered = useMemo(() => {
    return rfqs.filter((r) => {
      const matchesStatus =
        statusFilter === "All" || r.status === (statusFilter as RFQStatus);
      const term = search.toLowerCase();
      const matchesSearch =
        !term ||
        r.id.toLowerCase().includes(term) ||
        r.reference.toLowerCase().includes(term) ||
        r.customerName.toLowerCase().includes(term) ||
        r.companyName.toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });
  }, [rfqs, search, statusFilter]);

  const cards = [
    { label: "Total RFQs", value: counts.total },
    { label: "New RFQs", value: counts.New },
    { label: "Pending RFQs", value: counts["Under Review"] },
    { label: "Responded RFQs", value: counts.Quoted },
    { label: "Completed", value: counts.Completed },
    { label: "Rejected", value: counts.Rejected },
  ];

  if (loading) {
    return (
      <div className="p-6 pb-24 text-center text-slate-400">
        Loading RFQ dashboard…
      </div>
    );
  }

  return (
    <div className="p-6 pb-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-display text-2xl font-bold text-white">RFQ Dashboard</h1>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by reference, customer or company…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-[#111820] py-2 pl-10 pr-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      {/* Summary cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-slate-800 bg-[#111820] p-5 text-center"
          >
            <div className="font-mono-data text-[10px] uppercase tracking-wider text-slate-400">
              {card.label}
            </div>
            <div className="mt-1 font-display text-3xl font-bold text-white">
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-4 flex items-center gap-3">
        <Filter className="h-4 w-4 text-slate-400" />
        <span className="text-xs text-slate-400">
          {filtered.length} of {rfqs.length} RFQs
        </span>
        <Select
          options={STATUS_OPTIONS}
          value={statusFilter}
          onChange={setStatusFilter}
          className="w-48"
        />
      </div>

            {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-lg border border-slate-800 bg-[#111820] sm:block">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#0f141f]">
            <tr>
              <th className="px-4 py-3 font-mono-data text-[10px] uppercase tracking-wider text-slate-400">RFQ ID</th>
              <th className="px-4 py-3 font-mono-data text-[10px] uppercase tracking-wider text-slate-400">Customer / Company</th>
              <th className="px-4 py-3 font-mono-data text-[10px] uppercase tracking-wider text-slate-400">Contact</th>
              <th className="px-4 py-3 font-mono-data text-[10px] uppercase tracking-wider text-slate-400">Requirement</th>
              <th className="px-4 py-3 font-mono-data text-[10px] uppercase tracking-wider text-slate-400">Date</th>
              <th className="px-4 py-3 font-mono-data text-[10px] uppercase tracking-wider text-slate-400">Status</th>
              <th className="px-4 py-3 font-mono-data text-[10px] uppercase tracking-wider text-slate-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filtered.map((rfq) => (
              <tr key={rfq.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-4 py-3 align-top font-mono-data text-xs text-slate-300">{rfq.id}</td>
                <td className="px-4 py-3 align-top">
                  <div className="font-medium text-white">{rfq.customerName}</div>
                  <div className="text-slate-400">{rfq.companyName}</div>
                </td>
                <td className="px-4 py-3 align-top text-slate-300">
                  {rfq.email}
                  <br />
                  {rfq.phone}
                </td>
                <td className="max-w-xs px-4 py-3 align-top text-slate-300">
                  {rfq.requirement
                    ? rfq.requirement.length > 80
                      ? `${rfq.requirement.slice(0, 80)}…`
                      : rfq.requirement
                    : "—"}
                </td>
                <td className="px-4 py-3 align-top text-slate-300">{formatDate(rfq.submittedAt)}</td>
                <td className="px-4 py-3 align-top"><StatusBadge status={rfq.status} /></td>
                <td className="px-4 py-3 align-top text-right">
                  <Link
                    to={`/client-portal/rfqs/${rfq.id}`}
                    className="inline-flex items-center justify-center rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-white hover:bg-accent-hover"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {filtered.map((rfq) => (
          <Link
            key={rfq.id}
            to={`/client-portal/rfqs/${rfq.id}`}
            className="block rounded-lg border border-slate-800 bg-[#111820] p-4 hover:border-accent transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="font-mono-data text-xs text-slate-300">{rfq.id}</div>
              <StatusBadge status={rfq.status} />
            </div>
            <div className="mt-2 flex items-baseline justify-between gap-2">
              <div>
                <div className="font-medium text-white">{rfq.customerName}</div>
                <div className="text-sm text-slate-400">{rfq.companyName}</div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-500" />
            </div>
            <div className="mt-2 text-xs text-slate-400 line-clamp-2">
              {rfq.requirement || "—"}
            </div>
            <div className="mt-2 text-xs text-slate-400">{formatDate(rfq.submittedAt)}</div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-8 text-center text-sm text-slate-400">
          No RFQs match the current filters.
        </p>
      )}
    </div>
  );
}
