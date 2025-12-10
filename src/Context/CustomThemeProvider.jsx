import { createContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider, CssBaseline } from '@mui/material';
import {getAppTheme} from "../helper/Theme";


export const CustomThemeContext = createContext({});


const CustomThemeProvider = ({children}) => {
    const [mode, setMode] = useState(sessionStorage.getItem("mode") || "light");

    useEffect(() => {
        sessionStorage.setItem("mode", mode);
    }, [mode])

    const theme = useMemo(() => getAppTheme(mode), [mode]);

    return (
        <CustomThemeContext.Provider value={{mode, setMode}}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CustomThemeContext.Provider>
    )
};

export default CustomThemeProvider;