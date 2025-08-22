"use client"

import type React from "react"
import { Box, Fab } from "@mui/material"
import { Download } from "@mui/icons-material"
import { Header } from "@/components/global/Header.tsx"
import { MobileNavBar } from "./global/MobileNavBar.tsx"
import { usePWA } from "@/hooks/usePWA"
import { useLocation } from "react-router-dom"
import {ROUTES} from "@/router";

interface LayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { isInstallable, installPWA } = usePWA()
    const location = useLocation()
    const normalize = (route: string) => route.replace(/:.*$/, "")
    const hiddenRoutes = [ROUTES.LOGIN, ROUTES.MESSAGE_DETAIL]

    const hideHeader = hiddenRoutes.some(route =>
        location.pathname.startsWith(normalize(route))
    )

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            {!hideHeader && <Header />}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    pt: { xs: "56px", sm: "64px" },
                    // pb: { xs: 9, sm: 3 },
                    // 또는 안전 영역 고려:
                    pb: { xs: `calc(env(safe-area-inset-bottom) + 56px)`, sm: 3 }
                }}
            >
                {children}
            </Box>
            {/* PWA Install Button */}
            {isInstallable && (
                <Fab
                    color="primary"
                    onClick={installPWA}
                    sx={{
                        position: "fixed",
                        bottom: { xs: 72, sm: 16 }, // Keep mobile nav bar spacing
                        right: 16,
                        background: "linear-gradient(45deg, #2563eb 30%, #10b981 90%)",
                        "&:hover": {
                            background: "linear-gradient(45deg, #1d4ed8 30%, #059669 90%)",
                            transform: "scale(1.05)",
                        },
                        transition: "all 0.3s ease",
                        zIndex: 1000,
                    }}
                >
                    <Download />
                </Fab>
            )}
            <MobileNavBar />


        </Box>
    )
}
