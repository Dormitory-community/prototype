"use client"

import React, {ChangeEvent} from "react"
import { useState } from "react"
import {
    Box,
    Container,
    Typography,
    Avatar,
    List,
    ListItem,
    ListItemText,
    Button,
    useMediaQuery,
    DialogTitle,
    Dialog,
    DialogContent,
    TextField,
    DialogActions,
    Card, ListItemIcon,
    ListItemButton,
} from "@mui/material"
import {Article, Comment, Security, Edit, Bookmark, LocalSee, ChevronRight} from "@mui/icons-material"
import type { User } from "@/types"
import { theme } from "@/theme/theme"
import {ROUTES} from "@/router"
import {useNavigate} from "react-router-dom"

const MyPage: React.FC = () => {
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const [editOpen, setEditOpen] = useState(false)
    const navigate = useNavigate()
    // Mock User Data
    const [currentUser, setCurrentUser] = useState<User>({
        id: "user-123",
        name: "김기숙",
        email: "kim.gisuk@example.com",
        studentId: "2024001234",
        avatar: "/default-profile.webp",
    })

    const [editName, setEditName] = useState(currentUser.name)
    const [editAvatar, setEditAvatar] = useState<File | null>(null)

    const [previewAvatar, setPreviewAvatar] = useState(currentUser.avatar)


    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setEditAvatar(file)
            setPreviewAvatar(URL.createObjectURL(file))
        }
    }

    const handleSave = () => {
        setCurrentUser({
            ...currentUser,
            name: editName,
            avatar: previewAvatar, // 실제 서버 업로드 시 editAvatar 사용
        })
        setEditOpen(false)
    }

    const menuItems = [
        {
            title: "내 게시글",
            description: "작성한 게시글을 확인하세요",
            icon: <Article />,
            path: ROUTES.MY_PAGE_POSTS,
        },
        {
            title: "내 댓글",
            description: "작성한 댓글을 확인하세요",
            icon: <Comment />,
            path: ROUTES.MY_PAGE_COMMENTS,
        },
        {
            title: "스크랩",
            description: "스크랩한 게시글을 확인하세요",
            icon: <Bookmark />,
            path: ROUTES.MY_PAGE_BOOKMARKS,
        },
        {
            title: "개인정보 및 보안",
            description: "계정 정보와 보안 설정을 관리하세요",
            icon: <Security />,
            path: ROUTES.MY_PAGE_PRIVACY,
        },
    ]

    const renderMyProfile = () => (
        <Box sx={{ p: 3, textAlign: "center" }}>
            <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                <Avatar
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    sx={{
                        width: 80,
                        height: 80,
                        mx: "auto",
                        background: "linear-gradient(45deg, #2563eb 30%, #10b981 90%)",
                    }}
                >
                    {!currentUser.avatar && currentUser.name.charAt(0)}
                </Avatar>

            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary" }}>
                {currentUser.name}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 1 }}>
                {currentUser.email}
            </Typography>
            <Button
                variant="outlined"
                startIcon={<Edit />}
                sx={{ borderRadius: 3, mt: 2 }}
                onClick={() => setEditOpen(true)}
            >
                프로필 수정
            </Button>


            {/* 프로필 수정 모달 */}
            {/* 프로필 수정 모달 (반응형 개선) */}
            <Dialog
                open={editOpen}
                onClose={() => setEditOpen(false)}
                fullScreen={isMobile}       // 모바일에서는 전체 화면 모달로 전환
                fullWidth                   // 가로 폭을 꽉 채우도록
                maxWidth="sm"               // md 이상에서는 max width 적용 (sm ~ 600px)
                aria-labelledby="edit-profile-dialog"
                slotProps={{
                paper: {
                    sx: {
                        width: { xs: "94vw", sm: "480px", md: "600px" },
                        borderRadius: { xs: 0, sm: 2 },
                    },
                },
            }}
            >
                <DialogTitle id="edit-profile-dialog">프로필 수정</DialogTitle>

                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        mt: 1,
                        // 컨텐츠가 길어지면 스크롤 가능하도록 최대 높이 설정
                        maxHeight: { xs: "calc(100vh - 88px)", sm: "70vh" },
                        overflowY: "auto",
                        p: { xs: 2, sm: 3 },
                    }}
                >
                    {/* 아바타 미리보기 */}
                    <Box sx={{ textAlign: "center" }}>
                        <Box sx={{ position: "relative", display: "inline-block", mb: 1 }}>
                            <Avatar
                                src={previewAvatar}
                                alt="미리보기"
                                sx={{ width: 80, height: 80, mx: "auto" }}
                            />

                            {/* 중앙 하단에 붙는 반응형 업로드 버튼 */}
                            <Button
                                variant="contained"
                                component="label"
                                sx={{
                                    position: "absolute",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    // bottom 값을 뷰포트에 따라 조절 (모바일에서는 조금 더 내림)
                                    bottom: { xs: -12, sm: -8 },
                                    borderRadius: "50%",
                                    width: { xs: 34, sm: 26 },
                                    height: { xs: 34, sm: 26 },
                                    minWidth: 0,
                                    padding: 0,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: 1,
                                }}
                            >
                                <LocalSee sx={{ fontSize: { xs: 18, sm: 16 } }} />
                                <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
                            </Button>
                        </Box>
                    </Box>

                    {/* 이름 수정 */}
                    <TextField
                        label="이름"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        fullWidth
                    />

                    {/* 이메일은 읽기 전용 */}
                    <TextField
                        label="이메일"
                        value={currentUser.email}
                        fullWidth
                        slotProps={{
                            input: { readOnly: true },
                        }}
                    />
                </DialogContent>

                <DialogActions sx={{ px: { xs: 2, sm: 3 }, py: 1.5 }}>
                    <Button onClick={() => setEditOpen(false)}>취소</Button>
                    <Button onClick={handleSave} variant="contained">
                        저장
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 2, md: 8 } }}>

            <Box sx={{ mb: { xs: 3, md: 6 } }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        color: "text.primary",
                        mb: 1,
                        fontSize: { xs: "1.75rem", md: "2.5rem" },
                    }}
                >
                    마이페이지
                </Typography>
                <Typography variant="h6" sx={{ color: "text.secondary", fontSize: { xs: "1rem", md: "1.25rem" } }}>
                    내 활동을 한눈에 확인하고 정보를 관리하세요.
                </Typography>
                <Box sx={{ position: "sticky", top: 0, zIndex: 10, backgroundColor: "background.default", pb: 3 }}>
                    {renderMyProfile()}
                </Box>
            </Box>

            <Card sx={{ borderRadius: 2 }}>
                <List sx={{ p: 0 }}>
                    {menuItems.map((item, index) => (
                        <React.Fragment key={item.path}>
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => navigate(item.path)}
                                    sx={{
                                        py: 2.5,
                                        px: 3,
                                        "&:hover": {
                                            backgroundColor: "action.hover",
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ color: "primary.main", minWidth: 48 }}>{item.icon}</ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                {item.title}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                                {item.description}
                                            </Typography>
                                        }
                                    />
                                    <ChevronRight sx={{ color: "text.secondary" }} />
                                </ListItemButton>
                            </ListItem>
                            {index < menuItems.length - 1 && (
                                <Box sx={{ px: 3 }}>
                                    <Box sx={{ height: 1, backgroundColor: "divider" }} />
                                </Box>
                            )}
                        </React.Fragment>
                    ))}
                </List>
            </Card>
        </Container>
    )
}

export default MyPage