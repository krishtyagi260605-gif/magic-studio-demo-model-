'use client'
import type { FC } from 'react'
import { cn } from '@/utils/classnames'
import MagicGlyph from './magic-glyph'

type LogoSiteProps = {
  className?: string
}

const LogoSite: FC<LogoSiteProps> = ({
  className,
}) => {
  return <MagicGlyph className={cn('h-7 w-7', className)} />
}

export default LogoSite
