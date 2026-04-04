'use client'
import type { FC } from 'react'
import { cn } from '@/utils/classnames'

type MagicGlyphProps = {
  className?: string
  monochrome?: boolean
}

const MagicGlyph: FC<MagicGlyphProps> = ({
  className,
  monochrome = false,
}) => {
  const primaryGradient = monochrome ? 'url(#magicMono)' : 'url(#magicAurora)'
  const secondaryGradient = monochrome ? 'url(#magicMonoSoft)' : 'url(#magicIce)'

  return (
    <svg
      viewBox="0 0 128 128"
      fill="none"
      aria-hidden="true"
      className={cn('block drop-shadow-[0_10px_24px_rgba(111,194,255,0.35)]', className)}
    >
      <defs>
        <linearGradient id="magicAurora" x1="18" y1="12" x2="114" y2="116" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A7F3FF" />
          <stop offset="0.38" stopColor="#8EB9FF" />
          <stop offset="0.68" stopColor="#C4B5FD" />
          <stop offset="1" stopColor="#EEF2FF" />
        </linearGradient>
        <linearGradient id="magicIce" x1="64" y1="10" x2="64" y2="118" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8FDFF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#9DD6FF" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="magicMono" x1="20" y1="20" x2="108" y2="108" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E5EEF8" />
        </linearGradient>
        <linearGradient id="magicMonoSoft" x1="64" y1="10" x2="64" y2="118" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity="0.92" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.28" />
        </linearGradient>
      </defs>

      <path
        d="M64 6L76 30L103 24L97 49L122 64L97 79L103 104L76 98L64 122L52 98L25 104L31 79L6 64L31 49L25 24L52 30L64 6Z"
        fill={primaryGradient}
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M64 24L71 46L94 54L74 66L69 90L54 72L32 73L46 57L39 35L58 44L64 24Z"
        fill={secondaryGradient}
        opacity="0.9"
      />
      <path
        d="M64 14L67 36L64 58L61 36L64 14Z"
        fill="white"
        opacity="0.85"
      />
      <path
        d="M47 42L57 51L41 58L47 42Z"
        fill="white"
        opacity="0.55"
      />
      <path
        d="M81 42L71 51L87 58L81 42Z"
        fill="white"
        opacity="0.55"
      />
      <circle cx="64" cy="36" r="7" fill="white" opacity="0.5" />
    </svg>
  )
}

export default MagicGlyph
