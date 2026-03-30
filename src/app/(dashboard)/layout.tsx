import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Sidebar fixed to the left */}
      <Sidebar />
      
      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden bg-white mt-4 mr-4 mb-4 rounded-3xl border border-gray-200 shadow-sm relative shadow-gray-200/50">
        <Header />
        <main className="flex-1 overflow-y-auto px-10 pb-10">
          {children}
        </main>
      </div>
    </div>
  )
}
