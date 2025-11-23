import { UserPlus } from 'lucide-react';
import Link from 'next/link';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/shadcn/sidebar';
import { INSTITUTION_NAME } from '@/consts/shared';

const items = [
  {
    icon: UserPlus,
    title: 'Matricular estudiante',
    url: '/matricular-estudiante',
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel asChild className="h-fit">
            <Link
              href="/"
              className="flex-col items-start gap-1 mb-2 hover:bg-stone-100"
            >
              <h1 className="font-bold text-lg leading-tight">
                Sistema de gestión escolar
              </h1>
              <h2>{INSTITUTION_NAME}</h2>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
