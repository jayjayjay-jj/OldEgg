import { createContext, useEffect, useState } from "react"

export type ThemeType = {
    className: "light" | "dark",
    white_darkBlue: string,
    white_gray: string,
    black_white: string,
    blue_black: string,
}

export const THEME: { LIGHT: ThemeType, DARK: ThemeType } = {
    LIGHT: {
        className: "light",
        white_darkBlue: "#fff",
        white_gray: "#F0F0F0",
        black_white: "#12120b",
        blue_black: "#0A185C",
    },
    DARK: {
        className: "dark",
        white_darkBlue: "#050c2e",
        white_gray: "#BEBEBE",
        black_white: "#050c2e",
        blue_black: "#121212",
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