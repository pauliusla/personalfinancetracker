import {useColorScheme} from 'react-native';

// Define the color palette for light and dark themes
const lightColors = {
  background: '#FFFFFF',
  primary: '#0A84FF',
  secondary: '#5856D6',
  text: '#1C1C1E',
  textSecondary: '#3A3A3C',
  border: '#D1D1D6',
  card: '#FFFFFF',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  link: '#007AFF',
};

const darkColors = {
  background: '#1C1C1E',
  primary: '#0A84FF',
  secondary: '#5E5CE6',
  text: '#FFFFFF',
  textSecondary: '#E5E5EA',
  border: '#3A3A3C',
  card: '#2C2C2E',
  success: '#30D158',
  warning: '#FF9F0A',
  error: '#FF453A',
  link: '#0A84FF',
};

// Define types for color themes
type ThemeColors = typeof lightColors;

// Define types for theme spacing and text styles
interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

interface ThemeTextStyles {
  heading: {
    fontSize: number;
    fontWeight: '700';
    color: string;
  };
  body: {
    fontSize: number;
    fontWeight: '400';
    color: string;
  };
  button: {
    fontSize: number;
    fontWeight: '600';
    color: string;
  };
}

// Define the complete Theme interface
interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
  text: ThemeTextStyles;
}

// Create a function that returns the theme based on the color scheme
const theme = (colorScheme: 'light' | 'dark'): Theme => ({
  colors: colorScheme === 'dark' ? darkColors : lightColors,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
  },
  text: {
    heading: {
      fontSize: 24,
      fontWeight: '700',
      color: colorScheme === 'dark' ? darkColors.text : lightColors.text,
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      color:
        colorScheme === 'dark'
          ? darkColors.textSecondary
          : lightColors.textSecondary,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      color: colorScheme === 'dark' ? darkColors.text : lightColors.text,
    },
  },
});

// Custom hook to access the theme based on the system color scheme
export const useTheme = (): Theme => {
  const colorScheme = useColorScheme(); // 'dark' or 'light'
  return theme(colorScheme === 'dark' ? 'dark' : 'light');
};

export default theme;
