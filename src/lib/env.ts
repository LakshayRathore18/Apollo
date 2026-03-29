/**
 * 📌 WHAT THIS FILE DOES:
 * This file validates environment variables (from .env file)
 * before the app starts.
 * 
 * It ensures:
 * - Required variables (like DATABASE_URL) exist
 * - They are in correct format (string, not empty, etc.)
 * - Prevents runtime errors due to missing env variables
 * 
 * It exports a safe `env` object which you can use
 * instead of directly using process.env.
 */


/**
 * 📌 WHAT IS T3 OSS (VERY SHORT):
 * T3 OSS is a set of open-source tools used in the T3 stack.
 * 
 * "@t3-oss/env-nextjs" helps:
 * - Validate environment variables
 * - Make them type-safe
 * - Catch errors early (before app runs)
 */


// Zod is used to define validation rules (schema)
import { z } from "zod";

// createEnv is a helper that reads and validates env variables
import { createEnv } from "@t3-oss/env-nextjs";


// Create and export validated environment variables
export const env = createEnv({

  // SERVER-SIDE environment variables
  server: {
    DATABASE_URL: z.string().min(1),
  },

  // Used to expose env variables to client-side (empty here)
  // If needed, you pass variables like:
  // NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  experimental__runtimeEnv: {},

  // If SKIP_ENV_VALIDATION=true in environment,
  // validation will be skipped (useful in build/deployment)
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});