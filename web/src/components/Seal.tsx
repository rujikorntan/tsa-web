import logoUrl from "../assets/logo.png";

type Props = { className?: string };

export default function Seal({ className = "" }: Props) {
  const circleText =
    "สมาคมเซอร์เวย์ประเทศไทย  ·  THAI  SURVEYOR  ASSOCIATION  ·  EST  2560  ·  ";
  return (
    <svg
      viewBox="0 0 320 320"
      className={className}
      role="img"
      aria-label="ตราสัญลักษณ์สมาคมเซอร์เวย์ประเทศไทย"
    >
      <defs>
        <path
          id="seal-circle"
          d="M 160,160 m -130,0 a 130,130 0 1,1 260,0 a 130,130 0 1,1 -260,0"
        />
      </defs>

      <g className="animate-slow-spin" style={{ transformOrigin: "160px 160px" }}>
        <circle
          cx="160"
          cy="160"
          r="148"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 5"
          opacity="0.45"
        />
        <text
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="3"
          fill="currentColor"
        >
          <textPath href="#seal-circle" startOffset="0">
            {circleText + circleText}
          </textPath>
        </text>
      </g>

      {/* Centered website logo (replaces former wings/shield/year/hands) */}
      <image
        href={logoUrl.src}
        x={60}
        y={60}
        width={200}
        height={200}
        preserveAspectRatio="xMidYMid meet"
      />

      {/* Decorative ticks */}
      <g stroke="currentColor" strokeWidth="0.75" opacity="0.55">
        <line x1="160" y1="22" x2="160" y2="34" />
        <line x1="160" y1="286" x2="160" y2="298" />
        <line x1="22" y1="160" x2="34" y2="160" />
        <line x1="286" y1="160" x2="298" y2="160" />
      </g>
    </svg>
  );
}
