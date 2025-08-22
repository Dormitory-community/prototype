"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {BottomNavigation, BottomNavigationAction, Box, Paper} from "@mui/material"
import { Groups, Dashboard, Person, Home } from "@mui/icons-material"
import { useNavigate, useLocation } from "react-router-dom"
import { ROUTES } from "@/router"
import { MessageCircle } from "lucide-react"
import ChatInput from "@/components/account/message/ChatInput"
import { useChat } from "@/contexts/chatContext" // 확장자(.tsx) 제거

export const MobileNavBar: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { sendMessage } = useChat()

    const hiddenRoutes = [
        ROUTES.LOGIN,
        ROUTES.SIGNUP,
        ROUTES.BOARD_DETAIL,
        // ROUTES.MESSAGE_DETAIL은 여기서 제거 (별도 처리)
    ]

    const getActiveTab = (pathname: string): number => {
        if (pathname === ROUTES.LANDING || pathname === "/") return 0
        if (pathname === ROUTES.GROUPS || pathname.startsWith("/groups")) return 1
        if (pathname === ROUTES.BOARDS || pathname.startsWith("/boards")) return 2
        if (pathname === ROUTES.MY_PAGE_MESSAGES || pathname.startsWith("/my-page/messages")) return 3
        if (pathname === ROUTES.MY_PAGE || pathname.startsWith("/my-page")) return 4
        return 0
    }

    const [value, setValue] = useState(() => getActiveTab(location.pathname))

    useEffect(() => {
        setValue(getActiveTab(location.pathname))
    }, [location.pathname])

    // 헬퍼: 동적 파라미터 제거
    const normalize = (route: string) => route.replace(/:.*$/, "")

    // 현재 라우트가 메시지 상세인지 판단
    const isMessageDetail = location.pathname.startsWith(normalize(ROUTES.MESSAGE_DETAIL))

    // roomId: 우선 location.state, 없으면 URL 끝부분으로
    const roomIdFromState = location.state?.room?.id as string | undefined
    const roomIdFromPath = location.pathname.split("/").pop()
    const roomId = roomIdFromState ?? roomIdFromPath

    // ChatInput에서 사용할 state는 컴포넌트 최상단에서 선언(결코 조건문 내부 X)
    const [newMessage, setNewMessage] = useState<string>("")

    const handleSendMessage = async () => {
        if (!roomId) {
            console.warn("roomId is missing — cannot send message")
            return
        }
        if (!newMessage.trim()) return

        try {
            // sendMessage는 ChatContext의 함수 (옵티미스틱 업데이트 또는 API 콜 수행)
            await sendMessage(roomId, newMessage.trim())
            setNewMessage("")
        } catch (err) {
            console.error("sendMessage failed", err)
            // 필요하면 토스트/알림으로 실패 알림
        }
    }

    // 일반적인 숨김 체크 (Message detail은 위에서 별도 처리)
    const shouldHideNavBar = hiddenRoutes.some(route =>
        location.pathname.startsWith(normalize(route))
    )

    // --- 채팅 상세 화면이면 ChatInput만 렌더 ---
    if (isMessageDetail) {
        return (
            <Box
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1200,
                    borderTop: "1px solid #ddd",
                    padding: 1,
                }}
            >
                <ChatInput
                    value={newMessage}
                    onChange={setNewMessage}
                    onSend={handleSendMessage}
                    disabled={!Boolean(roomId)}
                />
            </Box>
        )
    }


    // 숨김 라우트이면 아무것도 렌더하지 않음
    if (shouldHideNavBar) return null

    // 기본: 바텀 네비게이션 렌더
    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
        switch (newValue) {
            case 0: navigate(ROUTES.LANDING); break
            case 1: navigate(ROUTES.GROUPS); break
            case 2: navigate(ROUTES.BOARDS); break
            case 3: navigate(ROUTES.MY_PAGE_MESSAGES); break
            case 4: navigate(ROUTES.MY_PAGE); break
        }
    }

    return (
        <Paper
            sx={{
                position: "fixed",
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1100,
            }}
            elevation={3}
        >
            <BottomNavigation
                value={value}
                onChange={handleChange}
                showLabels
                sx={{
                    height: `calc(56px + var(--safe-bottom, env(safe-area-inset-bottom, constant(safe-area-inset-bottom, 0px))))`,
                    paddingBottom: `var(--safe-bottom, env(safe-area-inset-bottom, constant(safe-area-inset-bottom, 0px)))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <BottomNavigationAction label="홈" icon={<Home />} />
                <BottomNavigationAction label="그룹 모집" icon={<Groups />} />
                <BottomNavigationAction label="게시판" icon={<Dashboard />} />
                <BottomNavigationAction label="채팅" icon={<MessageCircle fill="currentColor" strokeWidth={0} />} />
                <BottomNavigationAction label="마이페이지" icon={<Person />} />
            </BottomNavigation>
        </Paper>
    )
}
