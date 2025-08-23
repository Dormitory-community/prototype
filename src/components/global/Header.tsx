"use client"

import type React from "react"
import { useState } from "react"
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
} from "@mui/material"
import { useAuth } from "../../contexts/AuthContext.tsx"
import { useThemeContext } from "@/contexts/ThemeContext"
import { useNavigate, Link as RouterLink } from "react-router-dom"
import { ROUTES } from "@/router"
import logo from "#/logo.png"
import profileImage from "#/default-profile.webp";
import {BrightnessLow, DarkMode, Search} from "@mui/icons-material"
import {useNavigation} from "@/hooks/useNavigation.ts";
import {theme} from "@/theme/theme.ts";

export const Header: React.FC = () => {
    const { toggleTheme, mode } = useThemeContext()
    const { user, signOut } = useAuth()
    const navigate = useNavigate()
    const {goToSearch} = useNavigation()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        signOut()
        handleClose()
        navigate(ROUTES.LANDING)
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                bgcolor: "background.paper",
                borderBottom: "1px solid",
                borderColor: "divider",
                boxShadow: "none",
                width: "100%", // 너비를 100%로 제한
                maxWidth: "100vw", // 뷰포트 너비 초과 방지
                px: { xs: "env(safe-area-inset-left)", sm: 2, md: 3 }, // 좌우 패딩을 safe-area로 동적 조정
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: "space-between",
                    px: { xs: 1, sm: 2, md: 3 }, // 패딩 축소
                    minHeight: { xs: 48, sm: 56, md: 64 }, // 헤더 높이 반응형 조정
                    maxWidth: "100%", // Toolbar 너비 제한
                    boxSizing: "border-box",
                }}
            >
                <Box
                    component={RouterLink}
                    to={ROUTES.LANDING}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                        textDecoration: "none",
                        overflow: "hidden", // 콘텐츠 오버플로우 방지
                    }}
                >
                    <Box
                        component="img"
                        src={logo}
                        alt="LivingLogos 로고"
                        sx={{
                            height: { xs: 24, sm: 32 }, // 작은 화면에서 로고 크기 축소
                            width: { xs: 24, sm: 32 },
                            mr: 1,
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: "text.primary",
                            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" }, // 폰트 크기 반응형
                            whiteSpace: "nowrap",
                        }}
                    >
                        LivingLogos
                    </Typography>
                </Box>

                <IconButton onClick={toggleTheme} sx={{ mx: { xs: 0.5, sm: 1 }, color: "text.secondary" }}>
                    {mode === "light" ? <BrightnessLow /> : <DarkMode />}
                </IconButton>
                <Search
                    onClick={goToSearch}
                    sx={{ cursor: "pointer", mx: { xs: 0.5, sm: 2 }, color: "text.secondary" }}
                />

                <Box sx={{ flexGrow: 0 }}>
                    {user ? (
                        <>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    sx={{
                                        width: { xs: 28, sm: 32 }, // 아바타 크기 반응형
                                        height: { xs: 28, sm: 32 },
                                        background: "linear-gradient(45deg, #2563eb 30%, #10b981 90%)",
                                        fontSize: { xs: 12, sm: 14 },
                                        fontWeight: 600,
                                        color: "white",
                                    }}
                                    src={profileImage}
                                />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={open}
                                onClose={handleClose}
                                sx={{
                                    "& .MuiPaper-root": {
                                        borderRadius: theme.shape.borderRadius,
                                        boxShadow: theme.shadows[3],
                                    },
                                }}
                            >
                                <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            component={RouterLink}
                            to={ROUTES.LOGIN}
                            sx={{
                                borderRadius: theme.shape.borderRadius,
                                px: { xs: 1.5, sm: 2, md: 3 }, // 버튼 패딩 반응형
                                py: { xs: 0.5, sm: 0.8 },
                                fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
                            }}
                        >
                            로그인
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}
