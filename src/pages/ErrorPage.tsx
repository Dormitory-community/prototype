"use client"

import type React from "react"
import { Box, Typography, Button, Container, useTheme } from "@mui/material"
import { Home } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/router"

const ErrorPage: React.FC = () => {
    const theme = useTheme()
    const navigate = useNavigate()

    return (
        <Container
            maxWidth="md"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "calc(100vh - 120px)", // Adjust based on header/footer height
                textAlign: "center",
                py: 8,
            }}
        >
            <Box
                sx={{
                    width: { xs: 150, md: 200 },
                    height: { xs: 150, md: 200 },
                    bgcolor: theme.palette.primary.light,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 4,
                    boxShadow: theme.shadows[3],
                }}
            >
                <Typography variant="h1" sx={{ fontSize: { xs: "5rem", md: "7rem" }, fontWeight: 700, color: "white" }}>
                    404
                </Typography>
            </Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "text.primary", mb: 2 }}>
                페이지를 찾을 수 없습니다.
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, maxWidth: 500 }}>
                죄송합니다. 요청하신 페이지를 찾을 수 없습니다. 주소가 올바른지 확인하거나 홈으로 돌아가세요.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<Home />}
                onClick={() => navigate(ROUTES.LANDING)}
                sx={{
                    borderRadius: Number(theme.shape.borderRadius) * 2,
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                }}
            >
                홈으로 돌아가기
            </Button>
        </Container>
    )
}

export default ErrorPage
