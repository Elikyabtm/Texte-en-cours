export default function IPhoneStatusBar() {
  // Get current time in HH:MM format
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, "0")
  const minutes = now.getMinutes().toString().padStart(2, "0")
  const currentTime = `${hours}:${minutes}`

  return (
    <div className="bg-black text-white py-2 px-4 flex justify-between items-center text-xs font-medium">
      <div>{currentTime}</div>
      <div className="flex items-center gap-1">
        <div className="h-3 w-3 rounded-full bg-white opacity-80"></div>
        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
        </svg>
        <svg className="h-3 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM13 18h-2v-2h2v2zm0-4h-2V9h2v5z" />
        </svg>
      </div>
    </div>
  )
}
