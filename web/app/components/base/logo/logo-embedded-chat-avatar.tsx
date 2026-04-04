import type { FC } from 'react'
import { cn } from '@/utils/classnames'
import MagicGlyph from './magic-glyph'

type LogoEmbeddedChatAvatarProps = {
  className?: string
}

const LogoEmbeddedChatAvatar: FC<LogoEmbeddedChatAvatarProps> = ({
  className,
}) => {
  return <MagicGlyph className={cn('h-10 w-10', className)} />
}

export default LogoEmbeddedChatAvatar
