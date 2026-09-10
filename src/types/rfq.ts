/**
 * RFQ domain model.
 *
 * This is the canonical shape of an RFQ both inside the public RFQ form and
 * inside the Client Portal. When Supabase is connected on Monday, this shape
 * maps 1:1 to the `rfqs` table columns, so only the service layer needs to
 * change — the UI keeps importing the same types.
 */

export type RFQStatus = "New" | "Under Review" | "Quoted" | "Completed" | "Rejected";

export interface RFQ {
  /** Stable internal id, e.g. `RFQ-0001`. */
  id: string;
  /** Human friendly reference shown to customers, e.g. `RFQ-RE-7F3A9B`. */
  reference: string;
  customerName: string;
  companyName: string;
  email: string;
  phone: string;
  /** Product / capability required (selected from the capability list). */
  productService: string;
  projectType?: string;
  material?: string;
  process?: string;
  component?: string;
  quantity: string;
  /** ISO date string `yyyy-mm-dd`. */
  deliveryDate?: string;
  /** Free-form requirement / project description. */
  requirement: string;
  additionalNotes?: string;
  attachmentName?: string;
  status: RFQStatus;
  /** ISO timestamp of submission. */
  submittedAt: string;
  /** ISO timestamp the commercial team committed to respond by. */
  respondBy?: string;
  /** Internal notes only visible inside the portal. */
  internalNotes?: string;
}

/**
 * Payload accepted by `createRFQ`. Everything that belongs to the RFQ itself
 * except the generated `id`, `reference`, `status` and `submittedAt`, which the
 * service fills in. Both the public Contact form and the technical configurator
 * build this object before calling the service.
 */
export type CreateRFQInput = Omit<
  RFQ,
  "id" | "reference" | "status" | "submittedAt"
>;
