import { Headphones, ThumbsUp } from "lucide-react";
import Link from "next/link";

// UI components
import { Button } from "@/components/ui/button";        
import { SidebarTrigger } from "@/components/ui/sidebar"; // button to toggle sidebar

// cn() → utility to merge class names safely
// - combines default classes + optional className prop
// - avoids undefined/null issues
// - helps override/extend styles cleanly
import { cn } from "@/lib/utils";



// PageHeader component
// - Displays page title
// - Includes sidebar toggle
// - Shows action buttons (feedback + help)
export function PageHeader({title,className}: {
  title: string;        // title to display in header
  className?: string;   // optional extra styling
}){
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b px-4 py-4", 
        className, // allow custom styles from props
      )}
    >
      
      {/* LEFT SECTION: Sidebar toggle + Page title */}
      <div className="flex items-center gap-2">
        
        {/* Sidebar open/close button */}
        <SidebarTrigger />

        {/* Page title */}
        <h1 className="text-lg font-semibold tracking-tight">
          {title}
        </h1>
      </div>

      {/* RIGHT SECTION: Feedback and Help buttons */}
      <div className="flex items-center gap-3">
        
         {/* Feedback Button */}
         <Button variant="outline" size="sm" asChild>
            
            {/* asChild → makes Link behave like Button */}
            <Link href="mailto:lakshayrathore1879@gmail.com">
              
              {/* Icon */}
              <ThumbsUp />

              {/* Text (hidden on small screens) */}
              <span className="hidden lg:block">Feedback</span>
            </Link>
         </Button>

         {/* Help Button */}
         <Button variant="outline" size="sm" asChild>
          
          <Link href="mailto:lakshayrathore1879@gmail.com">
            
            {/* Icon */}
            <Headphones />

            {/* Text (hidden on small screens) */}
            <span className="hidden lg:block">Need help?</span>
          </Link>
        </Button>
      </div>

    </div>
  );
};