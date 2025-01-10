'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import StreakCounter from '@/components/StreakCounter'
import GymVisitLogger from '@/components/GymVisitLogger'
import ShareButton from '@/components/ShareButton'
import Calendar from '@/components/Calendar'
import Stats from '@/components/Stats'
import Achievements from '@/components/Achievements'
import Settings from '@/components/Settings'

interface UserSettings {
  notifications: boolean
  weeklyGoal: number
  reminderTime: string
  shareProgress: boolean
  theme: 'dark' | 'light'
}

export default function Home() {
  // Initialize visits from localStorage
  const [visits, setVisits] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gymVisits')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  // Initialize settings from localStorage
  const [settings, setSettings] = useState<UserSettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gymSettings')
      return saved ? JSON.parse(saved) : {
        notifications: false,
        weeklyGoal: 5,
        reminderTime: '09:00',
        shareProgress: true,
        theme: 'dark'
      }
    }
    return {
      notifications: false,
      weeklyGoal: 5,
      reminderTime: '09:00',
      shareProgress: true,
      theme: 'dark'
    }
  })

  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)

  // Save visits to localStorage and recalculate streak whenever visits change
  useEffect(() => {
    localStorage.setItem('gymVisits', JSON.stringify(visits))
    calculateStreak()
  }, [visits])

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('gymSettings', JSON.stringify(settings))
  }, [settings])

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
    setLongestStreak(prev => Math.max(prev, streak))
  }

  const handleLogVisit = (date: string) => {
    if (!visits.includes(date)) {
      setVisits(prev => [...prev, date])
    }
  }

  const handleShare = async () => {
    if (!settings.shareProgress) {
      alert('Sharing is disabled in settings')
      return
    }

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

  const handleSettingsUpdate = (newSettings: UserSettings) => {
    setSettings(newSettings)
  }

  return (
    <main className={`min-h-screen p-4 ${settings.theme === 'dark' ? 'bg-background' : 'bg-gray-100'}`}>
      <motion.div
        className="max-w-6xl mx-auto space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-foreground">Gym Streak</h1>
          <p className="text-foreground/70">Track your fitness journey</p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <StreakCounter
              streak={currentStreak}
              totalVisits={visits.length}
            />
            <GymVisitLogger
              onLogVisit={handleLogVisit}
              visits={visits}
            />
            <ShareButton
              onClick={handleShare}
              streak={currentStreak}
              disabled={!settings.shareProgress}
            />
          </div>

          {/* Middle Column */}
          <div className="space-y-8">
            <Calendar visits={visits} />
            <Stats
              visits={visits}
              currentStreak={currentStreak}
              longestStreak={longestStreak}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <Achievements
              visits={visits}
              currentStreak={currentStreak}
            />
            <Settings
              initialSettings={settings}
              onSave={handleSettingsUpdate}
            />
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          className="text-center text-sm text-foreground/50 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p>Keep pushing! 💪</p>
          <p className="mt-2">
            Total Visits: {visits.length} | Longest Streak: {longestStreak} days
          </p>
        </motion.footer>
      </motion.div>
    </main>
  )
}