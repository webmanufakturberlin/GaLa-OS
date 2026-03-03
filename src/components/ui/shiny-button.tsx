"use client"

import type React from "react"
import { motion } from "motion/react"

interface ShinyButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function ShinyButton({ children, onClick, className = "" }: ShinyButtonProps) {
  return (
    <>
      <style>{`
        .shiny-cta {
          --shiny-cta-bg: #1B3022;
          --shiny-cta-bg-subtle: #2a4432;
          --shiny-cta-fg: #F9F7F2;
          --shiny-cta-highlight: #926C44;

          isolation: isolate;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          outline-offset: 4px;
          padding: 1rem 2.5rem;
          font-family: var(--font-sans);
          font-size: 0.875rem;
          line-height: 1.2;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: 1px solid var(--shiny-cta-bg-subtle);
          border-radius: 360px;
          color: var(--shiny-cta-fg);
          background: var(--shiny-cta-bg);
          box-shadow: inset 0 0 0 1px var(--shiny-cta-bg-subtle);
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
          animation: cta-pulse-glow 3s ease-in-out infinite;
          /* GPU promotion — fixes Opera rendering */
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }

        .shiny-cta:active {
          transform: translateY(1px) translateZ(0);
        }

        @keyframes cta-pulse-glow {
          0%, 100% {
            box-shadow: inset 0 0 0 1px var(--shiny-cta-bg-subtle), 0 0 0 0 rgba(146, 108, 68, 0);
          }
          50% {
            box-shadow: inset 0 0 0 1px var(--shiny-cta-bg-subtle), 0 0 20px 4px rgba(146, 108, 68, 0.3);
          }
        }

        /* === SHIMMER RING (conic gradient, GPU-rotated) === */
        .shiny-cta .shimmer-ring {
          position: absolute;
          /* Center and size the ring so it covers the button */
          top: 50%;
          left: 50%;
          width: 300%;
          height: 300%;
          transform: translate(-50%, -50%) rotate(0deg);
          transform-origin: center center;
          pointer-events: none;
          z-index: 0;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(146, 108, 68, 0.25) 40deg,
            rgba(255, 255, 255, 0.18) 80deg,
            rgba(146, 108, 68, 0.25) 120deg,
            transparent 160deg,
            rgba(146, 108, 68, 0.12) 200deg,
            rgba(255, 255, 255, 0.08) 240deg,
            rgba(146, 108, 68, 0.12) 280deg,
            transparent 320deg,
            transparent 360deg
          );
          animation: shimmer-ring-rotate 3s linear infinite;
          /* Pure transform animation — GPU only, works in all browsers */
          will-change: transform;
        }

        @keyframes shimmer-ring-rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* === SWEEP HIGHLIGHT (transform-based, no layout repaints) === */
        .shiny-cta .shimmer-sweep {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: inherit;
          pointer-events: none;
          z-index: 0;
        }

        .shiny-cta .shimmer-sweep::before {
          content: '';
          position: absolute;
          top: 0;
          /* Start fully off-screen left using transform, not left property */
          left: 0;
          width: 55%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(146, 108, 68, 0.18),
            rgba(255, 255, 255, 0.12),
            transparent
          );
          transform: translateX(-160%);
          animation: shimmer-sweep-move 4s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes shimmer-sweep-move {
          0%   { transform: translateX(-160%); }
          50%  { transform: translateX(280%); }
          100% { transform: translateX(280%); }
        }

        .shiny-cta > .cta-text {
          position: relative;
          z-index: 1;
        }

        .shiny-cta:hover {
          border-color: var(--shiny-cta-highlight);
          box-shadow: inset 0 0 0 1px var(--shiny-cta-highlight), 0 0 28px 5px rgba(146, 108, 68, 0.35);
        }

        .shiny-cta:hover .shimmer-ring {
          animation-duration: 1.5s;
        }
      `}</style>

      <motion.button
        className={`shiny-cta ${className}`}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        {/* Shimmer ring — centered conic gradient rotating via transform */}
        <span className="shimmer-ring" aria-hidden="true" />
        {/* Sweep highlight — moves via translateX, not left */}
        <span className="shimmer-sweep" aria-hidden="true" />
        <span className="cta-text">{children}</span>
      </motion.button>
    </>
  )
}
