import { Navbar } from "@/components/layout/admin/navbar"
import { Sidebar } from "@/components/layout/admin/sidebar"

export default function BackofficeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-slate-900">
        <Sidebar />
      </div>

      <main className="md:pl-72 h-full bg-slate-50/50">
        <Navbar />
        <div className="h-full p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}
