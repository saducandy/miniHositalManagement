/**
 * API Configuration
 * Centralized base URL for all API requests
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://back.bdsec.org";

/**
 * Helper function to get the full API URL
 * @param endpoint - API endpoint (e.g., '/api/ec-doctors')
 * @returns Full API URL
 */
export const getApiUrl = (endpoint: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

/**
 * Helper function to get full image URL
 * @param imagePath - Image path from API
 * @returns Full image URL
 */
export const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) return "";

  // If already a full URL, return as is
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // Otherwise, prepend base URL
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${API_BASE_URL}${cleanPath}`;
};
