import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontSize: 13, 
    fontFamily: 'Kanit, sans-serif', 
  },
  palette: {
    primary: {
      main: '#1D1E3A', 
    },
    secondary: {
      main: 'rgba(29, 30, 58, 0.60)',
    },
  },
});

export default theme;
