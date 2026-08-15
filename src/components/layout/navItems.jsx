export const navItems = [
  {
    to: '/',
    label: 'Dashboard',
    end: true,
    icon: (props) => (
      <svg viewBox="0 0 20 20" fill="none" {...props}>
        <rect x="2.5" y="2.5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
        <rect x="11.5" y="2.5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
        <rect x="2.5" y="11.5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
        <rect x="11.5" y="11.5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    to: '/requirements',
    label: 'Requirements',
    end: false,
    icon: (props) => (
      <svg viewBox="0 0 20 20" fill="none" {...props}>
        <path d="M4 3.5h9l3 3v10a.5.5 0 0 1-.5.5h-11.5a.5.5 0 0 1-.5-.5v-12.5a.5.5 0 0 1 .5-.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M6.5 9h7M6.5 12h7M6.5 15h4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
]