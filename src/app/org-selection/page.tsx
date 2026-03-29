// Import the OrganizationList component from Clerk for organization management UI
import { OrganizationList } from "@clerk/nextjs";

// OrgSelectionPage renders a centered organization selection/creation form using Clerk's OrganizationList
export default function OrgSelectionPage() {
    return (

        // Center the organization list card on the page
        <div className="flex min-h-screen items-center justify-center bg-background">
            
            {/* Render the Clerk OrganizationList component with custom appearance */}
            <OrganizationList
                hidePersonal // Hide the personal workspace option
                afterCreateOrganizationUrl="/" // Redirect after creating an organization
                afterSelectOrganizationUrl="/" // Redirect after selecting an organization
                appearance={{
                    elements: {
                        rootBox: "mx-auto", // Center the root box
                        card: "shadow-lg",  // Add shadow to the card
                    },
                }}
            />
        </div>
    );
};