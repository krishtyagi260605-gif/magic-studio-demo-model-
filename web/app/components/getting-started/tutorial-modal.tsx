'use client'

import type { FC } from 'react'
import { memo, useCallback, useEffect, useState } from 'react'
import { RiCloseLine, RiArrowRightLine, RiMagicLine } from '@remixicon/react'
import Button from '@/app/components/base/button'
import Modal from '@/app/components/base/modal'

/**
 * Getting Started Tutorial Modal — Magic Studio Enhancement
 *
 * Shows a guided tutorial on first login to help new users
 * understand the Magic Studio platform.
 *
 * Copyright (c) 2026 Krish Tyagi — Magic Studio
 */

type TutorialStep = {
  title: string
  description: string
  icon: string
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: 'Welcome to Magic Studio! ✨',
    description: 'Magic Studio is your low-code platform for building powerful AI applications. Let\'s take a quick tour of the key features.',
    icon: '🚀',
  },
  {
    title: 'Build Workflows Visually',
    description: 'Use the drag-and-drop workflow editor to connect LLM nodes, tools, and logic blocks. Click "Test Run" to see step-by-step results.',
    icon: '🔗',
  },
  {
    title: 'RAG Pipeline',
    description: 'Upload documents (PDF, Markdown, CSV, JSON) and Magic Studio will automatically chunk, embed, and index them for retrieval-augmented generation.',
    icon: '📚',
  },
  {
    title: 'Multi-Model Support',
    description: 'Connect your favorite LLM providers — OpenAI, Anthropic Claude, Google Gemini, and more. Configure model fallback chains for reliability.',
    icon: '🤖',
  },
  {
    title: 'Deploy as API',
    description: 'Every workflow can be exposed as a REST API with built-in authentication and rate limiting. Monitor calls, latency, and token usage.',
    icon: '🔌',
  },
]

const STORAGE_KEY = 'magic-studio-tutorial-completed'

type GettingStartedModalProps = {
  forceShow?: boolean
}

const GettingStartedModal: FC<GettingStartedModalProps> = memo(({ forceShow = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (forceShow) {
      setIsOpen(true)
      return
    }
    // Show only on first visit
    const completed = localStorage.getItem(STORAGE_KEY)
    if (!completed) {
      setIsOpen(true)
    }
  }, [forceShow])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    localStorage.setItem(STORAGE_KEY, 'true')
  }, [])

  const handleNext = useCallback(() => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
    else {
      handleClose()
    }
  }, [currentStep, handleClose])

  const handlePrev = useCallback(() => {
    if (currentStep > 0)
      setCurrentStep(prev => prev - 1)
  }, [currentStep])

  const step = TUTORIAL_STEPS[currentStep]

  if (!isOpen)
    return null

  return (
    <Modal
      isShow={isOpen}
      onClose={handleClose}
      className="w-[520px]! max-w-[520px]! p-0!"
    >
      <div className="relative overflow-hidden rounded-xl">
        {/* Header gradient */}
        <div className="bg-gradient-to-br from-[#2563EB] to-[#7C3AED] px-8 py-10 text-white">
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-lg p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <RiCloseLine className="h-5 w-5" />
          </button>

          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-2xl backdrop-blur-sm">
            {step.icon}
          </div>
          <h2 className="mb-2 text-xl font-semibold">{step.title}</h2>
          <p className="text-sm leading-relaxed text-white/80">{step.description}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between bg-background-default px-8 py-5">
          {/* Step indicators */}
          <div className="flex items-center gap-1.5">
            {TUTORIAL_STEPS.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'w-6 bg-components-button-primary-bg'
                    : index < currentStep
                      ? 'w-2 bg-components-button-primary-bg/50'
                      : 'w-2 bg-divider-regular'
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <Button size="small" onClick={handlePrev}>
                Back
              </Button>
            )}
            <Button variant="primary" size="small" onClick={handleNext} className="gap-1">
              {currentStep < TUTORIAL_STEPS.length - 1
                ? (
                    <>
                      Next
                      <RiArrowRightLine className="h-3.5 w-3.5" />
                    </>
                  )
                : (
                    <>
                      <RiMagicLine className="h-3.5 w-3.5" />
                      Get Started
                    </>
                  )}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
})

GettingStartedModal.displayName = 'GettingStartedModal'

export default GettingStartedModal
