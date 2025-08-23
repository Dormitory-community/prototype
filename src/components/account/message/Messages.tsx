"use client"

import React, {useState, useEffect, useRef, useCallback, useLayoutEffect} from "react"
import {Box, Paper, Typography, Avatar, CircularProgress, useMediaQuery, Theme, SxProps} from "@mui/material"
// import { theme } from "@/theme/theme.ts"
import { useTheme } from '@mui/material/styles'    // <-- 추가
import ChatInput from "@/components/account/message/ChatInput.tsx"
import MessageHeader from "@/components/account/message/MessageHeader.tsx";

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
    const theme = useTheme()
    const messagesContainerRef = useRef<HTMLDivElement>(null)
    const chatInputRef = useRef<HTMLDivElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const isScrollingToBottomRef = useRef(false)
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const isSmallScreen = useMediaQuery('(max-height: 600px)')

    const [roomData, setRoomData] = useState<ChatRoom | null>(initialRoomData || null)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [hasMoreMessages, setHasMoreMessages] = useState(true)
    const [newMessage, setNewMessage] = useState("")
    const [isAtBottom, setIsAtBottom] = useState(true)
    const [isInitialized, setIsInitialized] = useState(false)
    const [isPWA, setIsPWA] = useState(false)

    // ----------------------------
    // 1️⃣ PWA 감지 및 뷰포트 설정
    // ----------------------------
    useEffect(() => {
        const detectPWA = () => {
            const isStandalone =
                // iOS 홈화면 실행 체크 (타입 안전성 위해 any로 캐스팅)
                (('standalone' in window.navigator && (window.navigator as any).standalone === true)) ||
                // display-mode 체크 (표준)
                window.matchMedia('(display-mode: standalone)').matches ||
                // android intent referrer 체크 (optional)
                (typeof document !== 'undefined' && document.referrer.includes('android-app://'))

            return Boolean(isStandalone)
        }

        setIsPWA(detectPWA())

        const setViewportHeight = () => {
            if (isMobile || detectPWA()) {
                const vh = window.innerHeight * 0.01
                document.documentElement.style.setProperty('--vh', `${vh}px`)
            }
        }

        setViewportHeight()

        const handleResize = setViewportHeight
        const handleOrientationChange = () => setTimeout(setViewportHeight, 100)

        if (isMobile || isPWA) {
            window.addEventListener('resize', handleResize)
            window.addEventListener('orientationchange', handleOrientationChange)
        }

        return () => {
            if (isMobile || isPWA) {
                window.removeEventListener('resize', handleResize)
                window.removeEventListener('orientationchange', handleOrientationChange)
            }
        }
    }, [isMobile, isPWA])

    // ----------------------------
    // 2️⃣ Mock 데이터 초기화
    // ----------------------------
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

    // ----------------------------
    // 3️⃣ 스크롤 유틸리티 함수들
    // ----------------------------
    const scrollToBottom = useCallback((behavior: 'smooth' | 'auto' = 'smooth') => {
        if (!messagesContainerRef.current) return

        isScrollingToBottomRef.current = true
        const container = messagesContainerRef.current

        container.scrollTo({
            top: container.scrollHeight,
            behavior
        })

        setTimeout(() => {
            isScrollingToBottomRef.current = false
        }, behavior === 'smooth' ? 300 : 50)
    }, [])

    const isScrolledToBottom = useCallback(() => {
        if (!messagesContainerRef.current) return true
        const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current
        return scrollHeight - scrollTop - clientHeight < 50
    }, [])

    // ----------------------------
    // 4️⃣ 초기 스크롤 설정
    // ----------------------------
    useLayoutEffect(() => {
        if (!roomData?.messages.length || isInitialized) return

        const container = messagesContainerRef.current
        if (!container) {
            setIsInitialized(true)
            return
        }

        // 초기엔 부드러운 애니메이션이 아니라 즉시 위치로 이동
        container.scrollTo({ top: container.scrollHeight, behavior: "auto" })

        // 동기적으로 처리되므로 paint 전에 위치가 맞춰지는 효과가 있음
        setIsInitialized(true)
    }, [roomData?.messages, isInitialized, scrollToBottom])

    // ----------------------------
    // 5️⃣ 새 메시지 추가 시 스크롤 처리
    // ----------------------------
    useEffect(() => {
        if (!isInitialized || !roomData?.messages.length) return

        if (isAtBottom) {
            setTimeout(() => scrollToBottom('smooth'), 50)
        }
    }, [roomData?.messages.length, isAtBottom, isInitialized, scrollToBottom])

    // ----------------------------
    // 6️⃣ 스크롤 이벤트 핸들러
    // ----------------------------
    const handleScroll = useCallback(() => {
        const container = messagesContainerRef.current
        if (!container || isScrollingToBottomRef.current) return

        const { scrollTop, scrollHeight, clientHeight } = container

        const atBottom = scrollHeight - scrollTop - clientHeight < 50
        setIsAtBottom(atBottom)

        if (scrollTop < 100 && hasMoreMessages && !isLoadingMore && onLoadMoreMessages) {
            loadMoreMessages()
        }
    }, [hasMoreMessages, isLoadingMore, onLoadMoreMessages])

    // ----------------------------
    // 7️⃣ 더 많은 메시지 로드
    // ----------------------------
    const loadMoreMessages = useCallback(async () => {
        if (!roomData?.messages.length || !onLoadMoreMessages) return

        const container = messagesContainerRef.current
        if (!container) return

        const previousScrollHeight = container.scrollHeight
        const previousScrollTop = container.scrollTop

        setIsLoadingMore(true)

        try {
            const cursor = roomData.messages[0].id
            const newMessages = await onLoadMoreMessages(cursor)

            if (newMessages.length > 0) {
                setRoomData(prev => prev ? { ...prev, messages: [...newMessages, ...prev.messages] } : null)

                setTimeout(() => {
                    if (container) {
                        const newScrollHeight = container.scrollHeight
                        const scrollDiff = newScrollHeight - previousScrollHeight
                        container.scrollTop = previousScrollTop + scrollDiff
                    }
                }, 50)
            } else {
                setHasMoreMessages(false)
            }
        } catch (err) {
            console.error('메시지 로드 실패:', err)
        } finally {
            setIsLoadingMore(false)
        }
    }, [roomData?.messages, onLoadMoreMessages])

    // ----------------------------
    // 8️⃣ 메시지 전송 핸들러
    // ----------------------------
    const handleSendMessage = useCallback(() => {
        if (!newMessage.trim()) return

        const message: Message = {
            id: `msg-${Date.now()}`,
            content: newMessage,
            timestamp: new Date().toISOString(),
            isFromMe: true,
            isRead: true
        }

        setRoomData(prev =>
            prev ? { ...prev, messages: [...prev.messages, message] } : null
        )
        setNewMessage("")

        setTimeout(() => scrollToBottom('smooth'), 50)
    }, [newMessage, scrollToBottom])

    const formatTime = (ts: string) =>
        new Date(ts).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false })

    if (!roomData) {
        return (
            <Box sx={{
                height: isMobile || isPWA ? "calc(var(--vh, 1vh) * 100)" : "calc(100vh - 120px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <CircularProgress />
            </Box>
        )
    }

    // ----------------------------
    // 9️⃣ 반응형 스타일 계산
    // ----------------------------
    const getContainerStyles = (): SxProps<Theme> => {
        if (isMobile || isPWA) {
            // 모바일/PWA: 전체 화면 사용
            return {
                height: "calc(var(--vh, 1vh) * 100)",
                maxHeight: "none",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
            }
        } else {
            // PC: 일반적인 채팅창 스타일
            return {
                height: "calc(100vh - 120px)", // 헤더 공간 제외
                maxHeight: "800px",
                display: "flex",
                flexDirection: "column",
                mx: "auto",
                maxWidth: "1200px",
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                overflow: "hidden",
                backgroundColor: "background.paper"
            }
        }
    }

    const getMessagesContainerStyles = () => {
        const baseStyles = {
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            "&::-webkit-scrollbar": { width: isMobile ? "4px" : "6px" },
            "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: theme.palette.divider,
                borderRadius: "3px"
            },
        }

        if (isMobile || isPWA) {
            return {
                ...baseStyles,
                px: 2,
                py: 1,
                WebkitOverflowScrolling: "touch",
            }
        } else {
            return {
                ...baseStyles,
                px: 3,
                py: 2,
            }
        }
    }

    // ----------------------------
    // 🔟 렌더링
    // ----------------------------
    return (
        <Box sx={getContainerStyles()}>
            <MessageHeader userName={roomData.userName} userAvatar={roomData.userAvatar} />
            <Box
                ref={messagesContainerRef}
                onScroll={handleScroll}
                sx={getMessagesContainerStyles()}
            >
                {/* 로딩 인디케이터 */}
                {isLoadingMore && (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                        <CircularProgress size={24} />
                    </Box>
                )}

                {/* 메시지 목록 */}
                {roomData.messages.map((msg, i) => {
                    const showAvatar = !msg.isFromMe &&
                        (i === 0 || roomData.messages[i - 1].isFromMe !== msg.isFromMe)

                    return (
                        <Box
                            key={msg.id}
                            sx={{
                                display: "flex",
                                justifyContent: msg.isFromMe ? "flex-end" : "flex-start",
                                mb: 1.5,
                                minHeight: "fit-content"
                            }}
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
                                    <Avatar sx={{
                                        width: isMobile ? 32 : 36,
                                        height: isMobile ? 32 : 36,
                                        backgroundColor: "primary.main",
                                        flexShrink: 0
                                    }}>
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
                                                    : theme.palette.mode=== "dark"
                                                      ? theme.palette.grey[600]
                                                            : theme.palette.grey[100],
                                            color: msg.isFromMe ? "white" : "text.primary",
                                            borderRadius: 2,
                                            borderBottomLeftRadius: !msg.isFromMe ? 0.5 : 2,
                                            borderBottomRightRadius: msg.isFromMe ? 0.5 : 2,
                                            wordBreak: "break-word",
                                            boxShadow: theme.shadows[1]
                                        }}
                                    >
                                        <Typography
                                            variant={isMobile ? "body2" : "body1"}
                                            sx={{ whiteSpace: "pre-wrap" }}
                                        >
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
                                            fontSize: isMobile ? "0.7rem" : "0.75rem"
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

            {/* 채팅 입력창 */}
            <Box ref={chatInputRef} sx={{ flexShrink: 0 }}>
                <ChatInput
                    value={newMessage}
                    onChange={setNewMessage}
                    onSend={handleSendMessage}
                    sx={{
                        position: (isMobile || isPWA) ? 'fixed' : 'sticky',
                        borderTop: "1px solid",
                        borderColor: "divider",
                        paddingBottom: (isMobile || isPWA)
                            ? `max(8px, env(safe-area-inset-bottom))`
                            : "12px",
                        backgroundColor: "background.paper",
                        ...((!isMobile && !isPWA) && {
                            borderBottomLeftRadius: 8,
                            borderBottomRightRadius: 8,
                        })
                    }}
                />
            </Box>
        </Box>
    )
}

export default Messages