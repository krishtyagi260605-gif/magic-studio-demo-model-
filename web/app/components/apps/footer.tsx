import { RiGithubFill, RiMailLine } from '@remixicon/react'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { BRAND_CONTACT_MAILTO, BRAND_OWNER, BRAND_REPO_URL } from '@/constants/brand'
import Link from '@/next/link'

type CustomLinkProps = {
  href: string
  children: React.ReactNode
}

const CustomLink = React.memo(({
  href,
  children,
}: CustomLinkProps) => {
  return (
    <Link
      className="flex h-8 w-8 cursor-pointer items-center justify-center transition-opacity duration-200 ease-in-out hover:opacity-80"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {children}
    </Link>
  )
})

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="relative shrink-0 grow-0 rounded-3xl border border-divider-subtle bg-background-default-subtle px-8 py-6 shadow-xs">
      <h3 className="text-gradient text-xl font-semibold leading-tight">{t('join', { ns: 'app' })}</h3>
      <p className="system-sm-regular mt-1 max-w-xl text-text-tertiary">{t('communityIntro', { ns: 'app' })}</p>
      <div className="mt-4 flex items-center gap-2">
        <CustomLink href={BRAND_REPO_URL}>
          <RiGithubFill className="h-5 w-5 text-text-tertiary" />
        </CustomLink>
        <CustomLink href={BRAND_CONTACT_MAILTO}>
          <RiMailLine className="h-5 w-5 text-text-tertiary" />
        </CustomLink>
      </div>
      <p className="system-xs-regular mt-4 text-text-quaternary">© 2026 {BRAND_OWNER} — Magic Studio</p>
    </footer>
  )
}

export default React.memo(Footer)
