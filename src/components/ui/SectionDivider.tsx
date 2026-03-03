interface SectionDividerProps {
  color?: string;
  flip?: boolean;
  className?: string;
}

export default function SectionDivider({ color = '#F9F7F2', flip = false, className = '' }: SectionDividerProps) {
  const hasMarginTop = className.includes('-mt-') || className.includes('mt-');
  return (
    <div
      className={`relative w-full overflow-hidden leading-[0] z-10 ${className}`}
      style={{ marginTop: flip ? 0 : (hasMarginTop ? undefined : -1), marginBottom: flip ? -1 : 0 }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block w-full h-[50px] md:h-[70px]"
        style={{ transform: flip ? 'rotate(180deg)' : undefined }}
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
