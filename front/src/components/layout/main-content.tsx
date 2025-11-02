"use client"

import type { ReactNode } from "react"
import { useSidebar, SidebarTrigger } from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from '@/lib/utils'

export default function MainContent({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const { open } = useSidebar()
  const isMobile = useIsMobile()

  return (
    <main>
      <SidebarTrigger className="mt-2 fixed hover:cursor-pointer" />
      <div
        className={cn(
          'mt-10',
          isMobile ? 'px-8' : open ? 'pr-1.5' : 'px-6'
        )}
        style={{ width: isMobile ? '100dvw' : open ? 'calc(100dvw - var(--sidebar-width))' : '100dvw' }}
      >
        {children}
      </div>
    </main>
  )
}
