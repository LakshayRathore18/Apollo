"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  OrganizationSwitcher,
  UserButton,
  useClerk
} from "@clerk/nextjs";
import {
  type LucideIcon,
  Home,
  LayoutGrid,
  AudioLines,
  Volume2,
  Settings,
  Headphones,
} from "lucide-react";
import Link from "next/link";
// import { UsageContainer } from "@/features/billing/components/usage-container";
// import { VoiceCreateDialog } from "@/features/voices/components/voice-create-dialog";
import { useState } from "react";

interface MenuItem {
  title: string;        // display text
  url?: string;         // optional link
  icon: LucideIcon;     // icon component
  onClick?: () => void; // optional action
};

interface NavSectionProps {
  label?: string;       // section title
  items: MenuItem[];    // list of items
  pathname: string;     // current route
};

// Component for rendering a sidebar section with optional label and list of menu items
function NavSection({ label, items, pathname }: NavSectionProps) {
  // label → section title (like "Dashboard")
  // items → array of menu items (each has title, icon, url, etc.)
  // pathname → current route (like "/dashboard")

  return (
    <SidebarGroup> {/* wrapper for one sidebar section */}
      
      {/* If label exists, show section title */}
      {label && (
        <SidebarGroupLabel className="text-[13px] uppercase text-muted-foreground">
          {label}
        </SidebarGroupLabel>
      )}

      <SidebarGroupContent> {/* contains actual menu */}
        <SidebarMenu>

          {/* Loop through all items */}
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>

              <SidebarMenuButton
                asChild={!!item.url}    // !! converts to boolean → true if url exists, false if not
                // if item has URL → render as link

                isActive={
                  item.url
                    ? item.url === "/"
                      ? pathname === "/" 
                      // special case for home "/"
                      : pathname.startsWith(item.url)
                      // highlight if current path starts with item url
                    : false
                }

                onClick={item.onClick} 
                // if no URL → maybe button action

                tooltip={item.title} 
                // hover tooltip

                className="h-9 px-3 py-2 text-[13px] tracking-tight font-medium border border-transparent data-[active=true]:border-border data-[active=true]:shadow-[0px_1px_1px_0px_rgba(44,54,53,0.03),inset_0px_0px_0px_2px_white]"
                // styling (active state adds border + shadow)
              >

                {/* If item has URL → clickable link */}
                {item.url ? (
                  <Link href={item.url}>
                    <item.icon />   {/* icon component */}
                    <span>{item.title}</span>
                  </Link>
                ) : (
                  <>
                    {/* If no URL → just button */}
                    <item.icon />
                    <span>{item.title}</span>
                  </>
                )}

              </SidebarMenuButton>

            </SidebarMenuItem>
          ))}

        </SidebarMenu>
      </SidebarGroupContent>

    </SidebarGroup>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const clerk = useClerk();
  const [voiceDialogOpen, setVoiceDialogOpen] = useState(false);

  // Define main menu items with title, url, icon, and optional onClick action
  const mainMenuItems: MenuItem[] = [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: "Explore voices",
      url: "/voices",
      icon: LayoutGrid,
    },
    {
      title: "Text to speech",
      url: "/text-to-speech",
      icon: AudioLines,
    },
    {
      title: "Voice cloning",
      icon: Volume2,
      onClick: () => setVoiceDialogOpen(true),
    },
  ];

  // Define "Others" menu items (like settings, support) with actions   
  const othersMenuItems: MenuItem[] = [
    {
      title: "Settings",
      icon: Settings,
      onClick: () => clerk.openOrganizationProfile(),
    },
    {
      title: "Help and support",
      url: "mailto:lakshayrathore@1879gmail.com",
      icon: Headphones,
    },
  ];

  return (
    <>
    {/* <VoiceCreateDialog
      open={voiceDialogOpen}
      onOpenChange={setVoiceDialogOpen}
    /> */}

    <Sidebar collapsible="icon">
    
      {/* Header */}
      <SidebarHeader className="flex flex-col gap-4 pt-4">
        
        {/* Logo */}
        <div 
        className="flex items-center gap-2 pl-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:pl-0">
          <Image
            src="/logo.svg"
            alt="Apollo"
            width={24}
            height={24}
            className="rounded-sm"
          />
          <span className="group-data-[collapsible=icon]:hidden font-semibold text-lg tracking-tighter text-foreground">
            Apollo   
          </span>
          <SidebarTrigger className="ml-auto lg:hidden" />
        </div>
        
        {/* Organization Switcher */}
        <SidebarMenu>
          <SidebarMenuItem>
            
            <OrganizationSwitcher
              hidePersonal      // this hides the "personal account" option, showing only organizations
              fallback={        // while loading orgs, show skeleton placeholder
                <Skeleton    
                  className="h-8.5 w-full group-data-[collapsible=icon]:size-8 rounded-md border bg-white"
                />
              }
              appearance={{     // this is how we customize the look of the organization switcher to fit our sidebar design
                elements: {
                  rootBox: 
                    "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!",
                  organizationSwitcherTrigger:
                    "w-full! justify-between! bg-white! border! border-border! rounded-md! pl-1! pr-2! py-1! gap-3! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! shadow-[0px_1px_1.5px_0px_rgba(44,54,53,0.03)]!",
                  organizationPreview: "gap-2!",
                  organizationPreviewAvatarBox: "size-6! rounded-sm!",
                  organizationPreviewTextContainer: 
                    "text-xs! tracking-tight! font-medium! text-foreground! group-data-[collapsible=icon]:hidden!",
                  organizationPreviewMainIdentifier: "text-[13px]!",
                  organizationSwitcherTriggerIcon:
                    "size-4! text-sidebar-foreground! group-data-[collapsible=icon]:hidden!",
                },
              }}
            />
          </SidebarMenuItem>

        </SidebarMenu>

      </SidebarHeader>
      
      <div className="border-b border-dashed border-border" />
      
      {/* Main Content */}
      <SidebarContent>
        
        {/* main menu items */}
        <NavSection items={mainMenuItems} pathname={pathname} />
        
        {/* Others - just added label rest same as main menu items */}
        <NavSection
          label="Others"
          items={othersMenuItems}
          pathname={pathname}
        />

      </SidebarContent>
      
      <div className="border-b border-dashed border-border" />
      
      <SidebarFooter className="gap-3 py-3">
        {/* <UsageContainer /> */}
        <SidebarMenu>
          <SidebarMenuItem>
            <UserButton
              showName      // show user name next to avatar
              fallback={    // while loading user data, show skeleton placeholder for the user button
                <Skeleton className="h-8.5 w-full group-data-[collapsible=icon]:size-8 rounded-md border border-border bg-white" />
              }
              //  this is how we customize the look of the user button in the sidebar footer to fit our design
              appearance={{
                elements: {
                  rootBox:
                    "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!",
                  userButtonTrigger:
                    "w-full! justify-between! bg-white! border! border-border! rounded-md! pl-1! pr-2! py-1! shadow-[0px_1px_1.5px_0px_rgba(44,54,53,0.03)]! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! group-data-[collapsible=icon]:after:hidden! [--border:color-mix(in_srgb,transparent,var(--clerk-color-neutral,#000000)_15%)]!",
                  userButtonBox: "flex-row-reverse! gap-2!",
                  userButtonOuterIdentifier: "text-[13px]! tracking-tight! font-medium! text-foreground! pl-0! group-data-[collapsible=icon]:hidden!",
                  userButtonAvatarBox: "size-6!",
                }
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
     
      <SidebarRail />   {/* this is the clickable line on the left that allows collapsing the sidebar to just icons */}
    </Sidebar>
    </>
  );
}