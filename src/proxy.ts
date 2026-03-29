/**
 * Middleware for handling authentication and organization flow using Clerk.
 *
 * - Allows public routes (sign-in / sign-up)
 * - Forces users to log in if not authenticated
 * - Allows access to org-selection page
 * - Redirects logged-in users without an org to org-selection
 * - Lets all other valid requests pass through
 */

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Create a function to check if route is public (no login required)
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)", 
  "/sign-up(.*)"
]);

// Create a function to check if route is org selection page
const isOrgSelectionRoute = createRouteMatcher([
  "/org-selection(.*)"
]);


// Main middleware (runs on every request)
export default clerkMiddleware(async (auth, req) => {

  // Get user info from Clerk
  const { userId, orgId } = await auth();
  // userId → logged-in user
  // orgId → selected organization

  // 1. Allow public routes (sign-in / sign-up)
  if (isPublicRoute(req)) {
    return NextResponse.next(); // continue request
  }

  // 2. Protect routes (force login if not logged in)
  if (!userId) {
    await auth.protect(); 
    // if user not logged in → redirect to sign-in automatically
  }

  // 3. Allow org selection page
  if (isOrgSelectionRoute(req)) {
    return NextResponse.next();
  }

  // 4. If logged in but no org selected → redirect
  if (userId && !orgId) {
    const orgSelection = new URL("/org-selection", req.url);
    // creates full URL like http://localhost:3000/org-selection

    return NextResponse.redirect(orgSelection);
    // send user to org selection page
  }

  // 5. Everything is fine → allow request
  return NextResponse.next();
});

// ⚙️ Middleware config (where it should run)
export const config = {
  matcher: [
    // Run middleware on all routes EXCEPT:
    // - Next.js internals (_next)
    // - Static files (images, css, js, etc.)
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

    // Always run middleware for API and TRPC routes
    '/(api|trpc)(.*)',
  ],
};