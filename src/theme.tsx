import { createTheme } from '@mui/material/styles';
import tw, { theme as tailwindTheme } from 'twin.macro';

const theme = createTheme({
  palette: {
    primary: {
      main: tailwindTheme`colors.primary`,
      contrastText: tailwindTheme`colors.white`,
    },
    secondary: {
      main: tailwindTheme`colors.secondary`,
      contrastText: tailwindTheme`colors.white`,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: 'large',
        variant: 'contained',
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        containedPrimary: {
          ...tw`bg-primary font-proxima`,
          color: tailwindTheme`colors.white` + '!important',
        },
        sizeLarge: {
          height: '56px',
          ...tw`px-8 py-7 text-[17px]`,
        },
        sizeMedium: {
          height: '40px',
          ...tw`px-6 py-6 text-[16px]`,
        },
      },
    },
  },
});

export default theme;
