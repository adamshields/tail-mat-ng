/** @type {import('tailwindcss').Config} */
module.exports = {
  // Specify the files Tailwind should scan for class names
  content: [
    "./src/**/*.{html,ts}",  // Adjust this path if your project structure differs
  ],
  // theme: {
  //   // Custom breakpoints for responsive design
  //   screens: {
  //     'xs': '475px',    // Extra small screens (phones)
  //     'sm': '640px',    // Small screens (large phones, small tablets)
  //     'md': '768px',    // Medium screens (tablets)
  //     'lg': '1024px',   // Large screens (desktops)
  //     'xl': '1280px',   // Extra large screens (large desktops)
  //     '2xl': '1536px',  // 2X large screens
  //     '3xl': '1920px',  // 3X large screens (HD)
  //     '4xl': '2560px',  // 4X large screens (4K and ultra-wide)
  //   },
  //   // Container configurations for centered, responsive layouts
  //   container: {
  //     center: true,
  //     padding: {
  //       DEFAULT: '1rem',
  //       sm: '2rem',
  //       lg: '4rem',
  //       xl: '5rem',
  //       '2xl': '6rem',
  //     },
  //     // Responsive container sizes
  //     screens: {
  //       sm: '640px',
  //       md: '768px',
  //       lg: '1024px',
  //       xl: '1280px',
  //       '2xl': '1536px',
  //       '3xl': '1920px',
  //       '4xl': '2560px',
  //     },
  //   },
  //   extend: {
  //     // // Material 3 color system integration
  //     // colors: {
  //     //   // Generate color utilities for each Material 3 color role
  //     //   // Usage example: bg-primary-50, text-secondary-900, etc.
  //     //   primary: generateMaterialColors('primary'),
  //     //   secondary: generateMaterialColors('secondary'),
  //     //   tertiary: generateMaterialColors('tertiary'),
  //     //   error: generateMaterialColors('error'),
  //     //   neutral: generateMaterialColors('neutral'),
  //     //   'neutral-variant': generateMaterialColors('neutral-variant'),
  //     // },
  //     // Typography scale combining custom sizes with Material 3
  //     fontSize: {
  //       // Custom font sizes
  //       'xxs': '0.625rem',  // For very small text in tables
  //       'xs': '0.75rem',
  //       'sm': '0.875rem',
  //       'base': '1rem',
  //       'lg': '1.125rem',
  //       'xl': '1.25rem',
  //       '2xl': '1.5rem',
  //       '3xl': '1.875rem',
  //       '4xl': '2.25rem',
  //       '5xl': '3rem',
  //       '6xl': '4rem',
  //       // Material 3 typography scale
  //       'display-large': ['3.5rem', { lineHeight: '4rem' }],
  //       'display-medium': ['2.8rem', { lineHeight: '3.25rem' }],
  //       'display-small': ['2.25rem', { lineHeight: '2.75rem' }],
  //       'headline-large': ['2rem', { lineHeight: '2.5rem' }],
  //       'headline-medium': ['1.75rem', { lineHeight: '2.25rem' }],
  //       'headline-small': ['1.5rem', { lineHeight: '2rem' }],
  //       'title-large': ['1.375rem', { lineHeight: '1.75rem' }],
  //       'title-medium': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.15px' }],
  //       'title-small': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.1px' }],
  //       'label-large': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.1px' }],
  //       'label-medium': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.5px' }],
  //       'label-small': ['0.6875rem', { lineHeight: '0.875rem', letterSpacing: '0.5px' }],
  //       'body-large': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.15px' }],
  //       'body-medium': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.25px' }],
  //       'body-small': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.4px' }],
  //     },
  //     // Custom spacing utilities
  //     spacing: {
  //       '72': '18rem',
  //       '84': '21rem',
  //       '96': '24rem',
  //     },
  //     // Custom max-width utilities
  //     maxWidth: {
  //       '1/4': '25%',
  //       '1/2': '50%',
  //       '3/4': '75%',
  //     },
  //     // Custom min-width utilities
  //     minWidth: {
  //       '0': '0',
  //       '1/4': '25%',
  //       '1/2': '50%',
  //       '3/4': '75%',
  //       'full': '100%',
  //     },
  //     // Set default font family (adjust if you're using a different font)
  //     fontFamily: {
  //       sans: ['Roboto', 'sans-serif'],
  //     },
  //   },
  // },
  // plugins: [],
}

// Helper function to generate Material 3 color utilities
function generateMaterialColors(colorName) {
  // const colors = {};
  // // Generate standard tones
  // for (let i = 0; i <= 100; i += 10) {
  //   colors[i] = `var(--mat-${colorName}-${i})`;
  // }
  // // Add special tones
  // colors[95] = `var(--mat-${colorName}-95)`;
  // colors[99] = `var(--mat-${colorName}-99)`;
  // // Set a default color (usually the 50 tone is a good middle ground)
  // colors.DEFAULT = `var(--mat-${colorName}-50)`;
  // return colors;
}

// To use this configuration effectively:
// 1. Ensure your Angular Material theme is set up to generate CSS variables for colors.
// 2. In your global styles or a dedicated theme file, include something like:
//    :root {
//      @include mat.all-component-themes($theme);
//
//      @each $color in (primary, secondary, tertiary, error, neutral, neutral-variant) {
//        @each $tone in (0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100) {
//          --mat-#{$color}-#{$tone}: #{mat.get-theme-color($theme, $color, $tone)};
//        }
//      }
//    }
//
// 3. You can now use Tailwind classes that leverage your Material 3 theme, like:
//    <button class="bg-primary-50 text-primary-900 hover:bg-primary-100">
//      Primary Button
//    </button>
//
// This configuration bridges Material 3 design with Tailwind's utility classes,
// allowing for consistent use of your theme colors and typography across your application.
