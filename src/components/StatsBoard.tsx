import type { Application } from "../types/Application"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js"
import { Doughnut, Bar } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

interface Props {
  applications: Application[]
}

export default function StatsBoard({ applications }: Props) {
  const total = applications.length

  const statusCounts = {
    Applied: 0,
    Interview: 0,
    Offer: 0,
    Rejected: 0,
    "No reply": 0,
  }

  applications.forEach(a => {
    statusCounts[a.status]++
  })

  const responseRate = total === 0 ? 0 :
    Math.round(((statusCounts.Interview + statusCounts.Offer) / total) * 100)

  const offerRate = total === 0 ? 0 :
    Math.round((statusCounts.Offer / total) * 100)

  const sourceCounts: Record<string, number> = {}
  applications.forEach(a => {
    const source = a.source || "Unknown"
    sourceCounts[source] = (sourceCounts[source] || 0) + 1
  })

  const doughnutData = {
    labels: Object.keys(statusCounts),
    datasets: [{
      data: Object.values(statusCounts),
      backgroundColor: ["#3B82F6", "#EAB308", "#22C55E", "#EF4444", "#9CA3AF"],
      borderWidth: 0,
    }]
  }

  const barData = {
    labels: Object.keys(sourceCounts),
    datasets: [{
      label: "Applications",
      data: Object.values(sourceCounts),
      backgroundColor: "#3B82F6",
      borderRadius: 6,
    }]
  }

  const statCard = "bg-white rounded-xl p-5 shadow-sm border border-gray-100"

  if (total === 0) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center text-gray-400 text-sm mb-8">
        Add applications to see your stats
      </div>
    )
  }

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-4">Stats</h2>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className={statCard}>
          <p className="text-sm text-gray-400 mb-1">Total</p>
          <p className="text-3xl font-semibold text-gray-900">{total}</p>
        </div>
        <div className={statCard}>
          <p className="text-sm text-gray-400 mb-1">Response rate</p>
          <p className="text-3xl font-semibold text-blue-600">{responseRate}%</p>
        </div>
        <div className={statCard}>
          <p className="text-sm text-gray-400 mb-1">Offer rate</p>
          <p className="text-3xl font-semibold text-green-600">{offerRate}%</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={statCard}>
          <p className="text-sm text-gray-400 mb-4">Status breakdown</p>
          <Doughnut data={doughnutData} options={{ plugins: { legend: { position: "bottom" } } }} />
        </div>
        <div className={statCard}>
          <p className="text-sm text-gray-400 mb-4">Applications by source</p>
          {Object.keys(sourceCounts).length === 0 ? (
            <p className="text-xs text-gray-300 text-center mt-8">No source data yet</p>
          ) : (
            <Bar data={barData} options={{
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
            }} />
          )}
        </div>
      </div>
    </div>
  )
}