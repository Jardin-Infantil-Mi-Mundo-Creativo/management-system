import { UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

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

export function AppSidebar() {
  const t = useTranslations('shared');

  const items = [
    {
      icon: UserPlus,
      title: t('sidebar.enrollStudent'),
      url: '/enroll-student',
    },
  ];

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
                {t('institutionInfo.appTitle')}
              </h1>
              <h2>{t('institutionInfo.institutionName')}</h2>
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
