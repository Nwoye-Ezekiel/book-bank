module.exports = {
  important: true,
  darkMode: 'class',
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    colors: {
      white: '#fff',
      black: '#000',
      header: '#0a0a0a',
      primary: '#f75d4a',
      secondary: '#202020',
      transparent: 'trasparent',
    },
    extend: {
      fontFamily: {
        clash: ['clash', 'ui-sans-serif', 'system-ui'],
        cabinet: ['cabinet', 'ui-sans-serif', 'system-ui'],
        proxima: ['proxima', 'ui-sans-serif', 'system-ui'],
        backline: ['backline', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
