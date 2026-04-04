'use client'
import type { Locale } from '@/i18n-config'
import Divider from '@/app/components/base/divider'
import LocaleSigninSelect from '@/app/components/base/select/locale-signin'
import { useGlobalPublicStore } from '@/context/global-public-context'
import { useLocale } from '@/context/i18n'
import { setLocaleOnClient } from '@/i18n-config'
import { languages } from '@/i18n-config/language'
import dynamic from '@/next/dynamic'

// Avoid rendering the logo and theme selector on the server
const MagicStudioLogo = dynamic(() => import('@/app/components/base/logo/magic-studio-logo'), {
  ssr: false,
  loading: () => <div className="h-7 w-16 bg-transparent" />,
})
const ThemeSelector = dynamic(() => import('@/app/components/base/theme-selector'), {
  ssr: false,
  loading: () => <div className="size-8 bg-transparent" />,
})

const Header = () => {
  const locale = useLocale()
  const systemFeatures = useGlobalPublicStore(s => s.systemFeatures)

  return (
    <div className="relative flex w-full items-center justify-between overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(7,11,23,0.9),rgba(16,27,49,0.84))] px-6 py-5 shadow-[0_20px_80px_rgba(4,8,20,0.38)] backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#d8d8ff] to-transparent opacity-40" />
      <div className="pointer-events-none absolute top-1/2 -left-16 h-28 w-28 -translate-y-1/2 rounded-full bg-[#67c9ff]/18 blur-3xl" />
      <div className="pointer-events-none absolute top-0 -right-8 h-24 w-24 rounded-full bg-[#d4beff]/18 blur-3xl" />
      {systemFeatures.branding.enabled && systemFeatures.branding.login_page_logo
        ? (
            <img
              src={systemFeatures.branding.login_page_logo}
              className="block h-7 w-auto object-contain"
              alt="logo"
            />
          )
        : <MagicStudioLogo size="large" className="relative z-10" />}
      <div className="flex items-center gap-1">
        <LocaleSigninSelect
          value={locale}
          items={languages.filter(item => item.supported)}
          onChange={(value) => {
            setLocaleOnClient(value as Locale)
          }}
        />
        <Divider type="vertical" className="mx-0 ml-2 h-4" />
        <ThemeSelector />
      </div>
    </div>
  )
}

export default Header
