"use client"

import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import { Box, Typography, Avatar, Paper, CircularProgress } from "@mui/material"
import { theme } from "@/theme/theme.ts"

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
    chatInputRef: React.RefObject<HTMLDivElement>
}

const Messages: React.FC<MessagesProps> = ({ roomId, roomData: initialRoomData, onLoadMoreMessages, chatInputRef }) => {
    const messagesContainerRef = useRef<HTMLDivElement>(null)
    const [roomData, setRoomData] = useState<ChatRoom | null>(initialRoomData || null)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [hasMoreMessages, setHasMoreMessages] = useState(true)
    const [showScrollToBottom, setShowScrollToBottom] = useState(false)
    const [isAtBottom, setIsAtBottom] = useState(true)
    const [isVisible, setIsVisible] = useState(false)

    const [chatInputHeight, setChatInputHeight] = useState(100)
    const [safeAreaBottom, setSafeAreaBottom] = useState(20)

    // Safe area + ChatInput 높이 동적 계산
    useEffect(() => {
        const updateOffsets = () => {
            if (chatInputRef?.current) {
                const el = chatInputRef.current
                const style = getComputedStyle(el)
                const paddingBottom = parseInt(style.paddingBottom) || 0
                setChatInputHeight(el.offsetHeight)
                setSafeAreaBottom(paddingBottom)
            }
        }

        updateOffsets()
        window.addEventListener("resize", updateOffsets)
        const resizeObserver = new ResizeObserver(updateOffsets)
        if (chatInputRef?.current) resizeObserver.observe(chatInputRef.current)

        return () => {
            window.removeEventListener("resize", updateOffsets)
            resizeObserver.disconnect()
        }
    }, [chatInputRef])

    // Mock 데이터
    useEffect(() => {
        if (!initialRoomData) {
            const mockMessages: Message[] = [
                { id: "msg-1", content: "안녕하세요! 이번 과제에 대해 질문이 있습니다.", timestamp: "2024-01-15 14:25", isFromMe: false },
                { id: "msg-2", content: "네, 어떤 부분이 궁금하신가요?", timestamp: "2024-01-15 14:27", isFromMe: true },
                { id: "msg-3", content: "과제 관련해서 질문이 있어서 연락드립니다.", timestamp: "2024-01-15 14:30", isFromMe: false, isRead: false },
                ...Array.from({ length: 17 }, (_, i) => ({
                    id: `msg-${i + 4}`,
                    content: `테스트 메시지 ${i + 1}입니다. 스크롤 테스트용 메시지입니다.`,
                    timestamp: `2024-01-15 ${14 + Math.floor(i / 4)}:${30 + ((i * 5) % 60)}`,
                    isFromMe: i % 3 === 0,
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
        }
    }, [roomId, initialRoomData])

    const scrollToBottom = useCallback((smooth = true) => {
        const container = messagesContainerRef.current
        if (container) {
            const scrollHeight = container.scrollHeight
            const clientHeight = container.clientHeight
            const targetScrollTop = Math.max(0, scrollHeight - clientHeight + chatInputHeight + safeAreaBottom)
            container.scrollTo({ top: targetScrollTop, behavior: smooth ? "smooth" : "auto" })
        }
    }, [chatInputHeight, safeAreaBottom])

    // 초기 스크롤
    useEffect(() => {
        if (!roomData?.messages.length) return
        requestAnimationFrame(() => {
            scrollToBottom(false)
            setIsVisible(true)
        })
    }, [roomData?.messages, scrollToBottom])

    // 새 메시지
    useEffect(() => {
        if (isAtBottom && roomData?.messages.length) scrollToBottom(true)
    }, [roomData?.messages, isAtBottom, scrollToBottom])

    const handleScroll = useCallback(() => {
        const container = messagesContainerRef.current
        if (!container) return
        const { scrollTop, scrollHeight, clientHeight } = container
        const scrollBottom = scrollHeight - scrollTop - clientHeight
        const isNearBottom = scrollBottom < 50
        const isNearTop = scrollTop < 100

        setIsAtBottom(isNearBottom)
        setShowScrollToBottom(!isNearBottom)

        if (isNearTop && hasMoreMessages && !isLoadingMore && onLoadMoreMessages) loadMoreMessages()
    }, [hasMoreMessages, isLoadingMore, onLoadMoreMessages])

    const loadMoreMessages = useCallback(async () => {
        if (!roomData?.messages.length || !onLoadMoreMessages) return
        setIsLoadingMore(true)
        try {
            const cursor = roomData.messages[0].id
            const newMessages = await onLoadMoreMessages(cursor)
            if (newMessages.length > 0) setRoomData(prev => prev ? { ...prev, messages: [...newMessages, ...prev.messages] } : null)
            else setHasMoreMessages(false)
        } catch (error) {
            console.error("Failed to load more messages:", error)
        } finally { setIsLoadingMore(false) }
    }, [roomData?.messages, onLoadMoreMessages])

    const formatMessageTime = (timestamp: string) => {
        const date = new Date(timestamp)
        return date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false })
    }

    if (!roomData) return <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><CircularProgress /></Box>

    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", position: "relative" }}>
            <Box
                ref={messagesContainerRef}
                onScroll={handleScroll}
                style={{ visibility: isVisible ? "visible" : "hidden" }}
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    px: 2,
                    py: 1,
                    pb: `${chatInputHeight + safeAreaBottom + 10}px`,
                    pt: 2,
                    display: "flex",
                    flexDirection: "column",
                    "&::-webkit-scrollbar": { width: "4px" },
                    "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
                    "&::-webkit-scrollbar-thumb": { backgroundColor: theme.palette.divider, borderRadius: "2px", "&:hover": { backgroundColor: theme.palette.text.secondary } },
                }}
            >
                {isLoadingMore && <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}><CircularProgress size={24} /></Box>}

                {roomData.messages.map((message, index) => {
                    const showAvatar = !message.isFromMe && (index === 0 || roomData.messages[index - 1]?.isFromMe !== message.isFromMe)
                    return (
                        <Box key={message.id} sx={{ display: "flex", justifyContent: message.isFromMe ? "flex-end" : "flex-start", mb: 1 }}>
                            <Box sx={{ maxWidth: "70%", display: "flex", flexDirection: message.isFromMe ? "row-reverse" : "row", alignItems: "flex-end", gap: 1 }}>
                                {!message.isFromMe && showAvatar && <Avatar src={roomData.userAvatar} sx={{ width: 32, height: 32, backgroundColor: "primary.main" }}>{roomData.userName.charAt(0)}</Avatar>}
                                <Box>
                                    <Paper elevation={1} sx={{ px: 2, py: 1.5, backgroundColor: message.isFromMe ? theme.palette.primary.main : theme.palette.mode === "dark" ? theme.palette.background.paper : "grey.600", color: message.isFromMe ? "white" : "text.primary", borderRadius: 2, borderBottomLeftRadius: !message.isFromMe ? 0.5 : 2, borderBottomRightRadius: message.isFromMe ? 0.5 : 2 }}>
                                        <Typography variant="body2">{message.content}</Typography>
                                    </Paper>
                                    <Typography variant="caption" sx={{ display: "block", textAlign: message.isFromMe ? "right" : "left", mt: 0.5, px: 1, color: "text.secondary" }}>
                                        {formatMessageTime(message.timestamp)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}

export default Messages
