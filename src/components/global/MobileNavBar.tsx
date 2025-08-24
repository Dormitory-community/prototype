"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"
import { Groups, Dashboard, Person, Home, ChatBubble } from "@mui/icons-material"
import { useNavigate, useLocation } from "react-router-dom"
import { ROUTES } from "@/router"
import { useTheme } from '@mui/material/styles';

export const MobileNavBar: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const theme = useTheme()
    const [isPWA, setIsPWA] = useState(false)

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

    const hiddenRoutes = [ROUTES.LOGIN, ROUTES.SIGNUP, ROUTES.BOARD_DETAIL, ROUTES.MESSAGE_DETAIL]

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

    const normalize = (route: string) => route.replace(/:.*$/, "")

    const shouldHideNavBar = hiddenRoutes.some((route) => location.pathname.startsWith(normalize(route)))

    if (shouldHideNavBar) return null

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
            className="mobile-nav-bar"
            sx={{
                position: "fixed",
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1100,
                width: "100%",
                maxWidth: "100vw",
                boxSizing: "border-box",
                ...(isPWA && {
                    paddingLeft: "env(safe-area-inset-left, 0px)",
                    paddingRight: "env(safe-area-inset-right, 0px)",
                    paddingBottom: "env(safe-area-inset-bottom, 0px)",
                }),
                backgroundColor: theme.palette.background.default, // 테마의 배경색 명시적 사용
            }}
            elevation={3}
        >
            <BottomNavigation
                value={value}
                onChange={handleChange}
                showLabels
                sx={{
                    height: { xs: 48, sm: 56 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    backgroundColor: theme.palette.background.default, // 테마의 배경색 명시적 사용
                    borderTop: "1px solid",
                    borderColor: "divider",
                    "& .MuiBottomNavigationAction-root": {
                        minWidth: { xs: 50, sm: 70, md: 80 },
                        padding: { xs: "4px 2px", sm: "6px 4px" },
                        "& .MuiBottomNavigationAction-label": {
                            fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" },
                            marginTop: { xs: "2px", sm: "4px" },
                        },
                        "& .MuiSvgIcon-root": {
                            fontSize: { xs: 18, sm: 22, md: 24 },
                        },
                    },
                    "& .Mui-selected": {
                        "& .MuiBottomNavigationAction-label": {
                            fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" },
                            fontWeight: 600,
                        },
                    },
                }}
            >
                <BottomNavigationAction label="홈" icon={<Home sx={{ fontSize: { xs: 18, sm: 22, md: 24 } }} />} />
                <BottomNavigationAction label="그룹 모집" icon={<Groups sx={{ fontSize: { xs: 18, sm: 22, md: 24 } }} />} />
                <BottomNavigationAction label="게시판" icon={<Dashboard sx={{ fontSize: { xs: 18, sm: 22, md: 24 } }} />} />
                <BottomNavigationAction
                    label="채팅"
                    icon={<ChatBubble sx={{ fontSize: { xs: 18, sm: 22, md: 24 } }} />}
                />
                <BottomNavigationAction label="마이페이지" icon={<Person sx={{ fontSize: { xs: 18, sm: 22, md: 24 } }} />} />
            </BottomNavigation>
        </Paper>
    )
}