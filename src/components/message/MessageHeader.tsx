"use client"

import React, { useState, useEffect } from "react"
import {
    Box,
    Typography,
    Avatar,
    IconButton,
    Badge,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Switch,
    SwipeableDrawer,
    Button,
} from "@mui/material"
import { ArrowBack, Menu as MenuIcon } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

interface MessageHeaderProps {
    userName: string
    userAvatar?: string
}

const iOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent)

const MessageHeader: React.FC<MessageHeaderProps> = ({ userName, userAvatar }) => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [isPWA, setIsPWA] = useState(false)

    useEffect(() => {
        const detectPWA = () => {
            const isStandalone =
                ("standalone" in window.navigator && (window.navigator as any).standalone === true) ||
                window.matchMedia("(display-mode: standalone)").matches ||
                window.matchMedia("(display-mode: fullscreen)").matches ||
                (typeof document !== "undefined" && document.referrer.includes("android-app://"))
            return Boolean(isStandalone)
        }

        setIsPWA(detectPWA())
    }, [])

    const anchor = "right"

    const toggleDrawer = (nextOpen: boolean) => () => {
        setOpen(nextOpen)
    }

    return (
        <>
            {/* 상단 헤더 */}
            <Box
                sx={{
                    position: "fixed",
                    top: isPWA ? "env(safe-area-inset-top, 0px)" : 0, // PWA에서 safe-area 적용
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    px: 2,
                    py: 1.5,
                    backgroundColor: "background.paper",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: 1,
                    borderColor: "divider",
                    // PWA에서 좌우 safe-area도 고려
                    ...(isPWA && {
                        paddingLeft: "calc(16px + env(safe-area-inset-left, 0px))",
                        paddingRight: "calc(16px + env(safe-area-inset-right, 0px))",
                    }),
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton sx={{ mr: 1 }} onClick={() => navigate(-1)}>
                        <ArrowBack />
                    </IconButton>
                    <Badge
                        color="success"
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        sx={{
                            "& .MuiBadge-dot": {
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                border: "2px solid white",
                            },
                        }}
                    >
                        <Avatar src={userAvatar} sx={{ width: 40, height: 40, mr: 2 }}>
                            {userName.charAt(0)}
                        </Avatar>
                    </Badge>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {userName}
                    </Typography>
                </Box>

                <IconButton onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>
            </Box>

            {/* Swipeable Drawer (responsive) */}
            <SwipeableDrawer
                anchor={anchor}
                open={open}
                onOpen={toggleDrawer(true)}
                onClose={toggleDrawer(false)}
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: { xs: "70%", sm: "50%", md: 400 },
                        height: "100vh",
                        borderTopLeftRadius: 16,
                        borderBottomLeftRadius: 16,
                        overflow: "auto",
                        // PWA에서 드로어도 safe-area 고려
                        ...(isPWA && {
                            paddingTop: "env(safe-area-inset-top, 0px)",
                            paddingLeft: "env(safe-area-inset-left, 0px)",
                        }),
                    },
                }}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                {/* 전체를 column으로 구성: 헤더 / 스크롤 영역 / 하단 액션 */}
                <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    {/* 드래그 핸들 + 프로필 헤더 */}
                    <Box sx={{ px: 2, pt: 1 }}>
                        <Box sx={{ display: "flex", justifyContent: "center", pt: 0.5, pb: 0.5 }}>
                            <Box
                                sx={{
                                    width: 48,
                                    height: 6,
                                    borderRadius: 3,
                                    backgroundColor: "divider",
                                }}
                            />
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "center", pt: 1 }}>
                            <Avatar src={userAvatar} sx={{ width: 72, height: 72, boxShadow: 3 }}>
                                {userName.charAt(0)}
                            </Avatar>
                        </Box>
                        <Typography variant="h6" align="center" sx={{ mt: 1, fontWeight: 700 }}>
                            {userName}
                        </Typography>
                    </Box>

                    <Divider />

                    {/* scrollable content */}
                    <Box sx={{ px: 1, pt: 1, pb: 1, overflow: "auto", flex: 1 }}>
                        <List>
                            <ListItem
                                secondaryAction={<Switch edge="end" checked={true} />}
                            >
                                <ListItemText primary="쪽지함 알림" />
                            </ListItem>
                        </List>

                        <Divider sx={{ my: 1 }} />

                        <Typography sx={{ px: 1, py: 1, fontWeight: 600 }}>참여자 2</Typography>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: "grey.500" }}>나</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="멜로 멜로나" />
                            </ListItem>

                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar src="/path/to/avatar.jpg" />
                                </ListItemAvatar>
                                <ListItemText primary="항공대유튜브PD" />
                            </ListItem>
                        </List>

                        <Box sx={{ height: 40 }} />
                    </Box>

                    <Divider />

                    {/* 하단 고정 액션 바 */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            px: 2,
                            py: 1,
                            borderTop: 1,
                            borderColor: "divider",
                            backgroundColor: "background.paper",
                            // PWA에서 하단 safe-area 고려
                            ...(isPWA && {
                                paddingBottom: "calc(8px + env(safe-area-inset-bottom, 0px))",
                            }),
                        }}
                    >
                        <Button startIcon={<ArrowBack />} onClick={() => setOpen(false)}>
                            나가기
                        </Button>
                        <Button variant="outlined" onClick={() => setOpen(false)}>
                            차단
                        </Button>
                    </Box>
                </Box>
            </SwipeableDrawer>
        </>
    )
}

export default MessageHeader