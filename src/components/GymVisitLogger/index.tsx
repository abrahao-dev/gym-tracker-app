interface GymVisitLoggerProps {
  onLogVisit: (date: string) => void
  visits: string[]
}

const GymVisitLogger = ({ onLogVisit, visits }: GymVisitLoggerProps) => {
  const today = new Date().toISOString().split('T')[0]
  const hasVisitedToday = visits.includes(today)

  return (
    <div className="space-y-4">
      <button
        onClick={() => !hasVisitedToday && onLogVisit(today)}
        disabled={hasVisitedToday}
        className={`
          w-full py-4 px-6 rounded-lg font-semibold
          transition-all duration-200
          ${hasVisitedToday
            ? 'bg-dark-light text-foreground/50 cursor-not-allowed'
            : 'bg-primary hover:bg-primary-dark text-white'}
        `}
      >
        {hasVisitedToday ? "✅ Already Logged Today" : "🏋️‍♂️ Log Today's Gym Visit"}
      </button>

      {/* Last Visit Info */}
      {visits.length > 0 && (
        <p className="text-center text-sm text-foreground/70">
          Last visit: {new Date(visits[visits.length - 1]).toLocaleDateString()}
        </p>
      )}
    </div>
  )
}

export default GymVisitLogger