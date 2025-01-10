'use client'

import { useState, useEffect } from 'react'
import StreakCounter from '@/components/StreakCounter'

export default function Home() {
  const [visits, setVisits] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gymVisits')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const [currentStreak, setCurrentStreak] = useState(0)

  useEffect(() => {
    localStorage.setItem('gymVisits', JSON.stringify(visits))
    calculateStreak()
  }, [visits])

  const calculateStreak = () => {
    if (visits.length === 0) {
      setCurrentStreak(0)
      return
    }

    let streak = 0
    const today = new Date().toISOString().split('T')[0]
    const sortedVisits = [...visits].sort((a, b) =>
      new Date(b).getTime() - new Date(a).getTime()
    )

    // Check if the last visit was today or yesterday
    const lastVisit = new Date(sortedVisits[0])
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    if (sortedVisits[0] !== today && lastVisit < yesterday) {
      setCurrentStreak(0)
      return
    }

    // Count consecutive days
    let currentDate = new Date(sortedVisits[0])

    for (let i = 0; i < sortedVisits.length; i++) {
      const visitDate = new Date(sortedVisits[i])
      if (i === 0 ||
          (currentDate.getTime() - visitDate.getTime()) === 86400000) {
        streak++
        currentDate = visitDate
      } else {
        break
      }
    }

    setCurrentStreak(streak)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <StreakCounter streak={currentStreak} totalVisits={visits.length} />
      </div>
    </main>
  )
}