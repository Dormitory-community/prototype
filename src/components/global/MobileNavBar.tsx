"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"
import { Groups, Dashboard, Person, Home } from "@mui/icons-material"
import { useNavigate, useLocation } from "react-router-dom"
import { ROUTES } from "@/router"
import { MessageCircle } from "lucide-react"

export const MobileNavBar: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const hiddenRoutes = [
        ROUTES.LOGIN,
        ROUTES.SIGNUP,
        ROUTES.BOARD_DETAIL,
        ROUTES.MESSAGE_DETAIL
    ]

    const getActiveTab = (pathname: string): number => {
        if (pathname === ROUTES.LANDING || pathname === "/") return 0
        if (pathname === ROUTES.GROUPS || pathname.startsWith("/groups")) return 1
        if (pathname === ROUTES.BOARDS || pathname.startsWith("/boards")) return 2
        if (pathname === ROUTES.MY_PAGE_MESSAGES || pathname.startsWith("/my-page/messages")) return 3
        if (pathname === ROUTES.MY_PAGE || pathname.startsWith("/my-page")) return 4
        return 0
    }

    const [value, setValue] = useState(() => getActiveTab(location.pathname))

    useEffect(() => {
        setValue(getActiveTab(location.pathname))
    }, [location.pathname])

    // 헬퍼: 동적 파라미터 제거
    const normalize = (route: string) => route.replace(/:.*$/, "")


    // 일반적인 숨김 체크 (Message detail은 위에서 별도 처리)
    const shouldHideNavBar = hiddenRoutes.some((route) => location.pathname.startsWith(normalize(route)))


    // 숨김 라우트이면 아무것도 렌더하지 않음
    if (shouldHideNavBar) return null

    // 기본: 바텀 네비게이션 렌더
    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
        switch (newValue) {
            case 0:
                navigate(ROUTES.LANDING)
                break
            case 1:
                navigate(ROUTES.GROUPS)
                break
            case 2:
                navigate(ROUTES.BOARDS)
                break
            case 3:
                navigate(ROUTES.MY_PAGE_MESSAGES)
                break
            case 4:
                navigate(ROUTES.MY_PAGE)
                break
        }
    }

    return (
        <Paper
            sx={{
                position: "fixed",
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1100,
            }}
            elevation={3}
        >
            <BottomNavigation
                value={value}
                onChange={handleChange}
                showLabels
                sx={{
                    height: `calc(56px + var(--safe-bottom, env(safe-area-inset-bottom, constant(safe-area-inset-bottom, 0px))))`,
                    paddingBottom: `var(--safe-bottom, env(safe-area-inset-bottom, constant(safe-area-inset-bottom, 0px)))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <BottomNavigationAction label="홈" icon={<Home />} />
                <BottomNavigationAction label="그룹 모집" icon={<Groups />} />
                <BottomNavigationAction label="게시판" icon={<Dashboard />} />
                <BottomNavigationAction label="채팅" icon={<MessageCircle fill="currentColor" strokeWidth={0} />} />
                <BottomNavigationAction label="마이페이지" icon={<Person />} />
            </BottomNavigation>
        </Paper>
    )
}
