import { createTheme } from "@mui/material";
import { ptBR } from "@mui/x-date-pickers";

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
                main: '#3F5768',
            },
            secondary: {
                main: '#E0C2FF',
                light: '#F5EBFF',
                contrastText: '#47008F',
            },
            specialColor:{
                main: "#000000",
                disabled: "#000000"
            }
        }
    },
    ptBR,
);

export default theme