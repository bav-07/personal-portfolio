/**
 * Utility function to detect if the user is on a mobile device
 * This focuses on actual mobile devices rather than just small screen widths
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check user agent for mobile devices
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // Check for touch capability
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Only consider mobile if it's a mobile user agent AND has touch capability
  // This excludes desktop users with small screens or desktop touch screens
  return isMobileUserAgent && isTouchDevice;
}

/**
 * Alternative function that includes screen size for theme toggle behavior
 * This is more aggressive and includes small desktop screens for theme reload behavior
 */
export function isMobileOrSmallScreen(): boolean {
  if (typeof window === 'undefined') return false;
  
  const isSmallViewport = window.innerWidth < 768; // md breakpoint
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Include small viewports OR mobile devices for theme toggle behavior
  return isSmallViewport || (isMobileUserAgent && isTouchDevice);
}