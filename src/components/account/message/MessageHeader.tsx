"use client"

import React from "react"
import { Box, Typography, Avatar, IconButton, Paper, Badge } from "@mui/material"
import { ArrowBack, MoreVert } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

interface MessageHeaderProps {
    userName: string
    userAvatar?: string
    unreadCount?: number
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ userName, userAvatar}) => {
    const navigate = useNavigate()

    return (
        <Paper
            elevation={1}
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                px: 2,
                py: 1.5,
                borderRadius: 0,
                borderBottom: 1,
                borderColor: "divider",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton sx={{ mr: 1 }} onClick={() => navigate(-1)}>
                        <ArrowBack />
                    </IconButton>

                    <Box sx={{ position: "relative", mr: 2 }}>
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
                            <Avatar
                                src={userAvatar}
                                sx={{ width: 40, height: 40, backgroundColor: "primary.main" }}
                            >
                                {userName.charAt(0)}
                            </Avatar>
                        </Badge>
                    </Box>

                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {userName}
                    </Typography>
                </Box>

                <IconButton>
                    <MoreVert />
                </IconButton>
            </Box>
        </Paper>
    )
}

export default MessageHeader
