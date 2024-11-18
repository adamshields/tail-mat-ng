// core/configs/app.config.ts
export const APP_CONFIG = {
  name: 'APPNAME',
  shortName: 'APP', // For mobile or space-constrained areas
  version: '1.0.0',
  titleSeparator: ' | ',  // For page titles
  company: 'Your Company',
  env: 'development',    // Could be tied to environment files
  // Add other global configs as needed
} as const;

// Can also create a type for type safety
export type AppConfig = typeof APP_CONFIG;
