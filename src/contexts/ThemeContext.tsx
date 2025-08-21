"use client"

import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from "react"
import { ThemeProvider } from "@mui/material/styles"
import { lightTheme, darkTheme } from "@/theme/theme"

type ThemeMode = "light" | "dark"

interface ThemeContextType {
    mode: ThemeMode
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useThemeContext = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useThemeContext must be used within ThemeProvider")
    }
    return context
}

interface Props {
    children: ReactNode
}

export const CustomThemeProvider: React.FC<Props> = ({ children }) => {
    // 로컬스토리지에서 초기 모드 불러오기
    const getInitialMode = (): ThemeMode => {
        if (typeof window !== "undefined") {
            const savedMode = localStorage.getItem("themeMode") as ThemeMode | null
            if (savedMode) return savedMode
            // 시스템 설정에 따라 기본값 적용
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            return prefersDark ? "dark" : "light"
        }
        return "light"
    }

    const [mode, setMode] = useState<ThemeMode>(getInitialMode)

    // 모드가 바뀔 때마다 로컬스토리지에 저장
    useEffect(() => {
        localStorage.setItem("themeMode", mode)
    }, [mode])

    const toggleTheme = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"))
    }

    const theme = useMemo(() => (mode === "light" ? lightTheme : darkTheme), [mode])

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    )
}
