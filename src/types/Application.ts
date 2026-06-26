export type Status = "Applied" | "Interview" | "Rejected" | "Offer" | "No reply"

export interface Application {
  id: string
  company: string
  role: string
  status: Status
  dateApplied: string
  source: string
  notes: string
}