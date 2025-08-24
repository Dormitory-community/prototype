"use client"

import React, { useState } from "react"
import {
    Box,
    Typography,
    IconButton,
    SwipeableDrawer,
    Divider,
    List,
    ListItemText,
    ListItemButton,
    ListItem
} from "@mui/material"
import {ArrowBack, Settings} from "@mui/icons-material"

const iOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent)

const ChatRoomsHeader: React.FC = () => {
    const [open, setOpen] = useState(false)

    const anchor = "right"

    const toggleDrawer = (nextOpen: boolean) => () => {
        setOpen(nextOpen)
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 2,
                    py: 1.5,
                    backgroundColor: "background.paper",
                    borderBottom: 1,
                    borderColor: "divider",
                    position: "fixed",
                    top: "env(safe-area-inset-top, 0px)", // ✅ safe-area 적용
                    left: 0,
                    right: 0,
                    zIndex: 1200,
                    paddingLeft: "calc(16px + env(safe-area-inset-left, 0px))", // ✅ 좌우도 고려
                    paddingRight: "calc(16px + env(safe-area-inset-right, 0px))",
                }}
            >

            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    쪽지함
                </Typography>
                <IconButton onClick={toggleDrawer(true)} sx={{ color: "text.secondary" }}>
                    <Settings />
                </IconButton>
            </Box>

            <SwipeableDrawer
                anchor={anchor}
                open={open}
                onOpen={toggleDrawer(true)}
                onClose={toggleDrawer(false)}
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: { xs: "100%", sm: "50%", md: 400 },
                        height: "100vh",
                        overflow: "auto",
                    },
                }}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    {/* Drag handle */}
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

                    {/* Header */}
                    <Box sx={{ px: 2, pt: 1, display: "flex", alignItems: "center" }}>
                        <IconButton onClick={toggleDrawer(false)}>
                            <ArrowBack />
                        </IconButton>
                        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center", fontWeight: 700 }}>
                            설정
                        </Typography>
                    </Box>

                    <Divider />

                    {/* Scrollable content */}
                    <Box sx={{ px: 1, pt: 1, pb: 1, overflow: "auto", flex: 1 }}>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="쪽지"
                                    sx={{
                                        "& .MuiListItemText-primary": {
                                            fontWeight: 700,
                                            fontSize: { xs: "1.4rem", sm: "1.5rem" },
                                            color: "text.primary",
                                        },
                                    }}
                                />
                            </ListItem>
                            <Divider />
                            <ListItemButton
                                onClick={() => {

                                    toggleDrawer(false)();
                                }}
                            >
                                <ListItemText primary="차단한 쪽지함 관리" />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => {
                                    toggleDrawer(false)();
                                }}
                            >
                                <ListItemText primary="수신 및 발신 설정" />
                            </ListItemButton>
                        </List>
                    </Box>

                    <Divider />

                    {/* Bottom action bar */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            px: 2,
                            py: 1,
                            borderTop: 1,
                            borderColor: "divider",
                            backgroundColor: "background.paper",
                        }}
                    >
                    </Box>
                </Box>
            </SwipeableDrawer>
        </>
    )
}

export default ChatRoomsHeader