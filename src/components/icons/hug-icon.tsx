export function HugIcon({ className = "", fill = "currentColor" }: { className?: string; fill?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left person - head */}
      <circle cx="15" cy="11" r="4" fill={fill} opacity="0.85" />
      {/* Right person - head, slightly overlapping */}
      <circle cx="25" cy="11" r="4" fill={fill} opacity="0.7" />

      {/* Left person - body curve */}
      <path
        d="M9 36 C9 28 11 22 15 20 C17 19 19 19.5 20 20"
        stroke={fill}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* Right person - body curve */}
      <path
        d="M31 36 C31 28 29 22 25 20 C23 19 21 19.5 20 20"
        stroke={fill}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Left arm embracing */}
      <path
        d="M11 26 C13 23 17 21 20 21.5 C23 22 27 24 29 26"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Right arm embracing */}
      <path
        d="M29 25 C27 22.5 23 21 20 21.5 C17 22 13 23.5 11 25.5"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Subtle heart between heads */}
      <path
        d="M18.5 14 C18.5 13 19.2 12.3 20 13 C20.8 12.3 21.5 13 21.5 14 C21.5 15.2 20 16.2 20 16.2 C20 16.2 18.5 15.2 18.5 14Z"
        fill={fill}
        opacity="0.3"
      />
    </svg>
  )
}
