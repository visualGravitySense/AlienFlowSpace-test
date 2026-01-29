import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get the correct path for static assets (images, etc.) that works with GitHub Pages base path
 * @param path - Path starting with "/" (e.g., "/lovable-uploads/image.png")
 * @returns Path with base URL prepended (e.g., "/AlienFlowSpace-test/lovable-uploads/image.png" on GitHub Pages)
 */
export function getAssetPath(path: string): string {
  const base = import.meta.env.BASE_URL
  // Remove trailing slash from base if present, then combine with path
  const basePath = base.endsWith('/') ? base.slice(0, -1) : base
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${basePath}/${cleanPath}`
}
