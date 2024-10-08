import App from './App';
import theme from 'theme';
import React from 'react';
import 'styles/index.css';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
