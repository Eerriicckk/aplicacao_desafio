import { createTheme } from "@mui/material";

const theme = createTheme(
    {
        breakpoints: {
            values: {
                xxs: 0,
                xs: 375,
                sm: 500,
                smd: 600,
                md: 900,
                lg: 1150,
                xl: 1536,
            }
        },
        palette: {
            primary: {
                main: '#00cc00',
            },
            secondary: {
                main: '#E0C2FF',
                light: '#F5EBFF',
                contrastText: '#47008F',
            },
        }
    }
);

export default theme