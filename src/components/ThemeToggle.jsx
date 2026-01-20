import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      if (saved) return saved === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative w-14 h-8 rounded-full transition-colors duration-300
                 flex items-center px-1"
      style={{
        backgroundColor: isDark ? '#4f46e5' : '#e5e7eb'
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div
        className="w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300
                   flex items-center justify-center text-sm"
        style={{
          transform: isDark ? 'translateX(24px)' : 'translateX(0)'
        }}
      >
        {isDark ? '🌙' : '☀️'}
      </div>
    </button>
  )
}
