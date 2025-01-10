import { motion } from 'framer-motion'

interface CalendarProps {
  visits: string[]
}

const Calendar = ({ visits }: CalendarProps) => {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  // Get days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  // Get the day of week the month starts on (0-6, 0 = Sunday)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  // Create array for blank days at start of month
  const blanks = Array(firstDayOfMonth).fill(null)

  // Create array for days of month
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Combine arrays
  const allDays = [...blanks, ...days]

  return (
    <motion.div
      className="p-4 bg-dark-light rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold mb-4">Monthly Progress</h2>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm text-foreground/70">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {allDays.map((day, index) => {
          if (day === null) {
            return <div key={`blank-${index}`} className="aspect-square" />
          }

          const date = new Date(currentYear, currentMonth, day)
            .toISOString()
            .split('T')[0]
          const hasVisit = visits.includes(date)
          const isToday = date === today.toISOString().split('T')[0]

          return (
            <motion.div
              key={date}
              className={`
                aspect-square rounded-md flex items-center justify-center
                text-sm font-medium cursor-pointer
                ${isToday ? 'ring-2 ring-primary' : ''}
                ${hasVisit
                  ? 'bg-primary text-white'
                  : 'bg-background/50 hover:bg-background/70'}
              `}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {day}
            </motion.div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded" />
          <span>Gym Visit</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-background/50 rounded" />
          <span>No Visit</span>
        </div>
      </div>
    </motion.div>
  )
}

export default Calendar