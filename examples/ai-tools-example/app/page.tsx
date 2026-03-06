import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Features } from '@/components/features'

export default function Home() {
  return (
    <div className="min-h-screen nebula-ambient relative flex flex-col">
      <div className="star-field" aria-hidden="true" />
      <Header />
      <main className="relative z-10 flex-1 flex flex-col">
        <Hero />
        <Features />
      </main>
    </div>
  )
}
