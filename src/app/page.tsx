'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import StreakCounter from '@/components/StreakCounter'
import GymVisitLogger from '@/components/GymVisitLogger'
import ShareButton from '@/components/ShareButton'

export default function Home() {
  // Initialize visits from localStorage
  const [visits, setVisits] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gymVisits')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const [currentStreak, setCurrentStreak] = useState(0)

  // Save visits to localStorage and recalculate streak whenever visits change
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

  const handleLogVisit = (date: string) => {
    if (!visits.includes(date)) {
      setVisits(prev => [...prev, date])
    }
  }

  const handleShare = async () => {
    const shareText = `🏋️‍♂️ I'm on a ${currentStreak}-day gym streak! 💪 #GymStreak`
    const shareUrl = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Gym Streak',
          text: shareText,
          url: shareUrl,
        })
      } catch (err) {
        copyToClipboard(shareText)
      }
    } else {
      copyToClipboard(shareText)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Copied to clipboard! Share your progress! 💪')
      })
      .catch(() => {
        alert('Failed to copy text to clipboard')
      })
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        className="max-w-md w-full space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-foreground">Gym Streak</h1>
          <p className="text-foreground/70">Track your fitness journey</p>
        </motion.div>

        {/* Streak Counter */}
        <StreakCounter
          streak={currentStreak}
          totalVisits={visits.length}
        />

        {/* Visit Logger */}
        <GymVisitLogger
          onLogVisit={handleLogVisit}
          visits={visits}
        />

        {/* Share Button */}
        <ShareButton
          onClick={handleShare}
          streak={currentStreak}
        />

        {/* Stats Section */}
        <motion.div
          className="mt-8 p-4 bg-dark-light rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Your Stats
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-sm text-foreground/70">Total Visits</p>
              <p className="text-2xl font-bold text-primary">{visits.length}</p>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-sm text-foreground/70">Current Streak</p>
              <p className="text-2xl font-bold text-primary">{currentStreak}</p>
            </div>
          </div>
        </motion.div>

        {/* Progress Section */}
        <motion.div
          className="p-4 bg-dark-light rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Yearly Progress
          </h2>
          <div className="relative h-4 bg-background rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-primary transition-all duration-500"
              style={{ width: `${(visits.length / 365) * 100}%` }}
            />
          </div>
          <p className="text-sm text-foreground/70 text-center mt-2">
            {Math.round((visits.length / 365) * 100)}% of yearly goal
          </p>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="mt-8 text-center text-sm text-foreground/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p>Keep pushing! 💪</p>
      </motion.footer>
    </main>
  )
}