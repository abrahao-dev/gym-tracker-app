import ProgressRing from './ProgressRing'

interface StreakCounterProps {
  streak: number
  totalVisits: number
}

const StreakCounter = ({ streak, totalVisits }: StreakCounterProps) => {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Gym Streak</h1>
      <div className="relative w-48 h-48 mx-auto">
        <ProgressRing progress={(totalVisits / 365) * 100} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-6xl font-bold text-primary">{streak}</div>
          <div className="text-sm text-foreground/80">days</div>
        </div>
      </div>
      <p className="text-xl text-foreground/90">
        {totalVisits}/365 days this year
      </p>
    </div>
  )
}

export default StreakCounter