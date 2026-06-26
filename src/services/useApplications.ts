import { useState } from "react"
import type { Application } from "../types/Application"
const STORAGE_KEY = "job-tracker-apps"

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  })

  const save = (apps: Application[]) => {
    setApplications(apps)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps))
  }

  const addApplication = (app: Omit<Application, "id">) => {
    const newApp = { ...app, id: crypto.randomUUID() }
    save([...applications, newApp])
  }

  const updateApplication = (id: string, updated: Partial<Application>) => {
    save(applications.map(a => a.id === id ? { ...a, ...updated } : a))
  }

  const deleteApplication = (id: string) => {
    save(applications.filter(a => a.id !== id))
  }

  return { applications, addApplication, updateApplication, deleteApplication }
}