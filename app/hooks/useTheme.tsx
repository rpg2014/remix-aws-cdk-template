import { createContext, useContext, useEffect, useState } from "react";


export type Theme = "light" | "dark" | "yellow" | "blue" | "image"

const ThemeContext = createContext<{theme: Theme, setTheme: (theme: Theme) => void}>({theme: "dark", setTheme: () => {}})

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
    const [theme, setTheme] = useState<Theme>("dark")

    return (
        <ThemeContext.Provider value={{ theme, setTheme: setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}



export const useTheme = () => {
    return useContext(ThemeContext)
}

export const useThemeOnPage = (theme: Theme) => {
    const {setTheme} = useTheme();
    useEffect(() => {
        setTheme(theme)
    
        // return () => {
        //     setTheme("dark")
        
        // }
    },[]);
}