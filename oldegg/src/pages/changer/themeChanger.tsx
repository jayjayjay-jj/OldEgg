import { createContext, useEffect, useState } from "react"

export type ThemeType = {
    className: "light" | "dark",
    white_darkBlue: string,
    white_lightBlue: string,
    black_white: string,
    white_black: string,
    blue_black: string,
    lightBlue_black: string,
    white_gray: string,
    lightBlue_darkBlue: string,
    darkBlue_lightBlue: string,
    gray_white: string,
}

export const THEME: { LIGHT: ThemeType, DARK: ThemeType } = {
    LIGHT: {
        className: "light",
        white_darkBlue: "#FFF",
        white_lightBlue: "#F0F0F0",
        black_white: "#12120B",
        white_black: "#FFF",
        blue_black: "#0A185C",
        lightBlue_black: "#E9F1FC",
        white_gray: "#FFF",
        lightBlue_darkBlue: "#F0F8FF",
        darkBlue_lightBlue: "#B5CAE9",
        gray_white: "#D9D9D9"
    },
    DARK: {
        className: "dark",
        white_darkBlue: "#050C2E",
        white_lightBlue: "#E9F1FC",
        black_white: "#FFF",
        white_black: "#12120B",
        blue_black: "#121212",
        lightBlue_black: "#12120B",
        white_gray: "#212121",
        lightBlue_darkBlue: "#B5CAE9",
        darkBlue_lightBlue: "#F0F8FF",
        gray_white: "#FFF"
    },
}

export const ThemeContext = createContext({
    theme: THEME.LIGHT,
    toggleTheme: () => { },
});

export const ThemeProvider = ({ children }: any) => {
    let initialTheme : any;

    const [theme, setTheme] = useState(THEME.LIGHT);

    useEffect(() => {
        const currTheme = localStorage.getItem("theme");
            if (currTheme && currTheme === "dark") {
                setTheme(THEME.DARK);
        }
    }, []);

    const toggleTheme = () => {
        localStorage.setItem("theme", theme === THEME.LIGHT ? "dark" : "light");
        setTheme((e : any) => (e === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )

};