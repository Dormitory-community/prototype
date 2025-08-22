"use client"

import React from "react"
import { Box, Fab } from "@mui/material"
import { Download } from "@mui/icons-material"
import { Header } from "@/components/global/Header.tsx"
import { MobileNavBar } from "@/components/global/MobileNavBar.tsx"
import { usePWA } from "@/hooks/usePWA"
import { useLocation } from "react-router-dom"
import { ROUTES } from "@/router"
import MessageHeader from "@/components/account/message/MessageHeader"

interface LayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { isInstallable, installPWA } = usePWA()
    const location = useLocation()
    const normalize = (route: string) => route.replace(/:.*$/, "")

    const hideHeader = [ROUTES.LOGIN].some(route =>
        location.pathname.startsWith(normalize(route))
    )

    const showMessageHeader = location.pathname.startsWith(
        normalize(ROUTES.MESSAGE_DETAIL)
    )

    // 메시지 상세 화면인지 확인
    const isMessageDetail = location.pathname.startsWith(
        normalize(ROUTES.MESSAGE_DETAIL)
    )

    // 메시지 헤더용 더미 데이터
    const dummyRoomData = {
        userName: "이민수",
        userAvatar: "",
        unreadCount: 2,
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            {!hideHeader && !showMessageHeader && <Header />}
            {showMessageHeader && (
                <MessageHeader
                    userName={dummyRoomData.userName}
                    userAvatar={dummyRoomData.userAvatar}
                    unreadCount={dummyRoomData.unreadCount}
                />
            )}

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    // 메시지 상세 화면에서는 패딩 조정
                    pt: isMessageDetail
                        ? { xs: "56px", sm: "64px" } // 메시지 헤더만큼
                        : { xs: "56px", sm: "64px" }, // 일반 헤더만큼
                    pb: isMessageDetail
                        ? 0 // 메시지 상세에서는 하단 패딩 제거 (ChatInput이 fixed)
                        : { xs: `calc(env(safe-area-inset-bottom) + 56px)`, sm: 3 },
                }}
            >
                {children}
            </Box>
            <MobileNavBar />
        </Box>
    )
}