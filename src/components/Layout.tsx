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

    const hideHeader = [ROUTES.LOGIN, ROUTES.MY_PAGE_MESSAGES].some(route =>
        location.pathname.startsWith(normalize(route))
    )

    const isMessageDetail = location.pathname.startsWith(
        normalize(ROUTES.MESSAGE_DETAIL)
    )

    const isBoardDetail = location.pathname.startsWith(
        normalize(ROUTES.BOARD_DETAIL)
    )

    // 입력창이 있는 페이지들 - 하단에 고정 입력창을 위한 공간 확보 필요
    const hasFixedInput = isMessageDetail || isBoardDetail

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            height: isMessageDetail ? { xs: "100vh", md: "auto" } : "auto",
            minHeight: isMessageDetail ? { xs: "100vh", md: "calc(100vh - 64px)" } : "auto",
            overflow: isMessageDetail ? { xs: "hidden", md: "visible" } : "visible"
        }}>
            {!hideHeader && !isMessageDetail && <Header />}
            <Box
                component="main"
                sx={{
                    ...(isMessageDetail ? {
                        flex: { xs: 1, md: "none" },
                        height: { xs: 0, md: "auto" },
                        overflow: { xs: "hidden", md: "visible" },
                        overscrollBehavior: { xs: "none", md: "auto" },
                        pt: { xs: "56px", md: "64px" },
                        px: { xs: 0, md: 3 },
                        py: { xs: 0, md: 2 },
                    } : {
                        flexGrow: 1,
                        pt: hideHeader ? 0 : { xs: "56px", sm: "64px" },
                        // 고정 입력창이 있는 페이지는 하단 패딩 제거 (입력창이 고정이므로)
                        pb: hasFixedInput ? 0 : { xs: `calc(env(safe-area-inset-bottom) + 56px)`, sm: 3 },
                        overflow: "auto",
                        // 고정 입력창이 있는 페이지에서 스크롤 영역이 입력창 아래로 가지 않도록
                        ...(hasFixedInput && {
                            maxHeight: { xs: "calc(100vh - 56px - 80px)", sm: "calc(100vh - 64px - 80px)" }, // 헤더 + 입력창 높이만큼 제외
                        }),
                    })
                }}
            >
                {children}
            </Box>
            {(!isMessageDetail || (isMessageDetail && window.innerWidth >= 960)) && <MobileNavBar />}
        </Box>
    )
}