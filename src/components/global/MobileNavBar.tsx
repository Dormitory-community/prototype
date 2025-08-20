"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"
import { Groups, Dashboard, ShoppingCart, Person, Home } from "@mui/icons-material"
import { useNavigate, useLocation } from "react-router-dom"
import { ROUTES } from "@/router"

export const MobileNavBar: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const hiddenRoutes = [
        ROUTES.LOGIN,
        '/register',
        ROUTES.BOARD_DETAIL,
        ROUTES.DELIVERY_DETAIL,
    ]

    const getActiveTab = (pathname: string): number => {
        if (pathname === ROUTES.LANDING || pathname === "/") return 0
        if (pathname === ROUTES.BOARDS || pathname.startsWith("/boards")) return 2
        if (pathname === ROUTES.DELIVERY || pathname.startsWith("/delivery")) return 1
        if (pathname === ROUTES.GROUPS || pathname.startsWith("/groups")) return 3
        if (pathname === ROUTES.MY_PAGE || pathname.startsWith("/my-page")) return 4
        return 0
    }

    const [value, setValue] = useState(() => getActiveTab(location.pathname))

    useEffect(() => {
        setValue(getActiveTab(location.pathname))
    }, [location.pathname])

    const shouldHideNavBar = hiddenRoutes.some(route =>
        location.pathname.startsWith(route.replace(/:.*$/, "")) // 동적 파라미터 제거
    )

    if (shouldHideNavBar) {
        return null
    }

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
        switch (newValue) {
            case 0: navigate(ROUTES.LANDING); break
            case 2: navigate(ROUTES.BOARDS); break
            case 1: navigate(ROUTES.DELIVERY); break
            case 3: navigate(ROUTES.GROUPS); break
            case 4: navigate(ROUTES.MY_PAGE); break
        }
    }

    return (
        <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation value={value} onChange={handleChange} showLabels>
                <BottomNavigationAction label="홈" icon={<Home />} />
                <BottomNavigationAction label="배달주문" icon={<ShoppingCart />} />
                <BottomNavigationAction label="게시판" icon={<Dashboard />} />
                <BottomNavigationAction label="그룹 모집" icon={<Groups />} />
                <BottomNavigationAction label="마이페이지" icon={<Person />} />
            </BottomNavigation>
        </Paper>
    )
}
