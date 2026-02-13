export const environment = {
  production: true,
  apiUrl: 'https://devmastery.com',
  enableAnalytics: true,
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
    siteUrl: 'https://devmastery.com',
    defaultImage: 'https://devmastery.com/assets/og-image.png',
  },
};
