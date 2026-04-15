/**
 * API URL helper.
 * - Server-side (SSR/SSG): uses the full backend URL directly
 * - Client-side (browser): uses the Next.js proxy (/api/...)
 */

// Full backend URL for server-side fetches
export const SERVER_API = 'http://localhost:3001';

// For client-side: empty string means relative URL (/api/...) which goes through Next.js proxy
export const CLIENT_API = '';

// Use this in server components (async functions, page.tsx without 'use client')
export const serverFetch = (path: string, options?: RequestInit) =>
  fetch(`${SERVER_API}${path}`, options);

// Use this in client components ('use client') — goes through Next.js proxy
export const clientApi = (path: string) => path; // just returns the path as-is
