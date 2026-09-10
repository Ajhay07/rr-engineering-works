import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  Edit,
  Mail,
  Phone,
  Send,
  User,
} from "lucide-react";
import { getRFQById, updateRFQStatus } from "@/services/rfq-service";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { Select } from "@/components/ui/select";
import { Alert } from "@/components/ui/alert";
import type { RFQ, RFQStatus } from "@/types/rfq";

const STATUS_OPTIONS: { value: string; label: string }[] = [
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
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function PortalRFQDetail() {
  const { id } = useParams<{ id: string }>();
  const [rfq, setRfq] = useState<RFQ | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("No RFQ id provided.");
      setLoading(false);
      return;
    }
    getRFQById(id).then((data) => {
      if (!data) setError("RFQ not found.");
      setRfq(data ?? null);
      setLoading(false);
    });
  }, [id]);

  const handleStatusChange = async (status: string) => {
    if (!rfq) return;
    setSaving(true);
    try {
      await updateRFQStatus(rfq.id, status as RFQStatus);
      setRfq({ ...rfq, status: status as RFQStatus });
    } catch {
      setError("Could not update status. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 pb-24 text-center text-slate-400">
        Loading RFQ details…
      </div>
    );
  }

  if (error || !rfq) {
    return (
      <div className="p-6 pb-24">
        <Alert variant="error">{error || "RFQ not found."}</Alert>
        <Link
          to="/client-portal/dashboard"
          className="mt-4 inline-flex items-center text-sm text-accent hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to RFQs
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 pb-24">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link
          to="/client-portal/dashboard"
          className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to RFQs
        </Link>
        <div className="flex items-center gap-2">
          <StatusBadge status={rfq.status} />
          <span className="font-mono-data text-xs text-slate-400">{rfq.status}</span>
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-[#111820] p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="font-mono-data text-xs uppercase tracking-wider text-accent">
              RFQ Reference
            </div>
            <div className="mt-1 font-display text-2xl font-bold text-white">
              {rfq.reference}
            </div>
            <div className="mt-1 font-mono-data text-xs text-slate-400">{rfq.id}</div>
          </div>
          <div className="flex items-center gap-3">
            <Select
              options={STATUS_OPTIONS}
              value={rfq.status}
              onChange={handleStatusChange}
              label="Status"
            />
            <button
              type="button"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 disabled:opacity-60"
              title="Add internal note (placeholder for future workflow)"
            >
              <Edit className="h-3.5 w-3.5" />
              Add note
            </button>
          </div>
        </div>

        <div className="mt-8 text-xs text-amber-300/90">
          ⚠️ Mock portal: status changes are persisted locally only and will
          reset when connected to Supabase.
        </div>

                <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="space-y-5">
            <DetailRow icon={<User className="h-4 w-4 text-slate-400" />} label="Customer name" value={rfq.customerName} />
            <DetailRow icon={<User className="h-4 w-4 text-slate-400" />} label="Company" value={rfq.companyName} />
            <DetailRow icon={<Mail className="h-4 w-4 text-slate-400" />} label="Email" value={rfq.email} />
            <DetailRow icon={<Phone className="h-4 w-4 text-slate-400" />} label="Phone" value={rfq.phone} />
            <DetailRow icon={<Calendar className="h-4 w-4 text-slate-400" />} label="Required delivery date" value={rfq.deliveryDate ? formatDate(rfq.deliveryDate) : "—"} />
            <DetailRow icon={<Clock className="h-4 w-4 text-slate-400" />} label="Submission date" value={formatDate(rfq.submittedAt)} />
          </div>
          <div className="space-y-5">
            <DetailRow icon={<Send className="h-4 w-4 text-slate-400" />} label="Product / service" value={rfq.productService} />
            {rfq.projectType && <DetailRow icon={<Send className="h-4 w-4 text-slate-400" />} label="Project type" value={rfq.projectType} />}
            {rfq.material && <DetailRow icon={<Send className="h-4 w-4 text-slate-400" />} label="Material" value={rfq.material} />}
            {rfq.process && <DetailRow icon={<Send className="h-4 w-4 text-slate-400" />} label="Process" value={rfq.process} />}
            {rfq.component && <DetailRow icon={<Send className="h-4 w-4 text-slate-400" />} label="Component" value={rfq.component} />}
            <DetailRow icon={<Send className="h-4 w-4 text-slate-400" />} label="Quantity" value={rfq.quantity} />
            {rfq.attachmentName && <DetailRow icon={<Download className="h-4 w-4 text-slate-400" />} label="Attachment" value={rfq.attachmentName} />}
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-6">
          <div className="font-mono-data text-[10px] uppercase tracking-wider text-slate-400">Requirement details</div>
          <p className="mt-2 whitespace-pre-wrap text-sm text-slate-200">
            {rfq.requirement || "—"}
          </p>
        </div>

        {rfq.additionalNotes && (
          <div className="mt-6 border-t border-slate-800 pt-6">
            <div className="font-mono-data text-[10px] uppercase tracking-wider text-slate-400">Additional notes</div>
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-200">{rfq.additionalNotes}</p>
          </div>
        )}

        {rfq.internalNotes && (
          <div className="mt-6 border-t border-slate-800 pt-6">
            <div className="font-mono-data text-[10px] uppercase tracking-wider text-amber-300/90">Internal notes (portal only)</div>
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-300">{rfq.internalNotes}</p>
          </div>
        )}

        <div className="mt-8 flex items-center gap-3 border-t border-slate-800 pt-6">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
            title="Reply / create quotation (placeholder for future workflow)"
          >
            <Send className="h-4 w-4" />
            Create quotation
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700"
            title="Download enquiry (placeholder for future workflow)"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="grid gap-1">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500">
        {icon}
        {label}
      </div>
      <div className="text-sm text-slate-100">{value}</div>
    </div>
  );
}
