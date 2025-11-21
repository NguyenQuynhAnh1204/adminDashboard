import { useContext } from "react"
import {CustomThemeContext} from "../Context/CustomThemeProvider"


const useCustomTheme = () => {
    return useContext(CustomThemeContext);
}

export default useCustomTheme;