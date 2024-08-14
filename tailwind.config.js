module.exports = {
  important: true,
  darkMode: 'class',
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    colors: {
      white: '#fff',
      black: '#000',
      header: '#0e0e0e',
      primary: '#ff503d',
      secondary: '#202020',
      transparent: 'trasparent',
    },
    extend: {
      fontFamily: {
        clash: ['clash', 'ui-sans-serif', 'system-ui'],
        cabinet: ['cabinet', 'ui-sans-serif', 'system-ui'],
        proxima: ['proxima', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
