import { motion } from 'framer-motion'

interface ShareButtonProps {
  onClick: () => void
  streak: number
}

const ShareButton = ({ onClick, streak }: ShareButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <button
        onClick={onClick}
        className="w-full group relative flex items-center justify-center gap-2
                 py-3 px-6 bg-dark-light hover:bg-dark-light/80
                 rounded-lg transition-all duration-200"
      >
        {/* Share Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>

        {/* Button Text */}
        <span className="font-semibold text-foreground">
          Share My {streak > 0 && `${streak}-Day`} Streak
        </span>

        {/* Emoji Badge */}
        {streak > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-white
                        text-xs px-2 py-1 rounded-full animate-pulse">
            🔥
          </span>
        )}
      </button>

      {/* Optional: Add a tooltip or message */}
      {streak > 0 && (
        <p className="text-center text-sm text-foreground/50 mt-2">
          Share your progress and inspire others!
        </p>
      )}
    </motion.div>
  )
}

export default ShareButton