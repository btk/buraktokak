import { useState, useEffect } from 'react'

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // Use system preference if no theme is set
    let savedTheme = localStorage.getItem('theme')
    if (!savedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      savedTheme = prefersDark ? 'dark' : 'light'
      localStorage.setItem('theme', savedTheme)
    }
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
    // Add theme-loaded class to enable transitions
    document.body.classList.add('theme-loaded')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    // Ensure theme-loaded class is present for smooth transitions
    document.body.classList.add('theme-loaded')
  }

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: 'none',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        transition: 'all 0.3s ease',
        zIndex: 1000,
        boxShadow: '0 2px 8px var(--shadow-color)'
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}

export default ThemeToggle 