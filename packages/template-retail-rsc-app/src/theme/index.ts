import { createSystem, defaultConfig } from '@chakra-ui/react';

// Custom theme configuration for Chakra UI v3
export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#E3F2FD' },
          100: { value: '#BBDEFB' },
          200: { value: '#90CAF9' },
          300: { value: '#64B5F6' },
          400: { value: '#42A5F5' },
          500: { value: '#2196F3' },
          600: { value: '#1E88E5' },
          700: { value: '#1976D2' },
          800: { value: '#1565C0' },
          900: { value: '#0D47A1' },
        },
      },
      fonts: {
        heading: { value: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' },
        body: { value: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          default: { value: '{colors.gray.50}' },
          _dark: { value: '{colors.gray.900}' },
        },
        text: {
          default: { value: '{colors.gray.800}' },
          _dark: { value: '{colors.gray.100}' },
        },
      },
    },
  },
  globalCss: {
    body: {
      bg: 'bg',
      color: 'text',
    },
    '*::placeholder': {
      color: 'gray.400',
    },
  },
}); 