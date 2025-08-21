"use client"

import type React from "react"

import {Header} from "@/components/global/Header.tsx";
import { Box } from "@mui/material";
import {RecentActivity} from "@/components/home/RecentActivity.tsx";
import {TrendingPosts} from "@/components/home/TrendingPosts.tsx";
import {NotificationBanner} from "@/components/home/NotificationBanner.tsx";

const LandingPage: React.FC = () => {


    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
            <Header />
            <NotificationBanner />

            <Box sx={{ display: "flex", overflowX: 'hidden' }}>
                <Box component="main" sx={{ flexGrow: 1, p: 3, overflowX: 'hidden' }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                            maxWidth: {
                                xs: "100%",   // 모바일에서는 꽉 차게
                                sm: 500,      // 작은 화면에서는 500px
                                md: 700,      // 중간 화면에서는 700px
                                lg: 900,      // 큰 화면에서는 900px
                            },
                            mx: "auto",     // 가운데 정렬
                            width: "100%",  // 항상 화면 기준 꽉 차게 (maxWidth로 제한)
                        }}
                    >
                        <RecentActivity />
                        <TrendingPosts />
                    </Box>

                </Box>
            </Box>
        </Box>
    )
}

export default LandingPage
