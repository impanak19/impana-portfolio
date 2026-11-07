/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050507',
          900: '#0A0A0F',
          800: '#121218',
          700: '#1C1C25',
          600: '#2A2A36',
          500: '#3D3D4C',
          400: '#6B6B7D',
          300: '#9A9AAB',
          200: '#C9C9D6',
          100: '#E8E8F0',
        },
        electric: {
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#7E22CE',
        },
        cobalt: {
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        hotpink: {
          300: '#FFA3CD',
          400: '#FF5CA3',
          500: '#FF2E88',
          600: '#E0136E',
        },
        sunset: {
          300: '#FFC08A',
          400: '#FFA260',
          500: '#FF8A3D',
          600: '#F26B1D',
        },
        success: {
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        },
        warning: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        error: {
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
        },
      },
      fontFamily: {
        display: ['Syne', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(var(--rot, 0deg))' },
          '50%': { transform: 'translate3d(0, -18px, 0) rotate(calc(var(--rot, 0deg) + 6deg))' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.6)', opacity: '0.8' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'drift': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(40px, -30px, 0) scale(1.08)' },
        },
      },
      animation: {
        'gradient-shift': 'gradient-shift 9s ease infinite',
        float: 'float 7s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        'marquee-reverse': 'marquee 44s linear infinite reverse',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.22, 1, 0.36, 1) infinite',
        drift: 'drift 14s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
