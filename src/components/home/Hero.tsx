"use client"

import type React from "react"
import { Box, Typography, Container, useTheme } from "@mui/material"



export const Hero: React.FC = () => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                color: theme.palette.primary.contrastText,
                py: { xs: 8, md: 12 },
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60vh",
            }}
        >
            <Container maxWidth="md">
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        fontWeight: 800,
                        mb: 3,
                        fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                        lineHeight: 1.1,
                        textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                >
                    대학 생활의 모든 것, <br /> 한 곳에서 해결하세요!
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        mb: 5,
                        fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                        opacity: 0.9,
                        maxWidth: "700px",
                        mx: "auto",
                    }}
                >
                    학사 정보부터 커뮤니티, 배달 주문까지! <br /> 스마트한 대학 생활을 위한 필수 플랫폼.
                </Typography>
            </Container>
        </Box>
    )
}
