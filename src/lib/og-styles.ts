/**
 * OG Style Utilities - Tailwind CSS values converted to inline styles
 */

export const ogStyles = {
  colors: {
    primary: {
      200: '#dbff00', // rgb(219, 255, 0)
      300: '#00ffff', // rgb(0, 255, 255)
      400: '#7900f3', // rgb(121, 0, 243)
      500: '#00c4fd', // rgb(0, 196, 253)
    },
    slate: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    white: '#ffffff',
    black: '#000000',
    dark: '#222222',
  },

  // Typography utilities
  text: {
    xs: { fontSize: '12px', lineHeight: '16px' },
    sm: { fontSize: '14px', lineHeight: '20px' },
    base: { fontSize: '16px', lineHeight: '24px' },
    lg: { fontSize: '18px', lineHeight: '28px' },
    xl: { fontSize: '20px', lineHeight: '28px' },
    '2xl': { fontSize: '24px', lineHeight: '32px' },
    '3xl': { fontSize: '30px', lineHeight: '36px' },
    '4xl': { fontSize: '36px', lineHeight: '40px' },
    '5xl': { fontSize: '48px', lineHeight: '1' },
    '6xl': { fontSize: '60px', lineHeight: '1' },
    '7xl': { fontSize: '72px', lineHeight: '1' },
    '8xl': { fontSize: '96px', lineHeight: '1' },
  },

  // Font weights
  font: {
    thin: { fontWeight: '100' },
    extralight: { fontWeight: '200' },
    light: { fontWeight: '300' },
    normal: { fontWeight: '400' },
    medium: { fontWeight: '500' },
    semibold: { fontWeight: '600' },
    bold: { fontWeight: '700' },
    extrabold: { fontWeight: '800' },
    black: { fontWeight: '900' },
  },

  // Letter spacing
  tracking: {
    tighter: { letterSpacing: '-0.05em' },
    tight: { letterSpacing: '-0.025em' },
    normal: { letterSpacing: '0em' },
    wide: { letterSpacing: '0.025em' },
    wider: { letterSpacing: '0.05em' },
    widest: { letterSpacing: '0.1em' },
  },

  // Spacing
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
    32: '128px',
  },

  // Border radius
  rounded: {
    none: { borderRadius: '0px' },
    sm: { borderRadius: '2px' },
    DEFAULT: { borderRadius: '4px' },
    md: { borderRadius: '6px' },
    lg: { borderRadius: '8px' },
    xl: { borderRadius: '12px' },
    '2xl': { borderRadius: '16px' },
    '3xl': { borderRadius: '24px' },
    full: { borderRadius: '9999px' },
  },

  // Shadows
  shadow: {
    sm: { boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
    DEFAULT: {
      boxShadow:
        '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    },
    md: {
      boxShadow:
        '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    },
    lg: {
      boxShadow:
        '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    },
    xl: {
      boxShadow:
        '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
  },

  gradients: {
    primary: 'linear-gradient(135deg, #00c4fd 0%, #7900f3 100%)',
    primaryReverse: 'linear-gradient(135deg, #7900f3 0%, #00c4fd 100%)',
    rainbow:
      'linear-gradient(135deg, #00c4fd 0%, #7900f3 30%, #00ffff 70%, #dbff00 100%)',
    dark: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    darkSubtle:
      'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
  },

  textShadow: {
    primary: '0 0 30px rgba(0, 196, 253, 0.3)',
    primaryStrong: '0 0 20px rgba(0, 196, 253, 0.5)',
    dark: '0 2px 4px rgba(0, 0, 0, 0.3)',
  },

  // Filters
  filter: {
    blur: {
      sm: 'blur(4px)',
      DEFAULT: 'blur(8px)',
      md: 'blur(12px)',
      lg: 'blur(16px)',
    },
  },

  // Layout utilities
  layout: {
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    centerColumn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    spaceBetween: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
};

export const combineStyles = (...styles: any[]) => {
  return Object.assign({}, ...styles);
};

export const ogPresets = {
  heroTitle: combineStyles(
    ogStyles.text['6xl'],
    ogStyles.font.black,
    ogStyles.tracking.tight,
    {
      color: ogStyles.colors.primary[500],
      textShadow: ogStyles.textShadow.primary,
      lineHeight: 1.1,
    },
  ),

  heroSubtitle: combineStyles(
    ogStyles.text['2xl'],
    ogStyles.font.semibold,
    ogStyles.tracking.normal,
    {
      color: ogStyles.colors.slate[300],
      marginBottom: ogStyles.spacing[6],
    },
  ),

  bodyText: combineStyles(ogStyles.text.lg, ogStyles.font.normal, {
    color: ogStyles.colors.slate[400],
    lineHeight: 1.6,
  }),

  brandUrl: combineStyles(
    ogStyles.text.xl,
    ogStyles.font.bold,
    ogStyles.tracking.tight,
    {
      color: ogStyles.colors.primary[500],
      textShadow: ogStyles.textShadow.primaryStrong,
    },
  ),

  // Background containers
  bgDark: {
    backgroundColor: ogStyles.colors.slate[900],
    background: ogStyles.gradients.dark,
  },

  bgPrimary: {
    background: ogStyles.gradients.primary,
  },

  // Decorative elements
  decorativeCircle: {
    borderRadius: ogStyles.rounded.full.borderRadius,
    background: ogStyles.gradients.primary,
    opacity: 0.1,
    filter: ogStyles.filter.blur.DEFAULT,
  },
};

export default ogStyles;
