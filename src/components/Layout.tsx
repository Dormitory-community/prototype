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
                        overflow: { xs: "hidden", md: "visible" }, // 채팅 상세 페이지에서만 hidden
                        overscrollBehavior: { xs: "none", md: "auto" }, // 채팅 상세 페이지에서만 overscroll 방지
                        pt: { xs: "56px", md: "64px" }, // Keep for message detail
                        px: { xs: 0, md: 3 },
                        py: { xs: 0, md: 2 },
                    } : {
                        flexGrow: 1,
                        pt: hideHeader ? 0 : { xs: "56px", sm: "64px" }, // Conditional: Remove pt when header is hidden
                        pb: { xs: `calc(env(safe-area-inset-bottom) + 56px)`, sm: 3 },
                        overflow: "auto", // 다른 페이지에서 스크롤 가능
                    })
                }}
            >
                {children}
            </Box>
            {(!isMessageDetail || (isMessageDetail && window.innerWidth >= 960)) && <MobileNavBar />}
        </Box>
    )
}