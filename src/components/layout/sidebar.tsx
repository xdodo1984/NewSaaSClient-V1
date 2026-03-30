"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { signOut } from "@/app/(auth)/actions"
import {
  LayoutDashboard,
  Users,
  FileText,
  Clock,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Orders", href: "/orders", icon: FileText },
  { name: "Analytics", href: "/analytics", icon: Clock },
  { name: "Billing", href: "/billing", icon: CreditCard },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-20 flex-col justify-between bg-brand-dark overflow-y-auto">
      <div className="flex flex-col items-center py-6">
        {/* Logo */}
        <Link href="/dashboard" className="mb-8 flex items-center justify-center">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-brand-primary text-white font-bold">
            W
          </div>
        </Link>
        
        {/* Navigation */}
        <nav className="flex flex-col items-center gap-4">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
                title={item.name}
              >
                <item.icon className="h-5 w-5" />
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="flex flex-col items-center gap-4 py-6">
        <Link
          href="/settings"
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
            pathname.startsWith("/settings")
              ? "bg-white/10 text-white"
              : "text-gray-400 hover:bg-white/5 hover:text-white"
          )}
          title="Settings"
        >
          <Settings className="h-5 w-5" />
        </Link>
        
        <form action={signOut}>
          <button
            type="submit"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
            title="Sign Out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </form>

        <button className="h-8 w-8 overflow-hidden rounded-full border border-gray-700">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="User avatar"
            className="h-full w-full object-cover"
          />
        </button>
      </div>
    </div>
  )
}
