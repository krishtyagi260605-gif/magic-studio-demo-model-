import type { FC } from 'react'
import MagicStudioLogo from './magic-studio-logo'

type LogoEmbeddedChatHeaderProps = {
  className?: string
}

const LogoEmbeddedChatHeader: FC<LogoEmbeddedChatHeaderProps> = ({
  className,
}) => {
  return <MagicStudioLogo size="small" className={className} />
}

export default LogoEmbeddedChatHeader
