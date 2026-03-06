'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { ChatSelector } from './chat-selector'
import { MobileMenu } from './mobile-menu'
import { useSession } from 'next-auth/react'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/ui/button'
import { VercelIcon, GitHubIcon } from '@/components/ui/icons'
import { DEPLOY_URL } from '@/lib/constants'
import { Info } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface AppHeaderProps {
  className?: string
}

// Component that uses useSearchParams - needs to be wrapped in Suspense
function SearchParamsHandler() {
  const searchParams = useSearchParams()
  const { update } = useSession()

  // Force session refresh when redirected after auth
  useEffect(() => {
    const shouldRefresh = searchParams.get('refresh') === 'session'

    if (shouldRefresh) {
      // Force session update
      update()

      // Clean up URL without causing navigation
      const url = new URL(window.location.href)
      url.searchParams.delete('refresh')
      window.history.replaceState({}, '', url.pathname)
    }
  }, [searchParams, update])

  return null
}

export function AppHeader({ className = '' }: AppHeaderProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const isHomepage = pathname === '/'
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false)

  // Handle logo click - reset UI if on homepage, otherwise navigate to homepage
  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHomepage) {
      e.preventDefault()
      // Add reset parameter to trigger UI reset
      window.location.href = '/?reset=true'
    }
    // If not on homepage, let the Link component handle navigation normally
  }

  return (
    <div
      className={`${!isHomepage ? 'border-b border-border' : ''} bg-background/80 backdrop-blur-md ${className}`}
    >
      {/* Handle search params with Suspense boundary */}
      <Suspense fallback={null}>
        <SearchParamsHandler />
      </Suspense>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Selector */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              onClick={handleLogoClick}
              className="flex items-center gap-2 group"
            >
              {/* Cosmic skull/star logo mark */}
              <span className="relative flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 border border-primary/30 group-hover:border-primary/60 transition-colors">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-primary">
                  <path d="M8 1L9.5 6H15L10.5 9L12 14L8 11L4 14L5.5 9L1 6H6.5L8 1Z" fill="currentColor"/>
                </svg>
              </span>
              <span className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                RIP <span className="text-primary">code</span>
              </span>
            </Link>
            {/* Hide ChatSelector on mobile */}
            <div className="hidden lg:block">
              <ChatSelector />
            </div>
          </div>

          {/* Desktop right side - What's This, GitHub, Deploy, and User */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="outline"
              className="py-1.5 px-2 h-fit text-sm"
              onClick={() => setIsInfoDialogOpen(true)}
            >
              <Info size={16} />
              What's This?
            </Button>
            <Button
              variant="outline"
              className="py-1.5 px-2 h-fit text-sm"
              asChild
            >
              <Link
                href="https://github.com/vercel/v0-sdk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon size={16} />
                vercel/v0-sdk
              </Link>
            </Button>

            {/* Deploy with Vercel button - hidden on mobile */}
            <Button
              className="bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-900 py-1.5 px-2 h-fit text-sm"
              asChild
            >
              <Link href={DEPLOY_URL} target="_blank" rel="noopener noreferrer">
                <VercelIcon size={16} />
                Deploy with Vercel
              </Link>
            </Button>
            <UserNav session={session} />
          </div>

          {/* Mobile right side - Only menu button and user avatar */}
          <div className="flex lg:hidden items-center gap-2">
            <UserNav session={session} />
            <MobileMenu onInfoDialogOpen={() => setIsInfoDialogOpen(true)} />
          </div>
        </div>
      </div>

      {/* Info Dialog */}
      <Dialog open={isInfoDialogOpen} onOpenChange={setIsInfoDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4 text-foreground">
              RIP <span className="text-primary">code</span> Platform
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              This is a <strong className="text-foreground">demo</strong> of a{' '}
              <a
                href="https://v0.app"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-primary hover:text-primary/80"
              >
                RIP code
              </a>{' '}
              platform where you describe what to build and AI destroys the boilerplate — generating production-ready React components instantly.
            </p>
            <p>
              Built with{' '}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-primary hover:text-primary/80"
              >
                Next.js
              </a>{' '}
              and the{' '}
              <a
                href="https://v0-sdk.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-primary hover:text-primary/80"
              >
                v0 SDK
              </a>
              . Full auth, database, and real-time streaming included.
            </p>
            <p>
              Try the demo or{' '}
              <a
                href={DEPLOY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-primary hover:text-primary/80"
              >
                deploy your own instance
              </a>
              .
            </p>
          </div>
          <div className="flex justify-end mt-6">
            <Button
              onClick={() => setIsInfoDialogOpen(false)}
              className="bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900"
            >
              Try now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
