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
        disableElevation: true,
        size: 'large',
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        containedPrimary: {
          ...tw`bg-primary`,
          color: tailwindTheme`colors.white` + '!important',
        },
        outlinedPrimary: {
          borderColor: tailwindTheme`colors.primary` + '!important',
          color: tailwindTheme`colors.primary` + '!important',
        },
        sizeLarge: {
          height: '56px',
          ...tw`px-8 text-base`,
        },
      },
    },
  },
});

export default theme;
