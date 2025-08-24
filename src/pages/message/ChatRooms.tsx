"use client"

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Box,
    Container,
    Typography,
    Card,
    List,
    ListItemText,
    IconButton,
    Avatar,
    Divider,
    Badge,
    Chip,
    ListItemButton,
    Menu,
    MenuItem,
    Button,
} from "@mui/material"
import {  MoreVert } from "@mui/icons-material"
import ChatRoomsHeader from "@/components/message/ChatRoomsHeader.tsx";

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

const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
        return date.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        })
    } else if (diffInHours < 168) {
        return date.toLocaleDateString("ko-KR", { weekday: "short" })
    }
    return date.toLocaleDateString("ko-KR", { month: "short", day: "numeric" })
}

const ChatRooms: React.FC = () => {
    const navigate = useNavigate()

    // 탭 상태: "groups" | "messages"
    const [tab, setTab] = useState<"groups" | "messages">("messages")

    // MoreVert 메뉴 상태
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null)

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, room: ChatRoom) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
        setSelectedRoom(room)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        setSelectedRoom(null)
    }

    // Mock chat rooms data (쪽지함에 해당)
    const [chatRooms] = useState<ChatRoom[]>([
        {
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
                    content: "과제 관련해서 질문이 있어서 연락드립니다.",
                    timestamp: "2024-01-15 14:30",
                    isFromMe: false,
                    isRead: false,
                }
            ]
        },
        {
            id: "room-2",
            userId: "user-2",
            userName: "박지영",
            userAvatar: "",
            lastMessage: "네, 알겠습니다. 감사합니다!",
            lastMessageTime: "2024-01-14 16:45",
            unreadCount: 0,
            messages: [
                {
                    id: "msg-3",
                    content: "다음 주부터 시작할 스터디 멤버를 모집합니다.",
                    timestamp: "2024-01-14 09:15",
                    isFromMe: false,
                },
                {
                    id: "msg-4",
                    content: "관심 있습니다! 참여하고 싶어요.",
                    timestamp: "2024-01-14 16:20",
                    isFromMe: true,
                },
                {
                    id: "msg-5",
                    content: "네, 알겠습니다. 감사합니다!",
                    timestamp: "2024-01-14 16:45",
                    isFromMe: false,
                }
            ]
        },
        {
            id: "room-3",
            userId: "user-3",
            userName: "김철수",
            userAvatar: "",
            lastMessage: "동아리 활동 일정을 확인해주세요.",
            lastMessageTime: "2024-01-13 16:45",
            unreadCount: 1,
            messages: [
                {
                    id: "msg-6",
                    content: "이번 달 동아리 활동 일정을 안내드립니다.",
                    timestamp: "2024-01-13 16:40",
                    isFromMe: false,
                },
                {
                    id: "msg-7",
                    content: "동아리 활동 일정을 확인해주세요.",
                    timestamp: "2024-01-13 16:45",
                    isFromMe: false,
                    isRead: false,
                }
            ]
        },
        {
            id: "room-4",
            userId: "user-1",
            userName: "이민수",
            userAvatar: "",
            lastMessage: "과제 관련해서 질문이 있어서 연락드립니다.",
            lastMessageTime: "2024-01-15 14:30",
            unreadCount: 2,
            messages: [],
        },
        {
            id: "room-5",
            userId: "user-1",
            userName: "이민수",
            userAvatar: "",
            lastMessage: "과제 관련해서 질문이 있어서 연락드립니다.",
            lastMessageTime: "2024-01-15 14:30",
            unreadCount: 2,
            messages: [],
        },
        {
            id: "room-6",
            userId: "user-1",
            userName: "이민수",
            userAvatar: "",
            lastMessage: "과제 관련해서 질문이 있어서 연락드립니다.",
            lastMessageTime: "2024-01-15 14:30",
            unreadCount: 0,
            messages: [],
        },
        {
            id: "room-7",
            userId: "user-1",
            userName: "이민수",
            userAvatar: "",
            lastMessage: "과제 관련해서 질문이 있어서 연락드립니다.",
            lastMessageTime: "2024-01-15 14:30",
            unreadCount: 0,
            messages: [],
        },

        {
            id: "room-8",
            userId: "user-1",
            userName: "이민수",
            userAvatar: "",
            lastMessage: "과제 관련해서 질문이 있어서 연락드립니다.",
            lastMessageTime: "2024-01-15 14:30",
            unreadCount: 0,
            messages: [],
        },

        {
            id: "room-9",
            userId: "user-1",
            userName: "이민수",
            userAvatar: "",
            lastMessage: "과제 관련해서 질문이 있어서 연락드립니다.",
            lastMessageTime: "2024-01-15 14:30",
            unreadCount: 0,
            messages: [],
        },
    ])

    const handleChatRoomClick = (room: ChatRoom) => {
        navigate(`/my-page/chat/${room.id}`, {
            state: {
                room,
                userName: room.userName
            }
        })
    }

    return (
        <>
            <ChatRoomsHeader/>
            <Box sx={{ height: `calc(56px + env(safe-area-inset-top, 0px))` }} />
            <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
            {/* 탭 */}
            {/*<Card sx={{ borderRadius: 2, mb: 2 }}>*/}
            {/*    <Tabs*/}
            {/*        value={tab}*/}
            {/*        onChange={(_, newVal) => setTab(newVal)}*/}
            {/*        variant="fullWidth"*/}
            {/*        aria-label="채팅 탭"*/}
            {/*    >*/}
            {/*        <Tab label="그룹 채팅" value="groups" disabled />*/}
            {/*        <Tab label="쪽지함" value="messages" />*/}
            {/*    </Tabs>*/}
            {/*</Card>*/}

            {/* 탭 콘텐츠: messages만 구현 */}
            {tab === "messages" && (
                <Card sx={{ borderRadius: 2 }}>
                    <List sx={{ p: 0 }}>
                        {chatRooms.map((room, index) => {
                            const formattedTime = formatTime(room.lastMessageTime)

                            return (
                                <React.Fragment key={room.id}>
                                    <ListItemButton
                                        onClick={() => handleChatRoomClick(room)}
                                        sx={{
                                            py: 2,
                                            px: 3,
                                            backgroundColor: room.unreadCount > 0 ? "action.hover" : "transparent",
                                            "&:hover": { backgroundColor: "action.selected" },
                                        }}
                                    >
                                        <Box sx={{ position: "relative", mr: 2 }}>
                                            <Badge
                                                color="success"
                                                overlap="circular"
                                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                                sx={{
                                                    "& .MuiBadge-dot": {
                                                        width: 12,
                                                        height: 12,
                                                        borderRadius: "50%",
                                                        border: "2px solid white",
                                                    }
                                                }}
                                            >
                                                <Avatar
                                                    src={room.userAvatar}
                                                    sx={{
                                                        width: 48,
                                                        height: 48,
                                                        backgroundColor: "primary.main",
                                                    }}
                                                >
                                                    {room.userName.charAt(0)}
                                                </Avatar>
                                            </Badge>
                                        </Box>

                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{
                                                            fontWeight: room.unreadCount > 0 ? 600 : 400,
                                                            color: "text.primary",
                                                        }}
                                                    >
                                                        {room.userName}
                                                    </Typography>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        <Typography
                                                            variant="caption"
                                                            sx={{ color: "text.secondary", fontSize: "0.75rem" }}
                                                        >
                                                            {formattedTime}
                                                        </Typography>
                                                        {room.unreadCount > 0 && (
                                                            <Chip
                                                                label={room.unreadCount}
                                                                size="small"
                                                                sx={{
                                                                    backgroundColor: "error.main",
                                                                    color: "white",
                                                                    fontSize: "0.7rem",
                                                                    height: 20,
                                                                    minWidth: 20,
                                                                    "& .MuiChip-label": { px: 0.5 },
                                                                }}
                                                            />
                                                        )}
                                                    </Box>
                                                </Box>
                                            }
                                            secondary={
                                                <Typography
                                                    variant="body2"
                                                    noWrap
                                                    sx={{
                                                        flex: 1,
                                                        color: room.unreadCount > 0 ? "text.primary" : "text.secondary",
                                                        fontWeight: room.unreadCount > 0 ? 500 : 400,
                                                    }}
                                                >
                                                    {room.lastMessage}
                                                </Typography>
                                            }
                                        />

                                        <IconButton
                                            size="small"
                                            sx={{ color: "text.secondary", ml: 1 }}
                                            onClick={(e) => handleMenuOpen(e, room)}
                                        >
                                            <MoreVert />
                                        </IconButton>
                                    </ListItemButton>
                                    {index < chatRooms.length - 1 && <Divider />}
                                </React.Fragment>
                            )
                        })}
                    </List>

                    {chatRooms.length === 0 && (
                        <Box sx={{ textAlign: "center", py: 6 }}>
                            <Typography variant="h6" sx={{ color: "text.secondary", mb: 2 }}>
                                아직 대화가 없습니다
                            </Typography>
                        </Box>
                    )}
                </Card>
            )}

            {/* 그룹 탭 선택 시(현재 disabled 이므로 사용자가 못 누름) */}
            {tab === "groups" && (
                <Card sx={{ borderRadius: 2, p: 4, textAlign: "center" }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        그룹 채팅 기능 준비중
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                        그룹 채팅은 추후에 추가될 예정입니다. 필요하면 지금 바로 구현해 드릴게요.
                    </Typography>
                    <Button onClick={() => setTab("messages")}>쪽지함으로 돌아가기</Button>
                </Card>
            )}

            {/* MoreVert 메뉴 */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>삭제</MenuItem>
                <MenuItem onClick={handleMenuClose}>알림 끄기</MenuItem>
            </Menu>
        </Container>
        </>
    )

}

export default ChatRooms
