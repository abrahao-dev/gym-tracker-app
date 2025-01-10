import { motion } from 'framer-motion'
import { useState } from 'react'

interface SettingsProps {
  onSave: (settings: UserSettings) => void
  initialSettings: UserSettings
}

interface UserSettings {
  notifications: boolean
  weeklyGoal: number
  reminderTime: string
  shareProgress: boolean
  theme: 'dark' | 'light'
}

const Settings = ({ onSave, initialSettings }: SettingsProps) => {
  const [settings, setSettings] = useState<UserSettings>(initialSettings)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    onSave(settings)
    setIsEditing(false)
  }

  return (
    <motion.div
      className="p-4 bg-dark-light rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Settings</h2>
        {isEditing ? (
          <div className="space-x-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-primary text-white rounded-md text-sm"
            >
              Save
            </button>
            <button
              onClick={() => {
                setSettings(initialSettings)
                setIsEditing(false)
              }}
              className="px-3 py-1 bg-background text-foreground rounded-md text-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-background text-foreground rounded-md text-sm"
          >
            Edit
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Notifications */}
        <div className="flex items-center justify-between">
          <div>
            <label className="font-medium">Notifications</label>
            <p className="text-sm text-foreground/70">
              Get reminded about your gym schedule
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={e => setSettings(prev => ({
              ...prev,
              notifications: e.target.checked
            }))}
            disabled={!isEditing}
            className="toggle"
          />
        </div>

        {/* Weekly Goal */}
        <div>
          <label className="font-medium">Weekly Goal</label>
          <p className="text-sm text-foreground/70 mb-2">
            Number of gym visits per week
          </p>
          <input
            type="range"
            min={1}
            max={7}
            value={settings.weeklyGoal}
            onChange={e => setSettings(prev => ({
              ...prev,
              weeklyGoal: Number(e.target.value)
            }))}
            disabled={!isEditing}
            className="w-full"
          />
          <div className="text-center text-sm mt-1">
            {settings.weeklyGoal} days
          </div>
        </div>

        {/* Reminder Time */}
        <div>
          <label className="font-medium">Reminder Time</label>
          <p className="text-sm text-foreground/70 mb-2">
            When should we remind you?
          </p>
          <input
            type="time"
            value={settings.reminderTime}
            onChange={e => setSettings(prev => ({
              ...prev,
              reminderTime: e.target.value
            }))}
            disabled={!isEditing}
            className="w-full bg-background p-2 rounded-md"
          />
        </div>

        {/* Share Progress */}
        <div className="flex items-center justify-between">
          <div>
            <label className="font-medium">Share Progress</label>
            <p className="text-sm text-foreground/70">
              Allow sharing achievements
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.shareProgress}
            onChange={e => setSettings(prev => ({
              ...prev,
              shareProgress: e.target.checked
            }))}
            disabled={!isEditing}
            className="toggle"
          />
        </div>

        {/* Theme */}
        <div>
          <label className="font-medium">Theme</label>
          <p className="text-sm text-foreground/70 mb-2">
            Choose your preferred theme
          </p>
          <select
            value={settings.theme}
            onChange={e => setSettings(prev => ({
              ...prev,
              theme: e.target.value as 'dark' | 'light'
            }))}
            disabled={!isEditing}
            className="w-full bg-background p-2 rounded-md"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </div>
    </motion.div>
  )
}

export default Settings