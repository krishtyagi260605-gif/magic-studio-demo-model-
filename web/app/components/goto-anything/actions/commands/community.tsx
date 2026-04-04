import type { SlashCommandHandler } from './types'
import { RiMailLine } from '@remixicon/react'
import * as React from 'react'
import { getI18n } from 'react-i18next'
import { BRAND_CONTACT_MAILTO } from '@/constants/brand'
import { registerCommands, unregisterCommands } from './command-bus'

// Community command dependency types
type CommunityDeps = Record<string, never>

/**
 * Community command - Opens the Magic Studio contact channel
 */
export const communityCommand: SlashCommandHandler<CommunityDeps> = {
  name: 'community',
  description: 'Contact Magic Studio',
  mode: 'direct',

  // Direct execution function
  execute: () => {
    const url = BRAND_CONTACT_MAILTO
    window.open(url, '_blank', 'noopener,noreferrer')
  },

  async search(args: string, locale: string = 'en') {
    const i18n = getI18n()
    return [{
      id: 'community',
      title: i18n.t('userProfile.community', { ns: 'common', lng: locale }),
      description: i18n.t('gotoAnything.actions.communityDesc', { ns: 'app', lng: locale }) || 'Contact Magic Studio',
      type: 'command' as const,
      icon: (
        <div className="flex h-6 w-6 items-center justify-center rounded-md border-[0.5px] border-divider-regular bg-components-panel-bg">
          <RiMailLine className="h-4 w-4 text-text-tertiary" />
        </div>
      ),
      data: { command: 'navigation.community', args: { url: BRAND_CONTACT_MAILTO } },
    }]
  },

  register(_deps: CommunityDeps) {
    registerCommands({
      'navigation.community': async (args) => {
        const url = args?.url || BRAND_CONTACT_MAILTO
        window.open(url, '_blank', 'noopener,noreferrer')
      },
    })
  },

  unregister() {
    unregisterCommands(['navigation.community'])
  },
}
