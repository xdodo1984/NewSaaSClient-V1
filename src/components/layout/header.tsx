"use client"

import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()
  
  // Basic breadcrumb generation based on path
  const paths = pathname.split("/").filter(Boolean)
  const isSpecificPage = paths.length > 1
  const mainPage = paths[0]
    ? paths[0].charAt(0).toUpperCase() + paths[0].slice(1)
    : "Dashboard"
    
  let subPage = ""
  if (paths[1] === "new") {
    subPage = `New ${mainPage.slice(0, -1)}` // e.g. Orders -> New Order
  } else if (paths[1]) {
    subPage = "Details"
  }

  return (
    <header className="flex h-32 items-end pb-8 px-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {isSpecificPage ? subPage : mainPage}
        </h1>
        {isSpecificPage && (
          <div className="flex items-center text-sm font-medium text-gray-500">
            <span className="text-gray-400 hover:text-gray-900 cursor-pointer">{mainPage}</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{subPage}</span>
          </div>
        )}
      </div>
    </header>
  )
}
