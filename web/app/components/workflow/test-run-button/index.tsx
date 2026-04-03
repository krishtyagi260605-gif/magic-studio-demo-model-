'use client'

import type { FC } from 'react'
import { memo, useCallback, useState } from 'react'
import { RiPlayLine, RiLoader4Line } from '@remixicon/react'
import Button from '@/app/components/base/button'

/**
 * Test Run Button — Magic Studio Enhancement
 *
 * This component provides a "Test Run" button for the workflow editor.
 * When clicked, it executes the current workflow with sample inputs
 * and shows step-by-step output in the results panel.
 *
 * Copyright (c) 2026 Krish Tyagi — Magic Studio
 */

type TestRunButtonProps = {
  workflowId?: string
  onTestRunStart?: () => void
  onTestRunComplete?: (results: TestRunResult[]) => void
  disabled?: boolean
  className?: string
}

export type TestRunResult = {
  nodeId: string
  nodeName: string
  status: 'success' | 'error' | 'running' | 'pending'
  output?: string
  duration?: number
  tokenUsage?: number
  error?: string
}

const TestRunButton: FC<TestRunButtonProps> = memo(({
  workflowId,
  onTestRunStart,
  onTestRunComplete,
  disabled = false,
  className,
}) => {
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<TestRunResult[]>([])

  const handleTestRun = useCallback(async () => {
    if (!workflowId || isRunning)
      return

    setIsRunning(true)
    setResults([])
    onTestRunStart?.()

    try {
      // TODO: Connect to the workflow execution API
      // This scaffold demonstrates the architecture.
      // In production, this calls the workflow run API with test inputs.
      const response = await fetch(`/console/api/workflows/${workflowId}/test-run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs: {} }),
      })

      if (response.ok) {
        const data = await response.json()
        const testResults: TestRunResult[] = data.node_executions?.map((node: Record<string, unknown>) => ({
          nodeId: node.node_id,
          nodeName: node.node_name || 'Unknown Node',
          status: node.status === 'succeeded' ? 'success' : 'error',
          output: typeof node.output === 'string' ? node.output : JSON.stringify(node.output),
          duration: node.duration_ms,
          tokenUsage: node.token_usage,
          error: node.error,
        })) || []
        setResults(testResults)
        onTestRunComplete?.(testResults)
      }
    }
    catch (error) {
      console.error('Test run failed:', error)
    }
    finally {
      setIsRunning(false)
    }
  }, [workflowId, isRunning, onTestRunStart, onTestRunComplete])

  return (
    <div className={className}>
      <Button
        variant="primary"
        size="small"
        onClick={handleTestRun}
        disabled={disabled || isRunning || !workflowId}
        className="gap-1"
      >
        {isRunning
          ? <RiLoader4Line className="h-4 w-4 animate-spin" />
          : <RiPlayLine className="h-4 w-4" />}
        {isRunning ? 'Running...' : 'Test Run'}
      </Button>

      {results.length > 0 && (
        <div className="mt-3 max-h-80 overflow-y-auto rounded-lg border border-divider-regular bg-background-default p-3">
          <h4 className="mb-2 text-sm font-medium text-text-primary">Test Results</h4>
          {results.map(result => (
            <div
              key={result.nodeId}
              className="mb-2 rounded-md border border-divider-subtle p-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-text-primary">{result.nodeName}</span>
                <span className={`text-xs font-medium ${
                  result.status === 'success' ? 'text-util-colors-green-green-600' : 'text-util-colors-red-red-600'
                }`}>
                  {result.status === 'success' ? '✓ Success' : '✗ Error'}
                </span>
              </div>
              {result.output && (
                <pre className="mt-1 overflow-x-auto text-xs text-text-secondary">{result.output}</pre>
              )}
              {result.duration !== undefined && (
                <div className="mt-1 text-xs text-text-tertiary">
                  {result.duration}ms {result.tokenUsage ? `• ${result.tokenUsage} tokens` : ''}
                </div>
              )}
              {result.error && (
                <div className="mt-1 text-xs text-util-colors-red-red-600">{result.error}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
})

TestRunButton.displayName = 'TestRunButton'

export default TestRunButton
