import { SignIn } from "@clerk/nextjs";

// SignInPage renders a centered sign-in form using Clerk's SignIn component
export default function SignInPage() {
  return (

    // Center the sign-in card on the page
    <div className="flex min-h-screen items-center justify-center bg-background">

      {/* Render the Clerk SignIn component with custom appearance */}
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto", // Center the root box
            card: "shadow-lg",  // Add shadow to the card
          },
        }}
      />
    </div>
  );
}