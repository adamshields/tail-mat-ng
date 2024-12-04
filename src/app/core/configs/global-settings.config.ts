import { SITE_NAVIGATION } from "./navigation.config";

// core/configs/settings.config.ts
export const GLOBAL_APP_CONFIG = {
  name: 'APPNAME',
  shortName: 'APP', // For mobile or space-constrained areas
  version: '1.0.0',
  titleSeparator: ' | ', // For page titles
  company: 'Your Company',
  navigation: SITE_NAVIGATION,
  features: {
    allowColorPicker: false, // Allow users to change the theme color
  },
} as const;

// Export type for type safety
export type AppConfig = typeof GLOBAL_APP_CONFIG;
