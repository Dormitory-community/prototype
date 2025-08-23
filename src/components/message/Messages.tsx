"use client"

import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react"
import { Box, Paper, Typography, Avatar, CircularProgress, useMediaQuery} from "@mui/material"
import { useTheme } from '@mui/material/styles'
import ChatInput from "@/components/message/ChatInput.tsx"
import MessageHeader from "@/components/message/MessageHeader.tsx"
import { useChat } from "@/contexts/chatContext.tsx"

interface Message { id: string; content: string; timestamp: string; isFromMe: boolean; isRead?: boolean }
interface ChatRoom { id: string; userId: string; userName: string; userAvatar?: string; lastMessage: string; lastMessageTime: string; unreadCount: number; messages: Message[] }

interface MessagesProps {
    roomId?: string
    roomData?: ChatRoom
    onLoadMoreMessages?: (roomId: string, cursor: string) => Promise<Message[]>
}

const Messages: React.FC<MessagesProps> = ({ roomId, roomData: initialRoomData, onLoadMoreMessages }) => {
    const theme = useTheme()
    const messagesContainerRef = useRef<HTMLDivElement | null>(null)
    const messagesEndRef = useRef<HTMLDivElement | null>(null)
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const isSmallScreen = useMediaQuery('(max-height: 600px)')
    const { loadMoreMessages, hasMoreMessages } = useChat()

    const [roomData, setRoomData] = useState<ChatRoom | null>(initialRoomData || null)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [newMessage, setNewMessage] = useState("")
    const [isInitialized, setIsInitialized] = useState(false)
    const [isPWA, setIsPWA] = useState(false)

    // body overflow 제어
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        document.body.style.overscrollBehavior = 'none'
        return () => {
            document.body.style.overflow = 'auto'
            document.body.style.overscrollBehavior = 'auto'
        }
    }, [])

    // --vh 세팅 (원래 로직 유지)
    useEffect(() => {
        const detectPWA = () => {
            const isStandalone =
                (('standalone' in window.navigator && (window.navigator as any).standalone === true)) ||
                window.matchMedia('(display-mode: standalone)').matches ||
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
    const scrollToBottom = useCallback((behavior: 'smooth' | 'auto' = 'smooth') => {
        if (!messagesContainerRef.current) return
        const container = messagesContainerRef.current
        container.scrollTo({ top: container.scrollHeight, behavior })
    }, [])

    const isScrolledToBottom = useCallback(() => {
        if (!messagesContainerRef.current) return true
        const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current
        return scrollHeight - scrollTop - clientHeight < 50
    }, [])

    // 초기 스크롤
    useLayoutEffect(() => {
        if (!roomData?.messages.length || isInitialized) return
        const container = messagesContainerRef.current
        if (!container) {
            setIsInitialized(true)
            return
        }
        container.scrollTo({ top: container.scrollHeight, behavior: "auto" })
        setIsInitialized(true)
    }, [roomData?.messages, isInitialized])

    // 이전 메시지 로드 (원본 로직 유지, 필요시 인자 조정)
    const handleScroll = useCallback(() => {
        if (!messagesContainerRef.current || isLoadingMore || !hasMore) return
        const container = messagesContainerRef.current
        const { scrollTop } = container
        if (scrollTop < 50 && !isLoadingMore && hasMore) {
            setIsLoadingMore(true)
            const oldestMessage = roomData?.messages[0]
            const cursor = oldestMessage ? oldestMessage.id : ''
            const loadMessages = onLoadMoreMessages || loadMoreMessages
            loadMessages(roomId || 'room-1', cursor)
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
        const newMsg: Message = { id: `msg-${Date.now()}`, content: newMessage, timestamp: new Date().toISOString(), isFromMe: true, isRead: true }
        setRoomData((prev) => ({ ...prev!, messages: [...prev!.messages, newMsg], lastMessage: newMessage, lastMessageTime: new Date().toISOString() }))
        setNewMessage('')
        setTimeout(() => scrollToBottom('smooth'), 50)
    }, [newMessage, roomId, scrollToBottom])

    // 키보드 변화 감지하여 스크롤 조정
    useEffect(() => {
        // 키보드 올라올 때 visualViewport 처리 (모바일)
        const vv = (window as any).visualViewport
        const onVvResize = () => setTimeout(() => scrollToBottom('auto'), 50)
        if (vv) vv.addEventListener('resize', onVvResize)
        else window.addEventListener('resize', onVvResize)
        return () => {
            if (vv) vv.removeEventListener('resize', onVvResize)
            else window.removeEventListener('resize', onVvResize)
        }
    }, [scrollToBottom])

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp)
        const now = new Date()
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
        if (diffInHours < 24) return date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false })
        if (diffInHours < 168) return date.toLocaleDateString("ko-KR", { weekday: "short" })
        return date.toLocaleDateString("ko-KR", { month: "short", day: "numeric" })
    }

    return (
        <>
            {/* 메인 콘텐츠: CommentForm처럼 고정 입력창을 위한 하단 여백 확보 */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: { xs: 'calc(var(--vh, 1vh) * 100)', md: 'calc(100vh - 64px - 32px)' },
                    backgroundColor: 'background.default',
                    pb: { xs: 10, md: 4 }, // 모바일에서 고정 입력창을 위한 하단 공간 확보
                }}
            >
                <MessageHeader userName={roomData?.userName || ''} userAvatar={roomData?.userAvatar} />

                {/* 메시지 영역 (스크롤) */}
                <Box
                    ref={messagesContainerRef}
                    onScroll={handleScroll}
                    sx={{
                        flex: 1,
                        overflowY: 'auto',
                        px: { xs: 2, md: 3 },
                        py: { xs: 2, md: 3 },
                        display: 'flex',
                        flexDirection: 'column',
                        WebkitOverflowScrolling: 'touch',
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
                            <Box key={msg.id} sx={{ display: 'flex', justifyContent: msg.isFromMe ? 'flex-end' : 'flex-start', mb: 1.5 }}>
                                <Box sx={{ maxWidth: isMobile ? '85%' : '70%', display: 'flex', flexDirection: msg.isFromMe ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: 1 }}>
                                    {!msg.isFromMe && showAvatar && (
                                        <Avatar sx={{ width: isMobile ? 32 : 36, height: isMobile ? 32 : 36, backgroundColor: 'primary.main', flexShrink: 0 }}>
                                            {roomData.userName.charAt(0)}
                                        </Avatar>
                                    )}
                                    <Box sx={{ minWidth: 0 }}>
                                        <Paper elevation={1} sx={{
                                            px: isMobile ? 2 : 2.5,
                                            py: isMobile ? 1.5 : 2,
                                            backgroundColor: msg.isFromMe ? theme.palette.primary.main : (theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[100]),
                                            color: msg.isFromMe ? 'white' : 'text.primary',
                                            borderRadius: 2,
                                            borderBottomLeftRadius: !msg.isFromMe ? 0.5 : 2,
                                            borderBottomRightRadius: msg.isFromMe ? 0.5 : 2,
                                            wordBreak: 'break-word'
                                        }}>
                                            <Typography variant={isMobile ? 'body2' : 'body1'} sx={{ whiteSpace: 'pre-wrap' }}>{msg.content}</Typography>
                                        </Paper>
                                        <Typography variant='caption' sx={{ mt: 0.5, px: 1, color: 'text.secondary', display: 'block', textAlign: msg.isFromMe ? 'right' : 'left', fontSize: isMobile ? '0.7rem' : '0.75rem' }}>
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

            {/* ChatInput: 이제 position: fixed로 화면 하단에 고정 */}
            <ChatInput
                value={newMessage}
                onChange={setNewMessage}
                onSend={handleSendMessage}
            />
        </>
    )
}

export default Messages