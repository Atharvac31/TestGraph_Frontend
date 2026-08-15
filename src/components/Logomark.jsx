function Logomark({ className = 'h-6 w-6' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <line x1="8" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="24" y1="10" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="16" y1="16" x2="10" y2="25" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="16" y1="16" x2="23" y2="24" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="8" cy="8" r="2.5" fill="currentColor" opacity="0.5" />
      <circle cx="24" cy="10" r="2.5" fill="currentColor" opacity="0.5" />
      <circle cx="10" cy="25" r="2.5" fill="currentColor" opacity="0.5" />
      <circle cx="23" cy="24" r="2.5" fill="currentColor" opacity="0.5" />
      <circle cx="16" cy="16" r="3.5" fill="currentColor" />
    </svg>
  )
}

export default Logomark