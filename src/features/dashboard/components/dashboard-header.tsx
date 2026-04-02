"use client";

import { useUser } from "@clerk/nextjs";    // Clerk hook to get current logged-in user
import Link from "next/link";
import { Headphones, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";


// DashboardHeader component
// - Greets the user
// - Shows their name
// - Displays action buttons (feedback/help)
export function DashboardHeader() {

  // Get user data from Clerk
  const { isLoaded, user } = useUser();

  return (
    // Main container → space between greeting (left) and buttons (right)
    <div className="flex items-start justify-between">
      
      {/* LEFT SECTION: Greeting + User Name */}
      <div className="space-y-1">
        
        {/* Small greeting text */}
        <p className="text-sm text-muted-foreground">
          Nice to see you
        </p>

        {/* User name */}
        <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">
          
          {/* Logic:
              - Wait until user is loaded
              - Show fullName if available
              - else firstName
              - else fallback "there"
              - while loading → show "..."
          */}
          {isLoaded ? (user?.fullName ?? user?.firstName ?? "there") : "..."}
        </h1>
      </div>

      {/* RIGHT SECTION: Action buttons (only visible on large screens) */}
      <div className="lg:flex items-center gap-3 hidden">
        
        {/* Feedback Button */}
        <Button variant="outline" size="sm" asChild>
          
          {/* asChild → Link behaves like Button */}
          <Link href="mailto:lakshayrathore1879@gmail.com">
            
            {/* Icon */}
            <ThumbsUp />

            {/* Text hidden on small screens */}
            <span className="hidden lg:block">Feedback</span>
          </Link>
        </Button>

        {/* Help Button */}
        <Button variant="outline" size="sm" asChild>
          <Link href="mailto:lakshayrathore1879@gmail.com">
            
            {/* Icon */}
            <Headphones />

            {/* Text hidden on small screens */}
            <span className="hidden lg:block">Need help?</span>
          </Link>
        </Button>
      </div>

    </div>
  );
};