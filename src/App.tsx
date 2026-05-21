import { ThemeToggle } from '@/components/theme'
import { HomePage } from '@/pages'

function App() {
  return (
    <main className="min-h-screen bg-white text-slate-950 transition-colors dark:bg-slate-950 dark:text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-6 px-4">
        <h1 className="text-4xl font-bold">CineVault</h1>

        <HomePage />
        <ThemeToggle />
      </div>
    </main>
  )
}

export default App
