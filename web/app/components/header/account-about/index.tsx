'use client'
import type { MagicStudioVersionResponse } from '@/models/common'
import { RiCloseLine } from '@remixicon/react'
import { useTranslation } from 'react-i18next'
import Button from '@/app/components/base/button'
import MagicStudioLogo from '@/app/components/base/logo/magic-studio-logo'
import Modal from '@/app/components/base/modal'
import { IS_CE_EDITION } from '@/config'
import { BRAND_LICENSE_URL, BRAND_OWNER, BRAND_PRIVACY_URL, BRAND_TERMS_URL, BRAND_UPDATES_URL } from '@/constants/brand'
import { useGlobalPublicStore } from '@/context/global-public-context'

import Link from '@/next/link'

type IAccountSettingProps = {
  magicStudioVersionInfo: MagicStudioVersionResponse
  onCancel: () => void
}

export default function AccountAbout({
  magicStudioVersionInfo,
  onCancel,
}: IAccountSettingProps) {
  const { t } = useTranslation()
  const isLatest = magicStudioVersionInfo.current_version === magicStudioVersionInfo.latest_version
  const systemFeatures = useGlobalPublicStore(s => s.systemFeatures)

  return (
    <Modal
      isShow
      onClose={onCancel}
      className="w-[480px]! max-w-[480px]! px-6! py-4!"
    >
      <div className="relative">
        <div className="absolute right-0 top-0 flex h-8 w-8 cursor-pointer items-center justify-center" onClick={onCancel}>
          <RiCloseLine className="h-4 w-4 text-text-tertiary" />
        </div>
        <div className="flex flex-col items-center gap-4 py-8">
          {systemFeatures.branding.enabled && systemFeatures.branding.workspace_logo
            ? (
                <img
                  src={systemFeatures.branding.workspace_logo}
                  className="block h-7 w-auto object-contain"
                  alt="logo"
                />
              )
            : <MagicStudioLogo size="large" className="mx-auto" />}

          <div className="text-center text-xs font-normal text-text-tertiary">
            Version
            {magicStudioVersionInfo?.current_version}
          </div>
          <div className="flex flex-col items-center gap-2 text-center text-xs font-normal text-text-secondary">
            <div>
              © 2026
              {' '}
              {BRAND_OWNER}
              {' '}
              — Magic Studio
            </div>
            <div className="text-text-accent">
              {
                IS_CE_EDITION
                  ? <Link href={BRAND_LICENSE_URL} target="_blank" rel="noopener noreferrer">MIT License</Link>
                  : (
                      <>
                        <Link href={BRAND_PRIVACY_URL} target="_blank" rel="noopener noreferrer">Privacy Policy</Link>
                        ,&nbsp;
                        <Link href={BRAND_TERMS_URL} target="_blank" rel="noopener noreferrer">Terms of Service</Link>
                      </>
                    )
              }
            </div>
          </div>
        </div>
        <div className="-mx-8 mb-4 h-[0.5px] bg-divider-regular" />
        <div className="flex items-center justify-between">
          <div className="text-xs font-medium text-text-tertiary">
            {
              isLatest
                ? t('about.latestAvailable', { ns: 'common', version: magicStudioVersionInfo.latest_version })
                : t('about.nowAvailable', { ns: 'common', version: magicStudioVersionInfo.latest_version })
            }
          </div>
          <div className="flex items-center">
            <Button className="mr-2" size="small">
              <Link
                href={BRAND_UPDATES_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('about.changeLog', { ns: 'common' })}
              </Link>
            </Button>
            {
              !isLatest && !IS_CE_EDITION && (
                <Button variant="primary" size="small">
                  <Link
                    href={magicStudioVersionInfo.release_notes}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('about.updateNow', { ns: 'common' })}
                  </Link>
                </Button>
              )
            }
          </div>
        </div>
      </div>
    </Modal>
  )
}
