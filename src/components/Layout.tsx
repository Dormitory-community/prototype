"use client"

import React from "react"
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
    const normalize = (route: string) => route.replace(/:.*$/, "")

    const hideHeader = [ROUTES.LOGIN].some(route =>
        location.pathname.startsWith(normalize(route))
    )


    // 메시지 상세 화면인지 확인
    const isMessageDetail = location.pathname.startsWith(
        normalize(ROUTES.MESSAGE_DETAIL)
    )


    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            height: isMessageDetail ? { xs: "100vh", md: "auto" } : "auto",
            minHeight: isMessageDetail ? { xs: "100vh", md: "calc(100vh - 64px)" } : "auto",
            overflow: isMessageDetail ? { xs: "hidden", md: "visible" } : "visible"
        }}>
            {/* 헤더 */}
            {!hideHeader && !isMessageDetail && <Header />}
            {/* 메인 콘텐츠 */}
            <Box
                component="main"
                sx={{
                    // 메시지 상세 화면
                    ...(isMessageDetail ? {
                        // 모바일/PWA: 전체 높이 사용
                        flex: { xs: 1, md: "none" },
                        height: { xs: 0, md: "auto" }, // flex item이 올바르게 작동하도록
                        overflow: { xs: "hidden", md: "visible" },
                        pt: { xs: "56px", md: "64px" }, // 헤더 높이
                        // PC: 일반적인 패딩 적용
                        px: { xs: 0, md: 3 },
                        py: { xs: 0, md: 2 },
                    } : {
                        // 일반 페이지
                        flexGrow: 1,
                        pt: { xs: "56px", sm: "64px" },
                        pb: { xs: `calc(env(safe-area-inset-bottom) + 56px)`, sm: 3 },
                    })
                }}
            >
                {children}
            </Box>

            {/* 바텀 네비게이션 (메시지 상세 PC에서는 항상 표시) */}
            {(!isMessageDetail || (isMessageDetail && window.innerWidth >= 960)) && <MobileNavBar />}

        </Box>
    )
}