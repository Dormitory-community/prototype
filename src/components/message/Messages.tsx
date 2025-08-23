"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react"
import { Box, Paper, Typography, Avatar, CircularProgress, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import ChatInput from "@/components/message/ChatInput.tsx"
import MessageHeader from "@/components/message/MessageHeader.tsx"
import { useChat } from "@/contexts/chatContext.tsx"

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
    onLoadMoreMessages?: (roomId: string, cursor: string) => Promise<Message[]>
}

const Messages: React.FC<MessagesProps> = ({ roomId, roomData: initialRoomData, onLoadMoreMessages }) => {
    const theme = useTheme()
    const messagesContainerRef = useRef<HTMLDivElement | null>(null)
    const messagesEndRef = useRef<HTMLDivElement | null>(null)
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const isSmallScreen = useMediaQuery("(max-height: 600px)")
    const { loadMoreMessages, hasMoreMessages } = useChat()

    const [roomData, setRoomData] = useState<ChatRoom | null>(initialRoomData || null)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [newMessage, setNewMessage] = useState("")
    const [isInitialized, setIsInitialized] = useState(false)
    const [isPWA, setIsPWA] = useState(false)
    const [keyboardHeight, setKeyboardHeight] = useState(0)
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

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

    useEffect(() => {
        const handleViewportChange = () => {
            const visualViewport = (window as any).visualViewport

            if (visualViewport) {
                const currentHeight = visualViewport.height
                const windowHeight = window.innerHeight
                const heightDiff = windowHeight - currentHeight

                if (heightDiff > 150) {
                    setKeyboardHeight(heightDiff)
                    setIsKeyboardVisible(true)
                } else {
                    setKeyboardHeight(0)
                    setIsKeyboardVisible(false)
                }
            } else {
                const currentHeight = window.innerHeight
                const initialHeight = window.screen.height
                const heightDiff = initialHeight - currentHeight

                if (heightDiff > 150) {
                    setKeyboardHeight(heightDiff)
                    setIsKeyboardVisible(true)
                } else {
                    setKeyboardHeight(0)
                    setIsKeyboardVisible(false)
                }
            }
        }

        const visualViewport = (window as any).visualViewport
        if (visualViewport) {
            visualViewport.addEventListener("resize", handleViewportChange)
        }
        window.addEventListener("resize", handleViewportChange)

        return () => {
            if (visualViewport) {
                visualViewport.removeEventListener("resize", handleViewportChange)
            }
            window.removeEventListener("resize", handleViewportChange)
        }
    }, [])

    // mock init (원본 유지)
    useEffect(() => {
        if (initialRoomData) return
        const mockMessages: Message[] = [
            { id: "msg-1", content: "안녕하세요!", timestamp: "2024-01-15 14:25", isFromMe: false },
            { id: "msg-2", content: "네, 어떤 부분이 궁금한가요?", timestamp: "2024-01-15 14:27", isFromMe: true },
            ...Array.from({ length: 18 }, (_, i) => ({
                id: `msg-${i + 3}`,
                content: `테스트 메시지 ${i + 1}입니다. 스크롤 테스트를 위한 메시지입니다.`,
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

    // 스크롤 유틸
    const scrollToBottom = useCallback((behavior: "smooth" | "auto" = "smooth") => {
        if (!messagesContainerRef.current) return
        const container = messagesContainerRef.current
        container.scrollTo({ top: container.scrollHeight, behavior })
    }, [])

    const isScrolledToBottom = useCallback(() => {
        if (!messagesContainerRef.current) return true
        const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current
        return scrollHeight - scrollTop - clientHeight < 50
    }, [])

    useLayoutEffect(() => {
        if (!roomData?.messages.length || isInitialized) return

        const container = messagesContainerRef.current
        if (!container) {
            setIsInitialized(true)
            return
        }

        // PWA 환경에서는 여러 번 시도하여 확실히 스크롤
        const scrollToBottomWithRetry = (attempts = 0) => {
            if (attempts > 5) {
                setIsInitialized(true)
                return
            }

            container.scrollTo({ top: container.scrollHeight, behavior: "auto" })

            // 스크롤이 제대로 되었는지 확인
            setTimeout(() => {
                const { scrollTop, scrollHeight, clientHeight } = container
                const isAtBottom = scrollHeight - scrollTop - clientHeight < 10

                if (!isAtBottom) {
                    scrollToBottomWithRetry(attempts + 1)
                } else {
                    setIsInitialized(true)
                }
            }, 100)
        }

        // 초기 지연 후 스크롤 시작
        setTimeout(() => scrollToBottomWithRetry(), 50)
    }, [roomData?.messages, isInitialized])

    // 이전 메시지 로드
    const handleScroll = useCallback(() => {
        if (!messagesContainerRef.current || isLoadingMore || !hasMore) return
        const container = messagesContainerRef.current
        const { scrollTop } = container
        if (scrollTop < 50 && !isLoadingMore && hasMore) {
            setIsLoadingMore(true)
            const oldestMessage = roomData?.messages[0]
            const cursor = oldestMessage ? oldestMessage.id : ""
            const loadMessages = onLoadMoreMessages || loadMoreMessages
            loadMessages(roomId || "room-1", cursor)
                .then((newMessages) => {
                    if (newMessages.length === 0) {
                        setHasMore(false)
                        return
                    }
                    const prevScrollHeight = container.scrollHeight
                    setRoomData((prev) => ({ ...prev!, messages: [...newMessages, ...prev!.messages] }))
                    requestAnimationFrame(() => {
                        container.scrollTop = container.scrollHeight - prevScrollHeight
                    })
                })
                .catch((e) => console.error(e))
                .finally(() => setIsLoadingMore(false))
        }
    }, [isLoadingMore, hasMore, roomId, roomData, onLoadMoreMessages, loadMoreMessages])

    // 메시지 전송
    const handleSendMessage = useCallback(() => {
        if (!newMessage.trim() || !roomId) return
        const newMsg: Message = {
            id: `msg-${Date.now()}`,
            content: newMessage,
            timestamp: new Date().toISOString(),
            isFromMe: true,
            isRead: true,
        }
        setRoomData((prev) => ({
            ...prev!,
            messages: [...prev!.messages, newMsg],
            lastMessage: newMessage,
            lastMessageTime: new Date().toISOString(),
        }))
        setNewMessage("")
        setTimeout(() => scrollToBottom("smooth"), 50)
    }, [newMessage, roomId, scrollToBottom])

    useEffect(() => {
        if (isKeyboardVisible && roomData?.messages.length) {
            // 키보드가 올라올 때 마지막 메시지가 보이도록 스크롤 조정
            setTimeout(() => {
                if (isScrolledToBottom()) {
                    scrollToBottom("auto")
                }
            }, 300) // 키보드 애니메이션 완료 후
        }
    }, [isKeyboardVisible, scrollToBottom, isScrolledToBottom])

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp)
        const now = new Date()
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
        if (diffInHours < 24) return date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false })
        if (diffInHours < 168) return date.toLocaleDateString("ko-KR", { weekday: "short" })
        return date.toLocaleDateString("ko-KR", { month: "short", day: "numeric" })
    }

    const getMessagesBottomPadding = () => {
        const baseInputHeight = isMobile ? 80 : 70 // 기본 입력창 높이
        const safeAreaBottom = isPWA ? 20 : 0 // safe-area 추정값

        if (isKeyboardVisible) {
            // 키보드가 올라온 상태에서는 입력창 높이만 고려
            return `${baseInputHeight + 20}px`
        } else {
            // 키보드가 없을 때는 입력창 + safe-area 고려
            return `${baseInputHeight + safeAreaBottom + 20}px`
        }
    }

    return (
        <>
            {/* 메인 콘텐츠: 스크롤 가능 영역 */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: { xs: "calc(100vh - 56px)", md: "calc(100vh - 64px)" },
                    backgroundColor: "background.default",
                    overflow: "hidden",
                }}
            >
                <MessageHeader userName={roomData?.userName || ""} userAvatar={roomData?.userAvatar} />

                <Box
                    ref={messagesContainerRef}
                    onScroll={handleScroll}
                    sx={{
                        flex: 1,
                        overflowY: "auto",
                        px: { xs: 2, md: 3 },
                        py: { xs: 2, md: 3 },
                        display: "flex",
                        flexDirection: "column",
                        WebkitOverflowScrolling: "touch",
                        // 동적 하단 패딩 적용
                        paddingBottom: getMessagesBottomPadding(),
                        // 스크롤 바운스 방지 (iOS)
                        overscrollBehavior: "none",
                    }}
                >
                    {isLoadingMore && (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                            <CircularProgress size={24} />
                        </Box>
                    )}

                    {roomData?.messages.map((msg, i) => {
                        const showAvatar = !msg.isFromMe && (i === 0 || roomData.messages[i - 1].isFromMe !== msg.isFromMe)
                        return (
                            <Box
                                key={msg.id}
                                sx={{ display: "flex", justifyContent: msg.isFromMe ? "flex-end" : "flex-start", mb: 1.5 }}
                            >
                                <Box
                                    sx={{
                                        maxWidth: isMobile ? "85%" : "70%",
                                        display: "flex",
                                        flexDirection: msg.isFromMe ? "row-reverse" : "row",
                                        alignItems: "flex-end",
                                        gap: 1,
                                    }}
                                >
                                    {!msg.isFromMe && showAvatar && (
                                        <Avatar
                                            sx={{
                                                width: isMobile ? 32 : 36,
                                                height: isMobile ? 32 : 36,
                                                backgroundColor: "primary.main",
                                                flexShrink: 0,
                                            }}
                                        >
                                            {roomData.userName.charAt(0)}
                                        </Avatar>
                                    )}
                                    <Box sx={{ minWidth: 0 }}>
                                        <Paper
                                            elevation={1}
                                            sx={{
                                                px: isMobile ? 2 : 2.5,
                                                py: isMobile ? 1.5 : 2,
                                                backgroundColor: msg.isFromMe
                                                    ? theme.palette.primary.main
                                                    : theme.palette.mode === "dark"
                                                        ? theme.palette.grey[600]
                                                        : theme.palette.grey[100],
                                                color: msg.isFromMe ? "white" : "text.primary",
                                                borderRadius: 2,
                                                borderBottomLeftRadius: !msg.isFromMe ? 0.5 : 2,
                                                borderBottomRightRadius: msg.isFromMe ? 0.5 : 2,
                                                wordBreak: "break-word",
                                            }}
                                        >
                                            <Typography variant={isMobile ? "body2" : "body1"} sx={{ whiteSpace: "pre-wrap" }}>
                                                {msg.content}
                                            </Typography>
                                        </Paper>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                mt: 0.5,
                                                px: 1,
                                                color: "text.secondary",
                                                display: "block",
                                                textAlign: msg.isFromMe ? "right" : "left",
                                                fontSize: isMobile ? "0.7rem" : "0.75rem",
                                            }}
                                        >
                                            {formatTime(msg.timestamp)}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })}
                    <div ref={messagesEndRef} />
                </Box>
            </Box>

            {/* ChatInput: 화면 하단에 완전 고정, 스크롤과 분리 */}
            <ChatInput value={newMessage} onChange={setNewMessage} onSend={handleSendMessage} />
        </>
    )
}

export default Messages
