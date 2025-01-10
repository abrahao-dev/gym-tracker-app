import { motion } from 'framer-motion'

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  requirement: number
  type: 'streak' | 'visits' | 'consistency'
  progress: number
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-step',
    title: 'First Step',
    description: 'Complete your first gym visit',
    icon: '🌱',
    requirement: 1,
    type: 'visits',
    progress: 0
  },
  {
    id: 'week-warrior',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    requirement: 7,
    type: 'streak',
    progress: 0
  },
  {
    id: 'month-master',
    title: 'Month Master',
    description: 'Visit the gym 20 times in a month',
    icon: '💪',
    requirement: 20,
    type: 'consistency',
    progress: 0
  },
  {
    id: 'dedication',
    title: 'Pure Dedication',
    description: 'Achieve a 30-day streak',
    icon: '👑',
    requirement: 30,
    type: 'streak',
    progress: 0
  }
]

interface AchievementsProps {
  visits: string[]
  currentStreak: number
}

const Achievements = ({ visits, currentStreak }: AchievementsProps) => {
  // Calculate achievements progress
  const achievements = ACHIEVEMENTS.map(achievement => {
    let progress = 0

    switch (achievement.type) {
      case 'visits':
        progress = visits.length
        break
      case 'streak':
        progress = currentStreak
        break
      case 'consistency':
        // Calculate visits in current month
        const currentMonth = new Date().getMonth()
        const visitsThisMonth = visits.filter(date =>
          new Date(date).getMonth() === currentMonth
        ).length
        progress = visitsThisMonth
        break
    }

    return {
      ...achievement,
      progress
    }
  })

  return (
    <motion.div
      className="p-4 bg-dark-light rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-semibold mb-4">Achievements</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievements.map((achievement, index) => {
          const isCompleted = achievement.progress >= achievement.requirement
          const progress = Math.min(
            (achievement.progress / achievement.requirement) * 100,
            100
          )

          return (
            <motion.div
              key={achievement.id}
              className={`
                p-4 rounded-lg border-2 relative overflow-hidden
                ${isCompleted
                  ? 'border-primary bg-primary/10'
                  : 'border-dark-light bg-background/50'}
              `}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Progress bar */}
              <div
                className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />

              <div className="flex items-start justify-between mb-2">
                <div className="text-2xl">{achievement.icon}</div>
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-primary text-white text-xs px-2 py-1 rounded-full"
                  >
                    Completed!
                  </motion.div>
                )}
              </div>

              <h3 className="font-semibold mb-1">{achievement.title}</h3>
              <p className="text-sm text-foreground/70 mb-2">
                {achievement.description}
              </p>

              <div className="text-sm text-foreground/50">
                Progress: {achievement.progress}/{achievement.requirement}
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default Achievements