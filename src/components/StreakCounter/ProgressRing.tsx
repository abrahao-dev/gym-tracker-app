'use client'

import { useEffect, useState } from 'react'

interface ProgressRingProps {
  progress: number
}

const ProgressRing = ({ progress }: ProgressRingProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate dimensions with fixed precision
  const radius = 70
  const circumference = mounted ? Number((radius * 2 * Math.PI).toFixed(6)) : 0
  const offset = mounted
    ? Number((circumference - (progress / 100) * circumference).toFixed(6))
    : circumference

  return (
    <svg className="transform -rotate-90 w-48 h-48">
      {/* Background circle */}
      <circle
        className="text-dark-light"
        strokeWidth="8"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx="96"
        cy="96"
      />
      {/* Progress circle */}
      {mounted && (
        <circle
          className="text-primary transition-all duration-500 ease-in-out"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="96"
          cy="96"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
        />
      )}
    </svg>
  )
}

export default ProgressRing