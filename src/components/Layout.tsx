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
    const [viewportHeight, setViewportHeight] = useState("100vh")

    const normalize = (route: string) => route.replace(/:.*$/, "")

    const hideHeader = [ROUTES.LOGIN, ROUTES.MY_PAGE_MESSAGES].some((route) =>
        location.pathname.startsWith(normalize(route)),
    )

    const isMessageDetail = location.pathname.startsWith(normalize(ROUTES.MESSAGE_DETAIL))

    const isBoardDetail = location.pathname.startsWith(normalize(ROUTES.BOARD_DETAIL))

    // 입력창이 있는 페이지들 - 하단에 고정 입력창을 위한 공간 확보 필요
    const hasFixedInput = isMessageDetail || isBoardDetail

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

        // PWA 환경에서 viewport 높이 최적화
        const updateViewportHeight = () => {
            if (detectPWA()) {
                // PWA에서는 동적 viewport 높이 사용
                const vh = window.innerHeight * 0.01
                document.documentElement.style.setProperty("--vh", `${vh}px`)

                // visualViewport 지원 시 더 정확한 높이 계산
                const visualViewport = (window as any).visualViewport
                if (visualViewport) {
                    setViewportHeight(`${visualViewport.height}px`)
                } else {
                    setViewportHeight(`${window.innerHeight}px`)
                }
            }
        }

        updateViewportHeight()

        // 리사이즈 이벤트 리스너
        const handleResize = () => {
            updateViewportHeight()
        }

        window.addEventListener("resize", handleResize)

        // visualViewport 이벤트 리스너 (iOS Safari PWA)
        const visualViewport = (window as any).visualViewport
        if (visualViewport) {
            visualViewport.addEventListener("resize", updateViewportHeight)
        }

        return () => {
            window.removeEventListener("resize", handleResize)
            if (visualViewport) {
                visualViewport.removeEventListener("resize", updateViewportHeight)
            }
        }
    }, [])

    useEffect(() => {
        if (hasFixedInput) {
            document.body.classList.add("fixed-input-page")
            if (isPWA) {
                document.body.classList.add("pwa-mode")
            }
        } else {
            document.body.classList.remove("fixed-input-page", "pwa-mode")
        }

        return () => {
            document.body.classList.remove("fixed-input-page", "pwa-mode")
        }
    }, [hasFixedInput, isPWA])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: isMessageDetail ? (isPWA ? viewportHeight : { xs: "100vh", md: "auto" }) : "auto",
                minHeight: isMessageDetail ? (isPWA ? viewportHeight : { xs: "100vh", md: "calc(100vh - 64px)" }) : "auto",
                overflow: isMessageDetail ? { xs: "hidden", md: "visible" } : "visible",
                ...(isPWA && {
                    paddingTop: "env(safe-area-inset-top)",
                    paddingLeft: "env(safe-area-inset-left)",
                    paddingRight: "env(safe-area-inset-right)",
                    // 하단은 입력창에서 개별 처리하므로 제외
                }),
            }}
        >
            {!hideHeader && !isMessageDetail && <Header />}
            <Box
                component="main"
                className={hasFixedInput ? "scroll-content" : ""}
                sx={{
                    ...(isMessageDetail
                        ? {
                            flex: { xs: 1, md: "none" },
                            height: { xs: 0, md: "auto" },
                            overflow: { xs: "hidden", md: "visible" },
                            overscrollBehavior: { xs: "none", md: "auto" },
                            pt: isPWA ? 0 : { xs: "56px", md: "64px" },
                            px: { xs: 0, md: 3 },
                            py: { xs: 0, md: 2 },
                        }
                        : {
                            flexGrow: 1,
                            pt: hideHeader ? 0 : { xs: "56px", sm: "64px" },
                            // 고정 입력창이 있는 페이지는 하단 패딩 제거 (입력창이 고정이므로)
                            pb: hasFixedInput
                                ? 0
                                : {
                                    xs: isPWA
                                        ? `calc(env(safe-area-inset-bottom) + 56px)`
                                        : `calc(env(safe-area-inset-bottom) + 56px)`,
                                    sm: 3,
                                },
                            overflow: "auto",
                            // 고정 입력창이 있는 페이지에서 스크롤 영역이 입력창 아래로 가지 않도록
                            ...(hasFixedInput && {
                                maxHeight: isPWA
                                    ? `calc(${viewportHeight} - 56px - 80px)`
                                    : { xs: "calc(100vh - 56px - 80px)", sm: "calc(100vh - 64px - 80px)" },
                            }),
                        }),
                }}
            >
                {children}
            </Box>
            {(!isMessageDetail || (isMessageDetail && window.innerWidth >= 960)) && !isPWA && <MobileNavBar />}
        </Box>
    )
}
