"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { Header } from "@/components/global/Header.tsx"
import { MobileNavBar } from "@/components/global/MobileNavBar.tsx"
import { useLocation } from "react-router-dom"
import { ROUTES } from "@/router"

interface LayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation()
    const [isPWA, setIsPWA] = useState(false)
    const [isIOS, setIsIOS] = useState(false)

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
            document.body.classList.add("pwa-environment")
        } else {
            document.body.classList.remove("pwa-environment")
        }
        return () => {
            document.body.classList.remove("pwa-environment")
        }
    }, [isPWA])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100dvh", // 동적 뷰포트 높이 사용
                ...(isPWA && {
                    paddingTop: "env(safe-area-inset-top)",
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
                    pt: hideHeader || isMessageDetail ? 0 : { xs: "48px", sm: "56px", md: "64px" },
                    pb: isBoardDetail
                        ? { xs: "80px", sm: "100px" } // 8px 여유 제거, 기본값 복원
                        : isPWA
                            ? { xs: "48px", sm: "56px" } // 8px 여유 제거, 네비 높이와 맞춤
                            : { xs: 48, sm: 56 },
                    ...(isMessageDetail && {
                        height: "100dvh",
                        overflow: "hidden",
                        pb: 0,
                    }),
                    width: "100%",
                    maxWidth: "100vw",
                    boxSizing: "border-box",
                }}
            >
                {children}
            </Box>

            {(!isMessageDetail || (isMessageDetail && window.innerWidth >= 960)) && <MobileNavBar />}
        </Box>
    )
}