'use client'

import { useState, useRef, type KeyboardEvent } from 'react'
import { ArrowUp, Paperclip } from 'lucide-react'

const SUGGESTIONS = [
  'Build a SaaS dashboard with dark mode',
  'Create a landing page for a dev tool',
  'Generate a real-time chat UI component',
  'Design a pricing table with animations',
]

export function Hero() {
  const [prompt, setPrompt] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
    }
  }

  return (
    <section className="flex-1 flex items-center justify-center px-4 py-20 sm:px-6">
      <div className="w-full max-w-3xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium tracking-widest uppercase">
            <svg width="9" height="9" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 1L9.5 6H15L10.5 9L12 14L8 11L4 14L5.5 9L1 6H6.5L8 1Z" />
            </svg>
            AI-powered code generation
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-center text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-5 text-balance cosmic-title leading-none">
          RIP{' '}
          <span className="text-primary">boilerplate.</span>
        </h1>
        <p className="text-center text-muted-foreground text-lg max-w-xl mx-auto mb-12 text-pretty leading-relaxed">
          Describe what you want to build. Watch the AI obliterate the blank canvas and ship production-ready React components instantly.
        </p>

        {/* Prompt input */}
        <div className="nebula-glow rounded-xl bg-card border border-border overflow-hidden">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe what you want to obliterate into code..."
            rows={3}
            className="w-full resize-none bg-transparent px-5 pt-4 pb-2 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none leading-relaxed"
          />
          <div className="flex items-center justify-between px-4 pb-3">
            <button
              type="button"
              aria-label="Attach file"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Paperclip size={16} />
            </button>
            <button
              type="button"
              disabled={!prompt.trim()}
              aria-label="Submit prompt"
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/80 transition-colors"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Suggestion chips */}
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setPrompt(s)}
              className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors bg-card/50"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
