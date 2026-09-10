import type { CreateRFQInput, RFQ, RFQStatus } from "@/types/rfq";
import { MOCK_RFQS } from "@/data/mock-rfqs";

/**
 * Mock RFQ repository.
 *
 * ⚠️ Development / demo only.
 *
 * This layer is the ONLY place that knows RFQs are currently stored in
 * `localStorage`. On Monday, replace `loadStore` / `saveStore` (or the bodies
 * of these functions) with Supabase queries against the `rfqs` table. Every UI
 * component imports from this module, so the switch is a single-file change.
 */

const STORAGE_KEY = "rrf_rfq_store";

function loadStore(): RFQ[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed as RFQ[];
    }
  } catch {
    // corrupt store — fall through to mocks
  }
  // Seed localStorage with the mock dataset on first run so the portal has
  // realistic data even before anyone submits an RFQ.
  const seed = JSON.stringify(MOCK_RFQS);
  try {
    localStorage.setItem(STORAGE_KEY, seed);
  } catch {
    /* storage disabled — use mocks in memory */
  }
  return [...MOCK_RFQS];
}

function saveStore(rfqs: RFQ[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rfqs));
  } catch {
    /* storage disabled — writes are best-effort in the demo */
  }
}

function nextId(rfqs: RFQ[]): number {
  return (
    rfqs.reduce((max, r) => {
      const n = Number.parseInt(r.id.split("-").pop() ?? "0", 10);
      return Number.isFinite(n) && n > max ? n : max;
    }, 0) + 1
  );
}

function generateReference(): string {
  return `RFQ-RE-${String(Math.floor(100000 + Math.random() * 900000)).toUpperCase()}`;
}

/** Public list, newest first. */
export async function getRFQs(): Promise<RFQ[]> {
  return loadStore();
}

export async function getRFQById(id: string): Promise<RFQ | undefined> {
  return loadStore().find((r) => r.id === id);
}

export async function createRFQ(data: CreateRFQInput): Promise<RFQ> {
  // Simulate network latency so the UI loading/submission states are visible.
  await new Promise((resolve) => setTimeout(resolve, 600));

  const rfqs = loadStore();
  const now = new Date().toISOString();
  const rfq: RFQ = {
    id: `RFQ-${String(nextId(rfqs)).padStart(4, "0")}`,
    reference: generateReference(),
    customerName: data.customerName,
    companyName: data.companyName,
    email: data.email,
    phone: data.phone,
    productService: data.productService,
    projectType: data.projectType,
    material: data.material,
    process: data.process,
    component: data.component,
    quantity: data.quantity,
    deliveryDate: data.deliveryDate,
    requirement: data.requirement,
    additionalNotes: data.additionalNotes,
    attachmentName: data.attachmentName,
    status: "New",
    submittedAt: now,
    respondBy: undefined,
    internalNotes: "",
  };

  rfqs.unshift(rfq);
  saveStore(rfqs);
  return rfq;
}

export async function updateRFQStatus(
  id: string,
  status: RFQStatus
): Promise<boolean> {
  const rfqs = loadStore();
  const rfq = rfqs.find((r) => r.id === id);
  if (!rfq) return false;
  rfq.status = status;
  saveStore(rfqs);
  return true;
}
