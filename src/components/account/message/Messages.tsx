"use client"

import React from "react"
import {
    Box,
    Typography,
    Avatar,
    Paper,
} from "@mui/material"
import {theme} from "@/theme/theme.ts";

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

    // Mock data
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
            {
                id: "msg-4",
                content: "메시지 스크롤 테스트를 위한 긴 내용입니다. 메시지 스크롤 테스트를 위한 긴 내용입니다. 메시지 스크롤 테스트를 위한 긴 내용입니다.",
                timestamp: "2024-01-15 14:35",
                isFromMe: true,
            },
            {
                id: "msg-5",
                content: "메시지 스크롤 테스트를 위한 긴 내용입니다. 메시지 스크롤 테스트를 위한 긴 내용입니다. 메시지 스크롤 테스트를 위한 긴 내용입니다. 메시지 스크롤 테스트를 위한 긴 내용입니다.",
                timestamp: "2024-01-15 14:40",
                isFromMe: false,
            },
            {
                id: "msg-6",
                content: "스크롤 테스트 메시지입니다.",
                timestamp: "2024-01-15 14:45",
                isFromMe: true,
            },
            {
                id: "msg-7",
                content: "스크롤 테스트 메시지입니다. 스크롤 테스트 메시지입니다.",
                timestamp: "2024-01-15 14:50",
                isFromMe: false,
            },
            {
                id: "msg-8",
                content: "더 긴 메시지 테스트를 위한 내용입니다.",
                timestamp: "2024-01-15 14:55",
                isFromMe: true,
            },
        ],
    }

    const formatMessageTime = (timestamp: string) => {
        const date = new Date(timestamp)
        return date.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
    }

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                mt: 2
            }}
        >
            {/* Message Area - Scrollable */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    px: 2,
                    py: 1,
                    display: "flex",
                    flexDirection: "column",
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
                                        backgroundColor: message.isFromMe
                                            ? theme.palette.primary.main
                                            : theme.palette.mode === "dark"
                                                ? theme.palette.background.paper // 다크모드: 밝은 회색
                                                : "grey[600]" ,                      // 라이트모드: 흰색,
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