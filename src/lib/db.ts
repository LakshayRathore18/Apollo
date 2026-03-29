/**
 * Creates and exports a Prisma client (used to talk to the database).
 *
 * In development, it reuses the same client using the global object
 * to avoid creating too many database connections during reloads.
 *
 * In production, it creates a new client normally.
 */


// Import the PrismaClient, which is the main way to interact with your database using Prisma.
import { PrismaClient } from "@/generated/prisma/client";

// Import the PrismaPg adapter, which allows Prisma to connect to a PostgreSQL database.
import { PrismaPg } from "@prisma/adapter-pg";

// Import environment variables, which include the database connection string.
import { env } from "./env";

// Create a new PrismaPg adapter instance using the database connection string from environment variables.
// This adapter tells Prisma how to connect to yo`ur PostgreSQL database.
const adapter = new PrismaPg({
    connectionString: env.DATABASE_URL, // The URL for your database, set in your environment variables.
});


// Extend the Node.js global object with a custom property `prisma`.
// - `global` is a built-in object in Node.js that persists across module reloads.
// - TypeScript doesn't know that `global.prisma` exists, so we "cast" it.
//
// `as unknown as { prisma: PrismaClient }` means:
// 1. Treat `global` as `unknown` (wipe its existing type temporarily)
// 2. Then re-assert it as an object that MAY contain `prisma`
//
// This does NOT create the property — it only tells TypeScript:
// "trust me, this property might exist".
const globalForPrisma = global as unknown as { prisma: PrismaClient };


// Create or reuse a PrismaClient instance.
//
// What happens here step-by-step:
// 1. Check if `globalForPrisma.prisma` already exists
//    → This would happen if the app reloaded (e.g. during development with hot reload)
// 2. If it exists → reuse that same instance
// 3. If it does NOT exist → create a new PrismaClient
//
// Why?
// - In development, files reload often → new PrismaClients would pile up
// - Each client opens DB connections → leads to "too many connections" errors
//
// So this line ensures:
// 👉 Only ONE PrismaClient is used across reloads
const prisma =
  globalForPrisma.prisma || new PrismaClient({ adapter });


// In development ONLY:
// Save the created PrismaClient onto the global object
//
// So next time this file reloads:
// - `global.prisma` already exists
// - The previous client gets reused instead of creating a new one
//
// In production:
// - Code runs once → no hot reload → no need to cache globally
if (process.env.NODE_ENV !== "production") 
  globalForPrisma.prisma = prisma;


// Export the Prisma client so it can be used in other parts of your app to access the database.
export { prisma };