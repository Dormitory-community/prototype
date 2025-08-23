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

    const normalize = (route: string) => route.replace(/:.*$/, "")

    const hideHeader = [ROUTES.LOGIN, ROUTES.MY_PAGE_MESSAGES].some((route) =>
        location.pathname.startsWith(normalize(route)),
    )

    const isMessageDetail = location.pathname.startsWith(normalize(ROUTES.MESSAGE_DETAIL))
    const isBoardDetail = location.pathname.startsWith(normalize(ROUTES.BOARD_DETAIL))

    // 입력창이 있는 페이지들
    // const hasFixedInput = isMessageDetail || isBoardDetail

    const getDynamicPaddingBottom = (isPWA: boolean) => {
        if (!isPWA) return { xs: "56px", sm: "80px" }
        const baseHeight = window.innerWidth < 600 ? "56px" : "80px"
        return `calc(${baseHeight} + env(safe-area-inset-bottom))`
    }



    useEffect(() => {
        const detectPWA = () => {
            const isStandalone =
                ("standalone" in window.navigator && (window.navigator as any).standalone === true) ||
                window.matchMedia("(display-mode: standalone)").matches ||
                window.matchMedia("(display-mode: fullscreen)").matches ||
                (typeof document !== "undefined" && document.referrer.includes("android-app://"))
            return Boolean(isStandalone)
        }

        setIsPWA(detectPWA())
    }, [])

    useEffect(() => {
        // PWA 환경에서 body에 클래스 추가
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
                minHeight: "100vh",
                // PWA에서 safe-area 적용
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
                    // 헤더 높이만큼 패딩
                    pt: hideHeader || isMessageDetail ? 0 : { xs: "56px", sm: "64px" },
                    // 하단 네비게이션 높이만큼 패딩 (고정 입력창이 없는 경우만)
                    pb: !isPWA ? 10 : getDynamicPaddingBottom(isPWA),                    // 메시지 상세 페이지는 전체 높이 사용
                    ...(isMessageDetail && {
                        height: "100vh",
                        overflow: "hidden",
                        pb: 0,
                    }),
                }}
            >
                {children}
            </Box>

            {(!isMessageDetail || (isMessageDetail && window.innerWidth >= 960)) && <MobileNavBar />}
        </Box>
    )
}