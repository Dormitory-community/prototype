"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { Header } from "@/components/global/Header.tsx"
import { MobileNavBar } from "@/components/global/MobileNavBar.tsx"
import { useLocation } from "react-router-dom"
import { ROUTES } from "@/router"
import { useTheme } from '@mui/material/styles';
import {useThemeContext} from "@/contexts/ThemeContext.tsx";


interface LayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation()
    const [isPWA, setIsPWA] = useState(false)
    const [isIOS, setIsIOS] = useState(false)
    const theme = useTheme()
    const { mode } = useThemeContext() // 현재 테마 모드 가져오기

    const normalize = (route: string) => route.replace(/:.*$/, "")

    const hideHeader = [ROUTES.LOGIN, ROUTES.MY_PAGE_MESSAGES].some((route) =>
        location.pathname.startsWith(normalize(route)),
    )

    const isMessageDetail = location.pathname.startsWith(normalize(ROUTES.MESSAGE_DETAIL))
    const isBoardDetail = location.pathname.startsWith(normalize(ROUTES.BOARD_DETAIL))

    useEffect(() => {
        const detectPWA = () => {
            const isStandalone =
                ("standalone" in window.navigator && (window.navigator as any).standalone === true) ||
                window.matchMedia("(display-mode: standalone)").matches ||
                window.matchMedia("(display-mode: fullscreen)").matches ||
                (typeof document !== "undefined" && document.referrer.includes("android-app://"))
            return Boolean(isStandalone)
        }

        const detectIOS = () => {
            return /iPhone|iPad|iPod/i.test(navigator.userAgent)
        }

        setIsPWA(detectPWA())
        setIsIOS(detectIOS())
    }, [])

    useEffect(() => {
        if (isPWA) {
            document.body.classList.add("pwa-environment");
        } else {
            document.body.classList.remove("pwa-environment");
        }
        if (isIOS) {
            document.body.classList.add("ios-environment");
        }
    }, [isPWA, isIOS]);

    const getBackgroundColor = () => {
        if (isIOS && isPWA) {
            return mode === 'dark' ? '#0f172a' : '#f8fafc'; // iOS 홈바와 동일한 색상
        }
        return theme.palette.background.default;
    }
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100dvh",
                ...(isPWA && {
                    paddingLeft: "env(safe-area-inset-left)",
                    paddingRight: "env(safe-area-inset-right)",
                }),
            }}
        >
            {!hideHeader && !isMessageDetail && <Header />}

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    // PWA에서 헤더 높이 계산 시 safe-area-inset-top 포함
                    pt: hideHeader || isMessageDetail
                        ? (isPWA ? "env(safe-area-inset-top, 0px)" : 0)
                        : isPWA
                            ? "calc(env(safe-area-inset-top, 0px) + 48px)" // PWA: safe-area + header height
                            : { xs: "48px", sm: "56px", md: "64px" }, // 일반: header height만
                    pb: isBoardDetail
                        ? { xs: "80px", sm: "100px" }
                        : isPWA
                            ? { xs: "48px", sm: "56px" }
                            : { xs: 48, sm: 56 },
                    ...(isMessageDetail && {
                        height: "100dvh",
                        overflow: "hidden",
                        pb: 0,
                    }),
                    width: "100%",
                    maxWidth: "100vw",
                    boxSizing: "border-box",
                    bgcolor: getBackgroundColor(),
                }}
            >
                {children}
            </Box>

            {(!isMessageDetail || (isMessageDetail && window.innerWidth >= 960)) && <MobileNavBar />}
        </Box>
    )
}