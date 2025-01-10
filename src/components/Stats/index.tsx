import { motion } from 'framer-motion'

interface StatsProps {
  visits: string[]
  currentStreak: number
  longestStreak: number
}

const Stats = ({ visits, currentStreak, longestStreak }: StatsProps) => {
  // Calculate this week's visits
  const thisWeekVisits = visits.filter(date => {
    const visitDate = new Date(date)
    const today = new Date()
    const weekStart = new Date(today.setDate(today.getDate() - 7))
    return visitDate >= weekStart
  })

  // Calculate completion rate
  const completionRate = Math.round((visits.length / 365) * 100)

  const stats = [
    {
      title: 'This Week',
      value: thisWeekVisits.length,
      icon: '📅',
      color: 'bg-blue-500'
    },
    {
      title: 'Total Visits',
      value: visits.length,
      icon: '💪',
      color: 'bg-green-500'
    },
    {
      title: 'Current Streak',
      value: currentStreak,
      icon: '🔥',
      color: 'bg-orange-500'
    },
    {
      title: 'Longest Streak',
      value: longestStreak,
      icon: '🏆',
      color: 'bg-purple-500'
    }
  ]

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="p-4 bg-dark-light rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{stat.icon}</span>
              <h3 className="text-sm text-foreground/70">{stat.title}</h3>
            </div>
            <p className="text-2xl font-bold text-primary">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="p-4 bg-dark-light rounded-lg">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-foreground/70">Yearly Progress</span>
          <span className="text-sm font-medium">{completionRate}%</span>
        </div>
        <div className="h-2 bg-background rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default Stats