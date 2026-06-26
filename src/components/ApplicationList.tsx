import type { Application, Status } from "../types/Application"

const statusColors: Record<Status, string> = {
  Applied: "bg-blue-100 text-blue-800",
  Interview: "bg-yellow-100 text-yellow-800",
  Offer: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
  "No reply": "bg-gray-100 text-gray-600",
}

interface Props {
  applications: Application[]
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: Status) => void
}

const statuses: Status[] = ["Applied", "Interview", "Rejected", "Offer", "No reply"]

export default function ApplicationList({ applications, onDelete, onStatusChange }: Props) {
  const exportToCSV = () => {
    const headers = ["Company", "Role", "Status", "Date Applied", "Source", "Notes"]
    const rows = applications.map(a => [
      a.company, a.role, a.status, a.dateApplied, a.source, a.notes
    ])
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "applications.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  if (applications.length === 0) {
    return <p className="text-gray-400 text-sm text-center py-12">No applications yet — add your first one above.</p>
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-400">{applications.length} applications</p>
        <button
          onClick={exportToCSV}
          className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-500 hover:border-gray-400 transition">
          Export CSV
        </button>
      </div>

      {applications.map(app => (
        <div key={app.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <span className="font-medium text-gray-900">{app.company}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[app.status]}`}>
                {app.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">{app.role}</p>
            <p className="text-xs text-gray-400 mt-1">{app.dateApplied} {app.source && `· ${app.source}`}</p>
            {app.notes && <p className="text-xs text-gray-400 mt-1 italic">{app.notes}</p>}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <select
              value={app.status}
              onChange={e => onStatusChange(app.id, e.target.value as Status)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none">
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
            <button onClick={() => onDelete(app.id)}
              className="text-xs text-red-400 hover:text-red-600 transition">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}