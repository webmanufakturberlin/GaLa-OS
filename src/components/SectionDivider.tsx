export default function SectionDivider({ flip = false, className = '' }: { flip?: boolean; className?: string }) {
  return (
    <div className={`relative z-10 -my-1 ${flip ? 'rotate-180' : ''} ${className}`}>
      <svg viewBox="0 0 1440 60" className="w-full h-auto text-cream" preserveAspectRatio="none">
        <path
          fill="currentColor"
          d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z"
        />
      </svg>
    </div>
  );
}
