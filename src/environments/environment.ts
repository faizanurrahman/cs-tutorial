export const environment = {
  production: false,
  apiUrl: 'http://localhost:4200',
  enableAnalytics: false,
  enableServiceWorker: false,
  pistonApiUrl: 'https://emkc.org/api/v2/piston',
  codeExecutionRateLimit: {
    maxRequests: 5,
    windowMs: 60000, // 1 minute
  },
  features: {
    mermaid: true,
    monaco: true,
    codeExecution: true,
    darkMode: true,
  },
  seo: {
    siteName: 'DevMastery',
    siteUrl: 'http://localhost:4200',
    defaultImage: '/assets/og-image.png',
  },
};
