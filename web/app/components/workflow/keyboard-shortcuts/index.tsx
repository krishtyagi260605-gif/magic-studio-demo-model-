'use client'

import type { FC } from 'react'
import { memo, useEffect } from 'react'

/**
 * Enhanced Keyboard Shortcuts — Magic Studio Enhancement
 *
 * Registers global keyboard shortcuts for common workflow actions:
 * - Ctrl/Cmd + S: Save current workflow
 * - Ctrl/Cmd + Enter: Run test on current workflow
 * - Ctrl/Cmd + K: Open command palette / search
 * - Ctrl/Cmd + C: Copy selected nodes (works with existing reactflow)
 * - Ctrl/Cmd + V: Paste copied nodes (works with existing reactflow)
 *
 * Copyright (c) 2026 Krish Tyagi — Magic Studio
 */

type KeyboardShortcutsProps = {
  onSave?: () => void
  onTestRun?: () => void
  onSearch?: () => void
  enabled?: boolean
}

const KeyboardShortcuts: FC<KeyboardShortcutsProps> = memo(({
  onSave,
  onTestRun,
  onSearch,
  enabled = true,
}) => {
  useEffect(() => {
    if (!enabled)
      return

    const handleKeyDown = (e: KeyboardEvent) => {
      const isModifier = e.metaKey || e.ctrlKey

      if (!isModifier)
        return

      // Ctrl/Cmd + S: Save workflow
      if (e.key === 's') {
        e.preventDefault()
        onSave?.()
      }

      // Ctrl/Cmd + Enter: Test run
      if (e.key === 'Enter') {
        e.preventDefault()
        onTestRun?.()
      }

      // Ctrl/Cmd + K: Open search
      if (e.key === 'k') {
        e.preventDefault()
        onSearch?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enabled, onSave, onTestRun, onSearch])

  // This component renders nothing — it only registers event listeners
  return null
})

KeyboardShortcuts.displayName = 'KeyboardShortcuts'

export default KeyboardShortcuts
