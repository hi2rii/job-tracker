import { useState } from "react"
import { useApplications } from "./services/useApplications"
import ApplicationForm from "./components/ApplicationForm"
import ApplicationList from "./components/ApplicationList"
import StatsBoard from "./components/StatsBoard"

export default function App() {
  const { applications, addApplication, updateApplication, deleteApplication } = useApplications()
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")

  const statuses = ["All", "Applied", "Interview", "Offer", "Rejected", "No reply"]

  const filtered = applications
    .filter(a => filterStatus === "All" || a.status === filterStatus)
    .filter(a =>
      a.company.toLowerCase().includes(search.toLowerCase()) ||
      a.role.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-1">Job Tracker</h1>
          <p className="text-gray-400 text-sm">{applications.length} applications tracked</p>
        </div>

        <StatsBoard applications={applications} />

        <ApplicationForm onAdd={addApplication} />

        <div className="flex gap-3 mb-6 flex-wrap">
          <input
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1 min-w-[160px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search company or role..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="flex gap-2 flex-wrap">
            {statuses.map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`text-xs px-3 py-1.5 rounded-full border transition font-medium
                  ${filterStatus === s
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-200 text-gray-500 hover:border-gray-400"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <ApplicationList
          applications={filtered}
          onDelete={deleteApplication}
          onStatusChange={(id, status) => updateApplication(id, { status })}
        />
      </div>
    </div>
  )
}