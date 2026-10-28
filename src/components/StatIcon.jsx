// Tiny icons so colour is never the only clue: a heart for HP, a sword for Attack.
// They use currentColor, so they take the text colour of whatever they sit in.
function StatIcon({ stat, size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
      {stat === "hp" ? (
        <path
          d="M12 21s-7.5-4.6-9.6-9.2C1 8.6 3 5 6.6 5c2.1 0 3.6 1.2 5.4 3.2C13.8 6.2 15.3 5 17.4 5 21 5 23 8.6 21.6 11.8 19.5 16.4 12 21 12 21z"
          fill="currentColor"
        />
      ) : (
        <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          {/* blade, cross-guard, handle */}
          <line x1="20" y1="4" x2="9" y2="15" />
          <line x1="6" y1="12" x2="12" y2="18" />
          <line x1="8" y1="16" x2="4" y2="20" />
        </g>
      )}
    </svg>
  );
}

export default StatIcon;
