'use client'
import type { FC } from 'react'
import useTheme from '@/hooks/use-theme'
import { cn } from '@/utils/classnames'
import MagicGlyph from './magic-glyph'

export type LogoStyle = 'default' | 'monochromeWhite'
export type LogoSize = 'large' | 'medium' | 'small'

const glyphSizeMap: Record<LogoSize, string> = {
  large: 'h-10 w-10',
  medium: 'h-8 w-8',
  small: 'h-6 w-6',
}

const textSizeMap: Record<LogoSize, string> = {
  large: 'text-[1.55rem] tracking-[-0.06em]',
  medium: 'text-[1.1rem] tracking-[-0.05em]',
  small: 'text-[0.95rem] tracking-[-0.04em]',
}

type MagicStudioLogoProps = {
  style?: LogoStyle
  size?: LogoSize
  className?: string
}

const MagicStudioLogo: FC<MagicStudioLogoProps> = ({
  style = 'default',
  size = 'medium',
  className,
}) => {
  const { theme } = useTheme()
  const monochrome = theme === 'dark' && style === 'default'
  const textClassName = monochrome || style === 'monochromeWhite'
    ? 'text-white'
    : 'bg-[linear-gradient(135deg,#173B5B_0%,#5298FF_45%,#D9D6FF_100%)] bg-clip-text text-transparent'

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <MagicGlyph
        monochrome={monochrome || style === 'monochromeWhite'}
        className={glyphSizeMap[size]}
      />
      <span
        className={cn(
          'font-semibold leading-none',
          textSizeMap[size],
          textClassName,
        )}
      >
        Magic Studio
      </span>
    </span>
  )
}

export default MagicStudioLogo
