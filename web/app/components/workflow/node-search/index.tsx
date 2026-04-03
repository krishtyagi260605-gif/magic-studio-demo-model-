'use client'

import type { FC } from 'react'
import { memo, useCallback, useMemo, useState } from 'react'
import { RiSearchLine, RiCloseLine } from '@remixicon/react'

/**
 * Node Search/Filter — Magic Studio Enhancement
 *
 * Provides search and filtering for workflow nodes in the sidebar.
 * Users can search by node name or filter by category.
 *
 * Copyright (c) 2026 Krish Tyagi — Magic Studio
 */

export type NodeCategory = 'llm' | 'tool' | 'logic' | 'data' | 'input' | 'output' | 'all'

export type SearchableNode = {
  id: string
  name: string
  category: NodeCategory
  description?: string
  icon?: string
}

type NodeSearchProps = {
  nodes: SearchableNode[]
  onNodeSelect?: (node: SearchableNode) => void
  className?: string
}

const CATEGORY_LABELS: Record<NodeCategory, string> = {
  all: 'All Nodes',
  llm: 'LLM',
  tool: 'Tools',
  logic: 'Logic',
  data: 'Data',
  input: 'Input',
  output: 'Output',
}

const NodeSearch: FC<NodeSearchProps> = memo(({
  nodes,
  onNodeSelect,
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<NodeCategory>('all')

  const filteredNodes = useMemo(() => {
    return nodes.filter((node) => {
      const matchesSearch = searchQuery === ''
        || node.name.toLowerCase().includes(searchQuery.toLowerCase())
        || node.description?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory === 'all' || node.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [nodes, searchQuery, activeCategory])

  const handleClearSearch = useCallback(() => {
    setSearchQuery('')
  }, [])

  const categories = useMemo(() => {
    const available = new Set(nodes.map(n => n.category))
    return (['all', ...Array.from(available)] as NodeCategory[])
  }, [nodes])

  return (
    <div className={`flex flex-col gap-3 ${className || ''}`}>
      {/* Search Input */}
      <div className="relative">
        <RiSearchLine className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-quaternary" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search nodes..."
          className="w-full rounded-lg border border-components-input-border-active bg-components-input-bg-normal py-2 pl-9 pr-8 text-sm text-text-primary placeholder:text-text-quaternary focus:border-components-input-border-active focus:outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 hover:bg-state-base-hover"
          >
            <RiCloseLine className="h-3.5 w-3.5 text-text-quaternary" />
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-1">
        {categories.map(category => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              activeCategory === category
                ? 'bg-components-button-primary-bg text-components-button-primary-text'
                : 'bg-components-button-secondary-bg text-components-button-secondary-text hover:bg-components-button-secondary-bg-hover'
            }`}
          >
            {CATEGORY_LABELS[category] || category}
          </button>
        ))}
      </div>

      {/* Node List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredNodes.length === 0
          ? (
              <div className="py-8 text-center text-sm text-text-tertiary">
                No nodes found
              </div>
            )
          : (
              <div className="flex flex-col gap-1">
                {filteredNodes.map(node => (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => onNodeSelect?.(node)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-state-base-hover"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-components-badge-bg-default text-sm">
                      {node.icon || '⚡'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-text-primary">{node.name}</div>
                      {node.description && (
                        <div className="truncate text-xs text-text-tertiary">{node.description}</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
      </div>
    </div>
  )
})

NodeSearch.displayName = 'NodeSearch'

export default NodeSearch
