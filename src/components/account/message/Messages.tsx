"use client"

import React, { useState, useRef, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
    Box,
    Container,
    Typography,
    Avatar,
    IconButton,
    TextField,
    Paper,
    Badge,
    InputAdornment,
} from "@mui/material"
import { ArrowBack, Send, MoreVert } from "@mui/icons-material"

interface Message {
    id: string
    content: string
    timestamp: string
    isFromMe: boolean
    isRead?: boolean
}

interface Messages {
    id: string
    userId: string
    userName: string
    userAvatar?: string
    lastMessage: string
    lastMessageTime: string
    unreadCount: number
    messages: Message[]
}

const ChatRoom: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    // const { roomId } = useParams()
    // const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const [newMessage, setNewMessage] = useState("")

    // location.state에서 room 정보 가져오기 (실제로는 roomId로 API 호출)
    const roomData = location.state?.room as Messages

    const [messages, setMessages] = useState<Message[]>(roomData?.messages || [])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const message: Message = {
                id: `msg-${Date.now()}`,
                content: newMessage.trim(),
                timestamp: new Date().toISOString(),
                isFromMe: true,
                isRead: true
            }

            setMessages([...messages, message])
            setNewMessage("")
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const formatMessageTime = (timestamp: string) => {
        const date = new Date(timestamp)
        return date.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    }

    const formatDateHeader = (timestamp: string) => {
        const date = new Date(timestamp)
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)

        if (date.toDateString() === today.toDateString()) {
            return "오늘"
        } else if (date.toDateString() === yesterday.toDateString()) {
            return "어제"
        } else {
            return date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        }
    }

    // 날짜별로 메시지 그룹화
    const groupMessagesByDate = (messages: Message[]) => {
        const groups: { [key: string]: Message[] } = {}

        messages.forEach(message => {
            const date = new Date(message.timestamp).toDateString()
            if (!groups[date]) {
                groups[date] = []
            }
            groups[date].push(message)
        })

        return Object.entries(groups).map(([date, msgs]) => ({
            date,
            messages: msgs
        }))
    }

    const messageGroups = groupMessagesByDate(messages)

    if (!roomData) {
        return (
            <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
                <Typography variant="h6" color="text.secondary">
                    채팅방을 찾을 수 없습니다.
                </Typography>
            </Container>
        )
    }

    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            {/* 헤더 */}
            <Paper
                elevation={1}
                sx={{
                    px: 2,
                    py: 1.5,
                    borderRadius: 0,
                    borderBottom: 1,
                    borderColor: "divider"
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
                            <ArrowBack />
                        </IconButton>

                        <Box sx={{ position: "relative", mr: 2 }}>
                            <Badge
                                color="success"
                                variant="dot"
                                overlap="circular"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                sx={{
                                    '& .MuiBadge-dot': {
                                        width: 10,
                                        height: 10,
                                        borderRadius: '50%',
                                        border: '2px solid white',
                                    }
                                }}
                            >
                                <Avatar
                                    src={roomData.userAvatar}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        backgroundColor: "primary.main",
                                    }}
                                >
                                    {roomData.userName.charAt(0)}
                                </Avatar>
                            </Badge>
                        </Box>

                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {roomData.userName}
                            </Typography>
                        </Box>
                    </Box>

                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </Box>
            </Paper>

            {/* 메시지 영역 */}
            <Box sx={{
                flex: 1,
                overflowY: "auto",
                px: 2,
                py: 1,
                backgroundColor: "grey.50"
            }}>
                {messageGroups.map(({ date, messages: dailyMessages }) => (
                    <Box key={date}>
                        {/* 날짜 헤더 */}
                        <Box sx={{ textAlign: "center", my: 2 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    backgroundColor: "white",
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 3,
                                    color: "text.secondary",
                                    boxShadow: 1
                                }}
                            >
                                {formatDateHeader(date)}
                            </Typography>
                        </Box>

                        {/* 해당 날짜의 메시지들 */}
                        {dailyMessages.map((message) => (
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
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                backgroundColor: "primary.main",
                                            }}
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
                                            <Typography variant="body2">
                                                {message.content}
                                            </Typography>
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
                ))}
                <div ref={messagesEndRef} />
            </Box>

            {/* 입력 영역 */}
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    borderRadius: 0,
                    borderTop: 1,
                    borderColor: "divider"
                }}
            >
                <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="메시지를 입력하세요..."
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 3,
                        }
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    color="primary"
                                    disabled={!newMessage.trim()}
                                    onClick={handleSendMessage}
                                    sx={{
                                        backgroundColor: newMessage.trim() ? "primary.main" : "transparent",
                                        color: newMessage.trim() ? "white" : "text.disabled",
                                        '&:hover': {
                                            backgroundColor: newMessage.trim() ? "primary.dark" : "transparent",
                                        },
                                        '&.Mui-disabled': {
                                            backgroundColor: "transparent",
                                        }
                                    }}
                                >
                                    <Send />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Paper>
        </Box>
    )
}

export default ChatRoom