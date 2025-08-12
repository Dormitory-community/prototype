"use client"

import type React from "react"
import { Box, Container, Typography, Button, useTheme } from "@mui/material"
import { ArrowForward } from "@mui/icons-material"

export const CTA: React.FC = () => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 90%)`,
                color: theme.palette.primary.contrastText,
                py: { xs: 8, md: 12 },
                textAlign: "center",
            }}
        >
            <Container maxWidth="md">
                <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                        fontWeight: 700,
                        mb: 3,
                        fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                        lineHeight: 1.2,
                    }}
                >
                    지금 바로 대학 생활을 업그레이드하세요!
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        mb: 5,
                        fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                        opacity: 0.9,
                        maxWidth: "600px",
                        mx: "auto",
                    }}
                >
                    간편하게 가입하고, 필요한 정보를 얻고, 활발한 커뮤니티에 참여하세요.
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                        bgcolor: theme.palette.background.paper,
                        color: theme.palette.secondary.main,
                        fontWeight: 700,
                        px: { xs: 4, md: 6 },
                        py: { xs: 1.5, md: 2 },
                        borderRadius: Number(theme.shape.borderRadius) * 2,
                        "&:hover": {
                            bgcolor: theme.palette.grey[100],
                        },
                        fontSize: { xs: "1rem", md: "1.125rem" },
                    }}
                >
                    무료로 시작하기
                </Button>
            </Container>
        </Box>
    )
}
