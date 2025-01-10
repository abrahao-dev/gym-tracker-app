interface ProgressRingProps {
  progress: number
}

const ProgressRing = ({ progress }: ProgressRingProps) => {
  const radius = 70
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg className="transform -rotate-90 w-48 h-48">
      <circle
        className="text-dark-light"
        strokeWidth="8"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx="96"
        cy="96"
      />
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
    </svg>
  )
}

export default ProgressRing