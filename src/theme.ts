import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        mode: 'dark', // Switching the dark mode on is a single property value change.
    },
    components: {
      // Name of the component
      MuiCard: {
        styleOverrides: {
            root: {
                border: "2px solid rgb(127, 255, 212)",
                borderRadius: 12
            }   
        }
      },
      MuiButtonBase: {
        defaultProps: {
          // The props to change the default for.
          disableRipple: true, // No more ripple, on the whole application 💣!
        },
      },
    },
  });
