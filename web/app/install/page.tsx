'use client'
import * as React from 'react'
import { useGlobalPublicStore } from '@/context/global-public-context'
import { cn } from '@/utils/classnames'
import Header from '../signin/_header'
import InstallForm from './installForm'

const Install = () => {
  const { systemFeatures } = useGlobalPublicStore()
  return (
    <div className={cn('relative flex min-h-screen w-full justify-center overflow-hidden bg-[#050914] p-6')}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(85,167,255,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(202,180,255,0.12),transparent_28%),linear-gradient(180deg,#07111d_0%,#050914_42%,#04070f_100%)]" />
      <div className="pointer-events-none absolute left-[10%] top-[12%] h-72 w-72 rounded-full bg-[#75d2ff]/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[8%] right-[8%] h-80 w-80 rounded-full bg-[#d4beff]/10 blur-[160px]" />
      <div className={cn('relative flex w-full shrink-0 flex-col rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.94),rgba(6,10,20,0.88))] shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl')}>
        <Header />
        <InstallForm />
        {!systemFeatures.branding.enabled && (
          <div className="px-8 py-6 text-sm font-normal text-text-tertiary">
            ©
            {' '}
            {new Date().getFullYear()}
            {' '}
            Krish Tyagi – Magic Studio. All rights reserved.
          </div>
        )}
      </div>
    </div>
  )
}

export default Install
