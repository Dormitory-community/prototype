"use client"

import React, { useRef, useEffect, useState } from "react"
import {
    Box,
    Typography,
    Avatar,
    IconButton,
    Paper,
    Badge,
} from "@mui/material"
import { ArrowBack, MoreVert } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

interface Message {
    id: string
    content: string
    timestamp: string
    isFromMe: boolean
    isRead?: boolean
}

interface ChatRoom {
    id: string
    userId: string
    userName: string
    userAvatar?: string
    lastMessage: string
    lastMessageTime: string
    unreadCount: number
    messages: Message[]
}

const Messages: React.FC = () => {
    const navigate = useNavigate()
    const headerRef = useRef<HTMLDivElement>(null)
    const [headerHeight, setHeaderHeight] = useState(64)

    // 목업 데이터
    const roomData: ChatRoom = {
        id: "room-1",
        userId: "user-1",
        userName: "이민수",
        userAvatar: "",
        lastMessage: "과제 관련해서 질문이 있어서 연락드립니다.",
        lastMessageTime: "2024-01-15 14:30",
        unreadCount: 2,
        messages: [
            {
                id: "msg-1",
                content: "안녕하세요! 이번 과제에 대해 질문이 있습니다.",
                timestamp: "2024-01-15 14:25",
                isFromMe: false,
            },
            {
                id: "msg-2",
                content: "네, 어떤 부분이 궁금하신가요?",
                timestamp: "2024-01-15 14:27",
                isFromMe: true,
            },
            {
                id: "msg-3",
                content: "과제 관련해서 질문이 있어서 연락드립니다.",
                timestamp: "2024-01-15 14:30",
                isFromMe: false,
                isRead: false,
            },
        ],
    }

    useEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight)
        }
    }, [])

    const formatMessageTime = (timestamp: string) => {
        const date = new Date(timestamp)
        return date.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
    }

    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            {/* 헤더 - 고정 */}
            <Paper
                ref={headerRef}
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
                    backgroundColor: "background.paper",
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
                                    src={roomData.userAvatar}
                                    sx={{ width: 40, height: 40, backgroundColor: "primary.main" }}
                                >
                                    {roomData.userName.charAt(0)}
                                </Avatar>
                            </Badge>
                        </Box>

                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {roomData.userName}
                        </Typography>
                    </Box>

                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </Box>
            </Paper>

            {/* 메시지 영역 */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    px: 2,
                    py: 1,
                    mt: `${headerHeight}px`, // 헤더 높이만큼 여유
                    backgroundColor: "grey.50",
                }}
            >
                {roomData.messages.map((message) => (
                    <Box
                        key={message.id}
                        sx={{
                            display: "flex",
                            justifyContent: message.isFromMe ? "flex-end" : "flex-start",
                            mb: 1,
                        }}
                    >
                        <Box
                            sx={{
                                maxWidth: "70%",
                                display: "flex",
                                flexDirection: message.isFromMe ? "row-reverse" : "row",
                                alignItems: "flex-end",
                                gap: 1,
                            }}
                        >
                            {!message.isFromMe && (
                                <Avatar
                                    src={roomData.userAvatar}
                                    sx={{ width: 32, height: 32, backgroundColor: "primary.main" }}
                                >
                                    {roomData.userName.charAt(0)}
                                </Avatar>
                            )}

                            <Box>
                                <Paper
                                    elevation={1}
                                    sx={{
                                        px: 2,
                                        py: 1.5,
                                        backgroundColor: message.isFromMe ? "primary.main" : "white",
                                        color: message.isFromMe ? "white" : "text.primary",
                                        borderRadius: 2,
                                        borderBottomLeftRadius: !message.isFromMe ? 0.5 : 2,
                                        borderBottomRightRadius: message.isFromMe ? 0.5 : 2,
                                    }}
                                >
                                    <Typography variant="body2">{message.content}</Typography>
                                </Paper>

                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: "text.secondary",
                                        display: "block",
                                        textAlign: message.isFromMe ? "right" : "left",
                                        mt: 0.5,
                                        px: 1,
                                    }}
                                >
                                    {formatMessageTime(message.timestamp)}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default Messages
