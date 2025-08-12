"use client"

import type React from "react"
import { Box, Container, Typography, Grid, Paper, useTheme } from "@mui/material"
import { School, Forum, LocalDining, Settings, Info, Group } from "@mui/icons-material"
import type { FeatureItem } from "@/types"

const featureItems: FeatureItem[] = [
    {
        icon: School,
        title: "학사 정보",
        description: "학사 일정, 장학금, 수강신청 등 학교 생활에 필요한 모든 정보를 한눈에 확인하세요.",
    },
    {
        icon: Forum,
        title: "커뮤니티",
        description: "자유 게시판, 고민 상담 등 다양한 주제로 학생들과 소통하고 정보를 공유하세요.",
    },
    {
        icon: LocalDining,
        title: "배달 주문",
        description: "함께 배달 주문할 사람을 찾아 배달비�� 절약하고 맛있는 음식을 즐기세요.",
    },
    {
        icon: Group,
        title: "모임/스터디",
        description: "함께 공부하고 성장할 스터디 그룹이나 모임을 찾아보세요.",
    },
    {
        icon: Info,
        title: "정보 공유",
        description: "유용한 생활 정보, 취업 정보, 자격증 정보 등을 공유하고 얻어가세요.",
    },
    {
        icon: Settings,
        title: "마이페이지",
        description: "내 활동을 한눈에 확인하고 개인 정보를 편리하게 관리하세요.",
    },
]

export const Features: React.FC = () => {
    const theme = useTheme()

    return (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                        fontWeight: 700,
                        color: "text.primary",
                        textAlign: "center",
                        mb: { xs: 6, md: 8 },
                        fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                >
                    주요 기능
                </Typography>
                <Grid container spacing={{ xs: 3, md: 4 }}>
                    {featureItems.map((feature, index) => (
                        <Grid size={{xs:12, sm:6, md:4}} key={index}>
                            <Paper
                                sx={{
                                    p: { xs: 3, md: 4 },
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                    borderRadius: Number(theme.shape.borderRadius) * 2,
                                    transition: "all 0.3s ease-in-out",
                                    "&:hover": {
                                        transform: "translateY(-8px)",
                                        boxShadow: theme.shadows[6],
                                    },
                                }}
                            >
                                <feature.icon
                                    sx={{
                                        fontSize: { xs: 48, md: 64 },
                                        color: theme.palette.primary.main,
                                        mb: 2,
                                    }}
                                />
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 600,
                                        color: "text.primary",
                                        mb: 1.5,
                                        fontSize: { xs: "1.25rem", md: "1.5rem" },
                                    }}
                                >
                                    {feature.title}
                                </Typography>
                                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                                    {feature.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}
