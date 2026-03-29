interface LitLabLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function LitLabLogo({ className = '', size = 48, showText = true }: LitLabLogoProps) {
  const textSize = size * 0.6;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="LitLab Logo"
        role="img"
      >
        {/* Sunburst rays from center of the book line */}
        {/* Center ray (vertical) */}
        <rect x="47" y="10" width="6" height="38" rx="2" fill="black" transform="rotate(0, 50, 48)" />
        {/* Left rays */}
        <rect x="47" y="10" width="6" height="35" rx="2" fill="black" transform="rotate(-25, 50, 48)" />
        <rect x="47" y="10" width="6" height="30" rx="2" fill="black" transform="rotate(-50, 50, 48)" />
        <rect x="47" y="10" width="6" height="25" rx="2" fill="black" transform="rotate(-75, 50, 48)" />
        {/* Right rays */}
        <rect x="47" y="10" width="6" height="35" rx="2" fill="black" transform="rotate(25, 50, 48)" />
        <rect x="47" y="10" width="6" height="30" rx="2" fill="black" transform="rotate(50, 50, 48)" />
        <rect x="47" y="10" width="6" height="25" rx="2" fill="black" transform="rotate(75, 50, 48)" />
        {/* Book / horizontal line */}
        <rect x="8" y="46" width="84" height="7" rx="1" fill="black" />
      </svg>
      {showText && (
        <span
          className="font-black tracking-tight text-black"
          style={{ fontSize: `${textSize}px`, lineHeight: 1 }}
        >
          LitLab
        </span>
      )}
    </div>
  );
}
