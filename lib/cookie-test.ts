// Test function to check cookie handling
export const testCookieHandling = async () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
    (process.env.NODE_ENV === 'production' 
      ? "https://backend-rest-api-jwt-auth-rolebased.onrender.com" 
      : "http://localhost:4000");

  console.log("=== COOKIE TEST START ===");
  console.log("Current cookies:", document.cookie);
  console.log("BASE_URL:", BASE_URL);
  
  try {
    // Test 1: Check if we can make a request to the API
    const response = await fetch(`${BASE_URL}/api/auth/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log("Test response status:", response.status);
    console.log("Test response headers:", Object.fromEntries(response.headers.entries()));
    
    if (response.status === 401) {
      console.log("❌ 401 Unauthorized - No valid cookie found");
    } else {
      console.log("✅ Request successful");
    }
  } catch (error) {
    console.log("❌ Request failed:", error);
  }
  
  console.log("=== COOKIE TEST END ===");
};

// Test function to check CORS
export const testCORS = async () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
    (process.env.NODE_ENV === 'production' 
      ? "https://backend-rest-api-jwt-auth-rolebased.onrender.com" 
      : "http://localhost:4000");

  console.log("=== CORS TEST START ===");
  
  try {
    // Test OPTIONS request (preflight)
    const response = await fetch(`${BASE_URL}/api/auth/me`, {
      method: 'OPTIONS',
      credentials: 'include',
    });
    
    console.log("CORS preflight status:", response.status);
    console.log("CORS headers:", Object.fromEntries(response.headers.entries()));
  } catch (error) {
    console.log("❌ CORS test failed:", error);
  }
  
  console.log("=== CORS TEST END ===");
};
