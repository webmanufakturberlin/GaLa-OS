import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const leafPaths = [
  // Elegant Willow Leaf
  "M12 1C10 4 8 9 9 14C10 18 11 20 12 23C13 20 14 18 15 14C16 9 14 4 12 1Z",
  // Rounded Beech Leaf
  "M12 1.5C9.5 3.5 5.5 8 7 14C8 18 10.5 21 12 23C13.5 21 16 18 17 14C18.5 8 14.5 3.5 12 1.5Z",
  // Smooth Oak-like Leaf
  "M12 2C9.5 3 8 5.5 6.5 8C5.5 9.5 6 12 7 14C8 16 9.5 18 11.5 22.5C11.8 23 12.2 23 12.5 22.5C14.5 18 16 16 17 14C18 12 18.5 9.5 17.5 8C16 5.5 14.5 3 12 2Z",
  // Heart-shaped Linden Leaf
  "M12 3C8 -1 2 4 4 10C5.5 14.5 9.5 19 12 23C14.5 19 18.5 14.5 20 10C22 4 16 -1 12 3Z",
  // Gentle Oval Leaf
  "M12 1.5C10 3 7 7 7 12.5C7 17 10 21 12 23C14 21 17 17 17 12.5C17 7 14 3 12 1.5Z"
];

const Leaf = ({ delay, x, duration, scale, pathIndex, opacity }: { delay: number; x: number; duration: number; scale: number; pathIndex: number; opacity: number }) => {
  return (
    <motion.div
      initial={{ y: '-10vh', x: `${x}vw`, rotate: 0, opacity: 0 }}
      animate={{
        y: '110vh',
        x: `${x + (Math.random() * 10 - 5)}vw`,
        rotate: 360,
        opacity: [0, opacity, opacity, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: 'linear',
      }}
      className="fixed z-0 pointer-events-none text-green-600/30"
      style={{ scale }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d={leafPaths[pathIndex]} />
      </svg>
    </motion.div>
  );
};

export function BackgroundEffects() {
  const [leaves, setLeaves] = useState<Array<{ id: number; delay: number; x: number; duration: number; scale: number; pathIndex: number; opacity: number }>>([]);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const count = isMobile ? 10 : 28;
    const newLeaves = Array.from({ length: count }).map((_, i) => ({
      id: i,
      delay: Math.random() * 20,
      x: Math.random() * 90 + 5,
      duration: 15 + Math.random() * 15,
      scale: 0.6 + Math.random() * 2,
      pathIndex: Math.floor(Math.random() * leafPaths.length),
      opacity: 0.3 + Math.random() * 0.4,
    }));
    setLeaves(newLeaves);
  }, []);

  return (
    <>
      <div className="texture-overlay"></div>
      <div className="dappled-sunlight"></div>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {leaves.map((leaf) => (
          <Leaf key={leaf.id} {...leaf} />
        ))}
      </div>
    </>
  );
}
