import { Zap, Code2, Layers, Repeat2 } from 'lucide-react'

const FEATURES = [
  {
    icon: Zap,
    title: 'Instant generation',
    description:
      'Describe your component in plain English and get production-ready React code in seconds.',
  },
  {
    icon: Code2,
    title: 'Real TypeScript',
    description:
      'Every output is fully typed, accessible, and follows modern React patterns out of the box.',
  },
  {
    icon: Layers,
    title: 'Full-stack ready',
    description:
      'Generate server components, API routes, database schemas, and more — all from one prompt.',
  },
  {
    icon: Repeat2,
    title: 'Iterate in seconds',
    description:
      'Refine and iterate on your components with natural language follow-up prompts.',
  },
]

export function Features() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 mb-4 group-hover:border-primary/40 transition-colors">
                <Icon size={18} className="text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                {title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
