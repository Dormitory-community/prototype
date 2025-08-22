"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { Box, Paper, Typography, Avatar, CircularProgress } from "@mui/material"
import { theme } from "@/theme/theme.ts"
import ChatInput from "@/components/account/message/ChatInput.tsx"

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

interface MessagesProps {
    roomId?: string
    roomData?: ChatRoom
    onLoadMoreMessages?: (cursor: string) => Promise<Message[]>
}

const Messages: React.FC<MessagesProps> = ({ roomId, roomData: initialRoomData, onLoadMoreMessages }) => {
    const messagesContainerRef = useRef<HTMLDivElement>(null)
    const chatInputRef = useRef<HTMLDivElement>(null)

    const [roomData, setRoomData] = useState<ChatRoom | null>(initialRoomData || null)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [hasMoreMessages, setHasMoreMessages] = useState(true)
    const [newMessage, setNewMessage] = useState("")
    const [chatInputHeight, setChatInputHeight] = useState(72)
    const [safeAreaBottom, setSafeAreaBottom] = useState(0)
    const [isAtBottom, setIsAtBottom] = useState(true)
    const [isVisible, setIsVisible] = useState(false)

    // ----------------------------
    // 1️⃣ 실제 viewport 높이 계산
    // ----------------------------
    useEffect(() => {
        const setVh = () => {
            document.documentElement.style.setProperty("--vh", `${window.innerHeight}px`)
        }
        setVh()
        window.addEventListener("resize", setVh)
        return () => window.removeEventListener("resize", setVh)
    }, [])

    // ----------------------------
    // 2️⃣ ChatInput 높이와 safe-area 계산
    // ----------------------------
    useEffect(() => {
        const updateOffsets = () => {
            if (!chatInputRef.current) return
            const el = chatInputRef.current
            const style = getComputedStyle(el)
            const paddingBottom = parseInt(style.paddingBottom) || 0
            setChatInputHeight(el.offsetHeight)
            setSafeAreaBottom(paddingBottom)
        }

        updateOffsets()
        window.addEventListener("resize", updateOffsets)
        const ro = new ResizeObserver(updateOffsets)
        if (chatInputRef.current) ro.observe(chatInputRef.current)
        return () => {
            window.removeEventListener("resize", updateOffsets)
            ro.disconnect()
        }
    }, [])

    // ----------------------------
    // 3️⃣ Mock 데이터 (없으면 생성)
    // ----------------------------
    useEffect(() => {
        if (initialRoomData) return
        const mockMessages: Message[] = [
            { id: "msg-1", content: "안녕하세요!", timestamp: "2024-01-15 14:25", isFromMe: false },
            { id: "msg-2", content: "네, 어떤 부분이 궁금한가요?", timestamp: "2024-01-15 14:27", isFromMe: true },
            ...Array.from({ length: 15 }, (_, i) => ({
                id: `msg-${i + 3}`,
                content: `테스트 메시지 ${i + 1}`,
                timestamp: `2024-01-15 ${14 + Math.floor(i / 4)}:${30 + ((i * 5) % 60)}`,
                isFromMe: i % 2 === 0,
                isRead: true,
            })),
        ]

        setRoomData({
            id: roomId || "room-1",
            userId: "user-1",
            userName: "이민수",
            userAvatar: "",
            lastMessage: "마지막 메시지입니다.",
            lastMessageTime: "2024-01-15 18:45",
            unreadCount: 2,
            messages: mockMessages,
        })
    }, [initialRoomData, roomId])

    // ----------------------------
    // 4️⃣ Scroll to Bottom
    // ----------------------------
    const scrollToBottom = useCallback((smooth = true) => {
        const container = messagesContainerRef.current
        if (!container) return
        const scrollHeight = container.scrollHeight
        const clientHeight = container.clientHeight
        container.scrollTo({
            top: scrollHeight - clientHeight,
            behavior: smooth ? "smooth" : "auto",
        })
    }, [])

    // 초기 렌더 후 스크롤
    useEffect(() => {
        if (!roomData?.messages.length) return
        // iOS PWA 대응: setTimeout으로 조금 늦게 호출
        const t = setTimeout(() => {
            scrollToBottom(false)
            setIsVisible(true)
        }, 50)
        return () => clearTimeout(t)
    }, [roomData?.messages, scrollToBottom])

    // 새 메시지 올 때
    useEffect(() => {
        if (isAtBottom && roomData?.messages.length) scrollToBottom(true)
    }, [roomData?.messages, isAtBottom, scrollToBottom])

    // ----------------------------
    // 5️⃣ Scroll 핸들링
    // ----------------------------
    const handleScroll = useCallback(() => {
        const container = messagesContainerRef.current
        if (!container) return
        const { scrollTop, scrollHeight, clientHeight } = container
        const scrollBottom = scrollHeight - scrollTop - clientHeight
        setIsAtBottom(scrollBottom < 50)

        if (scrollTop < 100 && hasMoreMessages && !isLoadingMore && onLoadMoreMessages) {
            loadMoreMessages()
        }
    }, [hasMoreMessages, isLoadingMore, onLoadMoreMessages])

    const loadMoreMessages = useCallback(async () => {
        if (!roomData?.messages.length || !onLoadMoreMessages) return
        setIsLoadingMore(true)
        try {
            const cursor = roomData.messages[0].id
            const newMessages = await onLoadMoreMessages(cursor)
            if (newMessages.length > 0)
                setRoomData(prev => prev ? { ...prev, messages: [...newMessages, ...prev.messages] } : null)
            else setHasMoreMessages(false)
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoadingMore(false)
        }
    }, [roomData?.messages, onLoadMoreMessages])

    const formatTime = (ts: string) =>
        new Date(ts).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false })

    if (!roomData)
        return (
            <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress />
            </Box>
        )

    // ----------------------------
    // 6️⃣ Render
    // ----------------------------
    return (
        <Box
            sx={{
                height: "calc(var(--vh, 1vh) * 100)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
            }}
        >
            <Box
                ref={messagesContainerRef}
                onScroll={handleScroll}
                style={{ visibility: isVisible ? "visible" : "hidden" }}
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    px: 2,
                    py: 1,
                    display: "flex",
                    flexDirection: "column",
                    "&::-webkit-scrollbar": { width: "4px" },
                    "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
                    "&::-webkit-scrollbar-thumb": { backgroundColor: theme.palette.divider, borderRadius: "2px" },
                    paddingBottom: chatInputHeight + safeAreaBottom + 8,
                }}
            >
                {isLoadingMore && (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                        <CircularProgress size={24} />
                    </Box>
                )}
                {roomData.messages.map((msg, i) => {
                    const showAvatar =
                        !msg.isFromMe && (i === 0 || roomData.messages[i - 1].isFromMe !== msg.isFromMe)
                    return (
                        <Box key={msg.id} sx={{ display: "flex", justifyContent: msg.isFromMe ? "flex-end" : "flex-start", mb: 1 }}>
                            <Box
                                sx={{
                                    maxWidth: "70%",
                                    display: "flex",
                                    flexDirection: msg.isFromMe ? "row-reverse" : "row",
                                    alignItems: "flex-end",
                                    gap: 1,
                                }}
                            >
                                {!msg.isFromMe && showAvatar && (
                                    <Avatar sx={{ width: 32, height: 32, backgroundColor: "primary.main" }}>
                                        {roomData.userName.charAt(0)}
                                    </Avatar>
                                )}
                                <Box>
                                    <Paper
                                        elevation={1}
                                        sx={{
                                            px: 2,
                                            py: 1.5,
                                            backgroundColor: msg.isFromMe
                                                ? theme.palette.primary.main
                                                : theme.palette.mode === "dark"
                                                    ? theme.palette.background.paper
                                                    : "grey.600",
                                            color: msg.isFromMe ? "white" : "text.primary",
                                            borderRadius: 2,
                                            borderBottomLeftRadius: !msg.isFromMe ? 0.5 : 2,
                                            borderBottomRightRadius: msg.isFromMe ? 0.5 : 2,
                                        }}
                                    >
                                        <Typography variant="body2">{msg.content}</Typography>
                                    </Paper>
                                    <Typography variant="caption" sx={{ mt: 0.5, px: 1, color: "text.secondary", display: "block", textAlign: msg.isFromMe ? "right" : "left" }}>
                                        {formatTime(msg.timestamp)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    )
                })}
            </Box>

            {/* ChatInput: sticky로 배치 */}
            <Box ref={chatInputRef} sx={{ position: "sticky", bottom: 0, zIndex: 1000 }}>
                <ChatInput
                    value={newMessage}
                    onChange={setNewMessage}
                    onSend={() => {
                        if (!newMessage.trim()) return
                        setRoomData(prev => prev ? { ...prev, messages: [...prev.messages, { id: `${Date.now()}`, content: newMessage, timestamp: new Date().toISOString(), isFromMe: true }] } : prev)
                        setNewMessage("")
                        setTimeout(() => scrollToBottom(true), 50)
                    }}
                    sx={{ paddingBottom: "env(safe-area-inset-bottom, 8px)" }}
                />
            </Box>
        </Box>
    )
}

export default Messages
