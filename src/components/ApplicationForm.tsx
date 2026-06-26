import { useState } from "react"
import type { Application, Status } from "../types/Application"
const statuses: Status[] = ["Applied", "Interview", "Rejected", "Offer", "No reply"]

interface Props {
  onAdd: (app: Omit<Application, "id">) => void
}

export default function ApplicationForm({ onAdd }: Props) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied" as Status,
    dateApplied: "",
    source: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.company || !form.role || !form.dateApplied) return
    onAdd(form)
    setForm({ company: "", role: "", status: "Applied", dateApplied: "", source: "", notes: "" })
  }

  const field = "border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
      <h2 className="text-lg font-medium mb-4">Add application</h2>
      <div className="grid grid-cols-2 gap-4">
        <input className={field} placeholder="Company *" value={form.company}
          onChange={e => setForm({ ...form, company: e.target.value })} />
        <input className={field} placeholder="Role *" value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })} />
        <input className={field} type="date" value={form.dateApplied}
          onChange={e => setForm({ ...form, dateApplied: e.target.value })} />
        <select className={field} value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value as Status })}>
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <input className={field} placeholder="Source (LinkedIn, Indeed...)" value={form.source}
          onChange={e => setForm({ ...form, source: e.target.value })} />
        <input className={field} placeholder="Notes" value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })} />
      </div>
      <button type="submit"
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
        Add
      </button>
    </form>
  )
}