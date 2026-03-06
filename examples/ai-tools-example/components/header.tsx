export function Header() {
  return (
    <header className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-border/50 bg-background/60 backdrop-blur-md">
      <a href="/" className="flex items-center gap-2 group">
        <span className="flex items-center justify-center w-7 h-7 rounded-md border border-primary/30 bg-primary/10 group-hover:border-primary/60 transition-colors">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="text-primary"
          >
            <path
              d="M8 1L9.5 6H15L10.5 9L12 14L8 11L4 14L5.5 9L1 6H6.5L8 1Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
          RIP <span className="text-primary">code</span>
        </span>
      </a>

      <nav className="flex items-center gap-6">
        <a
          href="https://github.com/gethub-dev/v0-sdk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          GitHub
        </a>
        <a
          href="#"
          className="text-sm px-4 py-1.5 rounded-md border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
        >
          Get started
        </a>
      </nav>
    </header>
  )
}
