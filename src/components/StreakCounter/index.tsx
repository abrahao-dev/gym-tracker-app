'use client'

import { motion } from 'framer-motion'
import ProgressRing from './ProgressRing'

interface StreakCounterProps {
  streak: number
  totalVisits: number
}

const StreakCounter = ({ streak, totalVisits }: StreakCounterProps) => {
  // Calculate progress percentage for the year
  const yearProgress = Number(((totalVisits / 365) * 100).toFixed(6))

  return (
    <motion.div
      className="text-center space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-48 h-48 mx-auto">
        <ProgressRing progress={yearProgress} />
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <div className="text-6xl font-bold text-primary">{streak}</div>
          <div className="text-sm text-foreground/80">
            day{streak !== 1 ? 's' : ''} streak
          </div>
        </motion.div>
      </div>
      <p className="text-xl text-foreground/90">
        {totalVisits}/365 days this year
      </p>
    </motion.div>
  )
}

export default StreakCounter