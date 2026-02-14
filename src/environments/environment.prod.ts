/** Canonical production URL (also deployed at https://cs-foundation.netlify.app) */
const siteUrl = 'https://cs-tutorial.vercel.app';

export const environment = {
  production: true,
  apiUrl: siteUrl,
  enableAnalytics: true,
  gaMeasurementId: 'G-65CDZ3EV04',
  enableServiceWorker: true,
  pistonApiUrl: 'https://emkc.org/api/v2/piston',
  codeExecutionRateLimit: {
    maxRequests: 5,
    windowMs: 60000,
  },
  features: {
    mermaid: true,
    monaco: true,
    codeExecution: true,
    darkMode: true,
  },
  seo: {
    siteName: 'DevMastery',
    siteUrl,
    defaultImage: `${siteUrl}/assets/og-image.png`,
  },
};
