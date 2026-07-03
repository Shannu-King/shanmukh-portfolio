// Get the GA Tracking ID from Vite's env variables
export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

/**
 * Log a custom event to Google Analytics
 * @param action Event action name (e.g., 'download_resume')
 * @param category Event category (e.g., 'engagement')
 * @param label Event label for details (e.g., 'Hero Button')
 */
export function trackEvent(action: string, category: string, label: string) {
  if (typeof window !== "undefined" && (window as any).gtag && GA_TRACKING_ID) {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  }
}

/**
 * Log a page view or section view to Google Analytics
 * @param path Path name or section hash (e.g., '/#about')
 * @param title Page or section title for details
 */
export function trackPageView(path: string, title?: string) {
  if (typeof window !== "undefined" && (window as any).gtag && GA_TRACKING_ID) {
    (window as any).gtag("config", GA_TRACKING_ID, {
      page_path: path,
      page_title: title || document.title,
    });
  }
}

