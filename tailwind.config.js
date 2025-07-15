/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./ws-nextjs-app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // BBC GEL Color Palette
        'archive-blue': '#3A549C',
        'black': '#000000',
        'bluejay': '#0F556C',
        'bluejay-lht': '#C3DEE7',
        'chalk': '#ECEAE7',
        'cloud-dark': '#757575',
        'cloud-light': '#BABABA',
        'consent-action': '#F6A21D',
        'consent-background': '#323232',
        'consent-content': '#BEBEBE',
        'consent-focus': '#68A1F8',
        'dark-saltire': '#23104C',
        'dim-grey': '#696969',
        'ebon': '#222222',
        'error-core': '#E51854',
        'ghost': '#FDFDFD',
        'grey-10': '#141414',
        'grey-11': '#BABABA',
        'grey-1': '#FEFEFE',
        'grey-2': '#F6F6F6',
        'grey-3': '#E6E8EA',
        'grey-4': '#B0B2B4',
        'grey-5': '#8A8C8E',
        'grey-6': '#545658',
        'grey-7': '#3A3C3E',
        'grey-8': '#202224',
        'kingfisher': '#11708C',
        'le-teal': '#09838B',
        'live-light': '#00CCC7',
        'live-medium': '#008282',
        'live-dark': '#006666',
        'live-core': '#009E9E',
        'lunar': '#F2F2F2',
        'lunar-light': '#F8F8F8',
        'metal': '#6E6E73',
        'midnight-black': '#121212',
        'newsround-purple': '#6C22D6',
        'newsround-purple-30': '#9159A8',
        'oat-lht': '#F5F3F1',
        'orbit-grey': '#4C4C4C',
        'pebble': '#AEAEB5',
        'philippine-grey': '#8A8C8E',
        'postbox': '#B80000',
        'postbox-30': '#EAB3B3',
        'rhino': '#5A5A5A',
        'service-neutral-core': '#0071F1',
        'service-neutral-dark': '#0051AD',
        'shadow': '#3F3F42',
        'sport-mist': '#F7F7F5',
        'sport-silver': '#DBDBDB',
        'sport-yellow': '#FFD230',
        'sport-yellow-30': '#BB9A31',
        'stone': '#D5D0CD',
        'storm': '#404040',
        'success-core': '#148A00',
        'weather-blue': '#067EB3',
        'white': '#FFFFFF',
      },
      screens: {
        // BBC GEL Grid breakpoints
        'group-0-max': { 'max': '14.9375rem' }, // max-width: 239px
        'group-1': { 'min': '15rem', 'max': '24.9375rem' }, // 240px - 399px
        'group-1-max': { 'max': '24.9375rem' }, // max-width: 399px
        'group-2': { 'min': '25rem', 'max': '37.4375rem' }, // 400px - 599px
        'group-2-max': { 'max': '37.4375rem' }, // max-width: 599px
        'group-3': { 'min': '37.5rem', 'max': '62.9375rem' }, // 600px - 1007px
        'group-3-max': { 'max': '62.9375rem' }, // max-width: 1007px
        'group-4': { 'min': '63rem', 'max': '79.9375rem' }, // 1008px - 1279px
        'group-4-max': { 'max': '79.9375rem' }, // max-width: 1279px
        'group-5': { 'min': '80rem' }, // 1280px+
      },
      spacing: {
        // BBC GEL Spacing scale (based on 8px/0.5rem base)
        'half': '0.25rem', // 4px
        'full': '0.5rem', // 8px
        'double': '1rem', // 16px
        'triple': '1.5rem', // 24px
        'quadruple': '2rem', // 32px
        'quintuple': '2.5rem', // 40px
        'sextuple': '3rem', // 48px
      },
      maxWidth: {
        'screen-group-4': '63rem', // 1008px
        'screen-group-5': '80rem', // 1280px
      },
      minHeight: {
        '165': '165px',
      },
      fontSize: {
        // BBC GEL Typography scale - these will be replaced with responsive utilities
        'minion': ['0.75rem', { lineHeight: '1rem' }], // 12px
        'brevier': ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        'long-primer': ['0.9375rem', { lineHeight: '1.25rem' }], // 15px
        'pica': ['1rem', { lineHeight: '1.25rem' }], // 16px
        'body-copy': ['1rem', { lineHeight: '1.375rem' }], // 16px
        'great-primer': ['1.125rem', { lineHeight: '1.5rem' }], // 18px
        'double-pica': ['1.25rem', { lineHeight: '1.5rem' }], // 20px
        'paragon': ['1.375rem', { lineHeight: '1.625rem' }], // 22px
        'trafalgar': ['1.25rem', { lineHeight: '1.5rem' }], // 20px mobile, responsive
        'canon': ['1.75rem', { lineHeight: '2rem' }], // 28px mobile, responsive
        'foolscap': ['2rem', { lineHeight: '2.25rem' }], // 32px
        'royal': ['2.5rem', { lineHeight: '2.75rem' }], // 40px
        'imperial': ['3rem', { lineHeight: '3.25rem' }], // 48px
        'elephant': ['3.5rem', { lineHeight: '3.75rem' }], // 56px
        'atlas': ['4.875rem', { lineHeight: '5.25rem' }], // 78px
      },
      fontFamily: {
        // BBC GEL Font families
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
        'serif': ['Georgia', 'Times', 'Times New Roman', 'serif'],
        'mono': ['Consolas', 'Monaco', 'monospace'],
      },
      outlineWidth: {
        '3': '3px',
      },
      outlineOffset: {
        '3': '3px',
      },
      boxShadow: {
        'focus': '0 0 0 3px #FFFFFF',
        'focus-invert': '0 0 0 3px #000000',
      },
      aspectRatio: {
        'video': '16 / 9',
      },
    },
  },
  plugins: [],
}