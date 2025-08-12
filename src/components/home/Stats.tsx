"use client"

import type React from "react"
import { Box, Container, Typography, Grid, useTheme } from "@mui/material"
import type { StatItem } from "@/types"


const stats: StatItem[] = [
    { value: "10,000+", label: "활성 사용자" },
    { value: "500+", label: "일일 게시글" },
    { value: "100+", label: "스터디 그룹" },
    { value: "95%", label: "사용자 만족도" },
]

export const Stats: React.FC = () => {
    const theme = useTheme()

    return (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.paper" }}>
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 4, md: 8 }} justifyContent="center">
                    {stats.map((stat, index) => (
                        <Grid
                            size={{ xs: 6, sm: 3 }}
                            key={index}
                            sx={{ textAlign: "center" }}
                        >
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 800,
                                    color: theme.palette.primary.main,
                                    mb: 1,
                                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                                    lineHeight: 1.1,
                                }}
                            >
                                {stat.value}
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    color: "text.secondary",
                                    fontSize: { xs: "1rem", md: "1.25rem" },
                                }}
                            >
                                {stat.label}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}
