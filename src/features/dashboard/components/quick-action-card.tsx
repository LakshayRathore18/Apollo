// QuickActionCard → small card showing feature preview + CTA

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { QuickAction } from "@/features/dashboard/data/quick-actions";
import { cn } from "@/lib/utils";

// Props come from QuickAction type (title, description, gradient, href)
type QuickActionCardProps = QuickAction;

export function QuickActionCard({
  title,
  description,
  gradient,
  href,
}: QuickActionCardProps) {
  return (

    // Card container → flex layout with spacing + border
    <div className="flex gap-4 rounded-xl border bg-card p-3">

      {/* LEFT: Visual preview box (gradient background) */}
      <div
        className={cn(
          "relative h-31 w-41 shrink-0 overflow-hidden rounded-xl bg-linear-to-br",
          gradient, // dynamic gradient passed from data
        )}
      >
        {/* Center circle decoration */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-12 rounded-full bg-white/30" />
        </div>

        {/* Inner border ring effect */}
        <div className="absolute inset-2 rounded-lg ring-2 ring-inset ring-white/20" />
      </div>

      {/* RIGHT: Content section */}
      <div className="flex flex-col justify-between py-1">

        {/* Title + description */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* CTA Button */}
        <Button 
          variant="outline" 
          size="xs" 
          className="w-fit" 
          asChild
        >
          {/* asChild → Link behaves like Button */}
          <Link href={href}>
            Try now
            <ArrowRight className="size-3" /> {/* small arrow icon */}
          </Link>
        </Button>
      </div>
    </div>
  )
};