// QuickActionsPanel → displays list of quick action cards in a grid

import { quickActions } from "@/features/dashboard/data/quick-actions";
import { QuickActionCard } from "@/features/dashboard/components/quick-action-card";

export function QuickActionsPanel() {
  return (
    
    // Wrapper → vertical spacing between title and grid
    <div className="space-y-4">

      {/* Section title */}
      <h2 className="text-lg font-semibold">Quick actions</h2>

      {/* Grid layout:
          - gap-4 → spacing between cards
          - md:grid-cols-2 → 2 columns on medium screens
          - xl:grid-cols-3 → 3 columns on large screens
      */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

        {/* Loop through quickActions array and render cards */}
        {quickActions.map((action) => (
          <QuickActionCard
            key={action.title} // unique key for React
            
            // passing props to each card
            title={action.title}
            description={action.description}
            gradient={action.gradient}
            href={action.href}
          />
        ))}

      </div>
    </div>
  );
};