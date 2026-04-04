import type { ReactNode } from 'react'
import * as React from 'react'
import { AppInitializer } from '@/app/components/app-initializer'
import InSiteMessageNotification from '@/app/components/app/in-site-message/notification'

import GA, { GaType } from '@/app/components/base/ga'
import Zendesk from '@/app/components/base/zendesk'
import GotoAnything from '@/app/components/goto-anything'
import Header from '@/app/components/header'
import HeaderWrapper from '@/app/components/header/header-wrapper'
import ReadmePanel from '@/app/components/plugins/readme-panel'
import { AppContextProvider } from '@/context/app-context-provider'
import { EventEmitterContextProvider } from '@/context/event-emitter-provider'
import { ModalContextProvider } from '@/context/modal-context-provider'
import { ProviderContextProvider } from '@/context/provider-context-provider'
import PartnerStack from '../components/billing/partner-stack'
import Splash from '../components/splash'
import RoleRouteGuard from './role-route-guard'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <GA gaType={GaType.admin} />

      <AppInitializer>
        <AppContextProvider>
          <EventEmitterContextProvider>
            <ProviderContextProvider>
              <ModalContextProvider>
                <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#091120_0%,#060b16_35%,#050913_100%)]">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(93,177,255,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(202,180,255,0.08),transparent_26%)]" />
                  <HeaderWrapper>
                    <Header />
                  </HeaderWrapper>
                  <RoleRouteGuard>
                    {children}
                  </RoleRouteGuard>
                  <InSiteMessageNotification />
                  <PartnerStack />
                  <ReadmePanel />
                  <GotoAnything />
                  <Splash />
                </div>
              </ModalContextProvider>
            </ProviderContextProvider>
          </EventEmitterContextProvider>
        </AppContextProvider>
        <Zendesk />
      </AppInitializer>
    </>
  )
}
export default Layout
