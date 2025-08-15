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
    useTheme,
} from "@mui/material"
import { useAuth } from "../../contexts/AuthContext.tsx"
import { useNavigate, Link as RouterLink } from "react-router-dom"
import { ROUTES } from "@/router"
import logo from "#/logo.png"

export const Header: React.FC = () => {
    const theme = useTheme()
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        logout()
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
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 3, md: 4 } }}>
                <Box
                    component={RouterLink}
                    to={ROUTES.LANDING}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                        textDecoration: "none",
                    }}
                >
                    <Box
                        component="img"
                        src={logo}
                        alt="LivingLogos 로고"
                        sx={{
                            height: 32, // 이미지 크기
                            width: 32,
                            mr: 1,      // 텍스트와 간격
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: "text.primary",
                            fontSize: { xs: "1.1rem", sm: "1.25rem" },
                        }}
                    >
                        LivingLogos
                    </Typography>
                </Box>



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
                                        width: 32,
                                        height: 32,
                                        background: "linear-gradient(45deg, #2563eb 30%, #10b981 90%)",
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: "white",
                                    }}
                                >
                                    {user.name.charAt(0)}
                                </Avatar>
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
                            to={ROUTES.LOGIN} // Assuming login is handled on landing or a modal
                            sx={{
                                borderRadius: theme.shape.borderRadius,
                                px: { xs: 2, sm: 3 },
                                py: { xs: 0.8, sm: 1 },
                                fontSize: { xs: "0.8rem", sm: "0.9rem" },
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
