"use client"

import React from "react"
import {
    Box,
    Container,
    Typography,
    Paper,
    Avatar,
    Stack,
    Chip,
    Divider,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    useTheme,
    IconButton,
} from "@mui/material"
import {
    FavoriteBorderOutlined,
    ChatBubbleOutlineOutlined,
    AccessTimeOutlined,
    PersonOutlineOutlined,
    ArrowBack,
} from "@mui/icons-material"
import type { Post, User } from "@/types"
import {useNavigate, useParams} from "react-router-dom"

const BoardDetailPage: React.FC = () => {
    const theme = useTheme()
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1) // 이전 페이지로 이동
    }
    // Mock User Data
    const mockUser1: User = {
        id: "user-1",
        name: "김민수",
        email: "minsu.kim@example.com",
        studentId: "202312345",
    }
    const mockUser2: User = {
        id: "user-2",
        name: "박서연",
        email: "seoyeon.park@example.com",
        studentId: "202254321",
    }

    // <CHANGE> Unified mock posts data for all board types
    const mockPosts: Post[] = [
        {
            id: "1",
            title: "새 학기 적응이 어려워요",
            content:
                "기숙사에 처음 들어와서 새로운 환경에 적응하기가 힘들어요. 룸메이트와도 어색하고, 수업도 어렵고, 친구 사귀는 것도 쉽지 않네요. 다들 어떻게 적응하셨나요? 조언 부탁드립니다.",
            author: mockUser1,
            createdAt: new Date("2024-07-20T10:00:00"),
            updatedAt: new Date("2024-07-20T10:00:00"),
            category: "고민상담",
            likes: 12,
            comments: [
                {
                    id: "c1",
                    content: "저도 처음엔 그랬어요. 시간이 지나면 괜찮아질 거예요! 동아리에 가입해보는 건 어떨까요?",
                    author: mockUser2,
                    createdAt: new Date("2024-07-20T10:30:00"),
                    likes: 3,
                    isAnonymous: true,
                },
                {
                    id: "c2",
                    content: "시간이 약입니다. 너무 조급해하지 마세요.",
                    author: mockUser1,
                    createdAt: new Date("2024-07-20T11:00:00"),
                    likes: 1,
                    isAnonymous: false,
                },
            ],
            isAnonymous: true,
            tags: ["새학기", "적응", "룸메이트"],
            views: 80,
        },
        {
            id: "2",
            title: "기숙사 생활 꿀팁 공유해요!",
            content:
                "새로 들어온 학생들을 위해 기숙사 생활 꿀팁을 공유합니다. 가성비 좋은 국가지 다양하게 모아봤어요. 앞으로 유용한 정보들 계속 올릴게요!",
            author: mockUser2,
            createdAt: new Date("2024-07-18T14:00:00"),
            updatedAt: new Date("2024-07-18T14:00:00"),
            category: "정보공유",
            likes: 8,
            comments: [
                {
                    id: "c3",
                    content: "정말 유용한 정보네요! 감사합니다.",
                    author: mockUser1,
                    createdAt: new Date("2024-07-18T14:30:00"),
                    likes: 5,
                },
            ],
            isAnonymous: false,
            tags: ["기숙사", "꿀팁", "정보"],
            views: 60,
        },
        {
            id: "3",
            title: "오늘 점심 뭐 먹지? 추천 받아요",
            content:
                "매일 점심 메뉴 고르기가 너무 어려워요. 학교 주변 맛집이나 기숙사 근처 배달 음식 추천해주세요! 특히 가성비 좋은 곳으로요.",
            author: mockUser1,
            createdAt: new Date("2024-07-19T11:30:00"),
            updatedAt: new Date("2024-07-19T11:30:00"),
            category: "자유게시판",
            likes: 15,
            comments: [],
            isAnonymous: false,
            tags: ["점심", "맛집", "추천"],
            views: 95,
        },
        {
            id: "4",
            title: "토익 스터디 모집합니다",
            content:
                "12월 토익 시험을 목표로 하는 스터디원을 모집합니다. 주 2회 만나서 문제 풀이하고 스피킹 연습도 같이 해요. 목표 점수 800점 이상이신 분들 환영합니다!",
            author: mockUser2,
            createdAt: new Date("2024-07-17T16:00:00"),
            updatedAt: new Date("2024-07-17T16:00:00"),
            category: "모임/스터디",
            likes: 6,
            comments: [
                {
                    id: "c4",
                    content: "참여하고 싶어요! 연락 드릴게요.",
                    author: mockUser1,
                    createdAt: new Date("2024-07-17T16:30:00"),
                    likes: 2,
                },
            ],
            isAnonymous: false,
            tags: ["토익", "스터디", "영어"],
            views: 42,
        },
    ]

    const post = mockPosts.find((p) => p.id === id)

    if (!post) {
        return (
            <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
                <Typography variant="h5" color="error">
                    게시글을 찾을 수 없습니다.
                </Typography>
            </Container>
        )
    }

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    // <CHANGE> Updated category colors to include all board types
    const getCategoryColor = (category: string) => {
        switch (category) {
            case "공지사항":
                return { bgcolor: theme.palette.error.light, color: theme.palette.error.contrastText }
            case "고민상담":
                return { bgcolor: theme.palette.secondary.light, color: theme.palette.secondary.contrastText }
            case "모임/스터디":
                return { bgcolor: theme.palette.info.light, color: theme.palette.info.contrastText }
            case "배달주문":
                return { bgcolor: theme.palette.warning.light, color: theme.palette.warning.contrastText }
            case "자유게시판":
                return { bgcolor: theme.palette.success.light, color: theme.palette.success.contrastText }
            case "정보공유":
                return { bgcolor: theme.palette.primary.light, color: theme.palette.primary.contrastText }
            case "학사정보":
                return { bgcolor: theme.palette.primary.light, color: theme.palette.primary.contrastText }
            case "생활정보":
                return { bgcolor: theme.palette.info.light, color: theme.palette.info.contrastText }
            case "자격증":
                return { bgcolor: theme.palette.success.light, color: theme.palette.success.contrastText }
            case "취업정보":
                return { bgcolor: theme.palette.warning.light, color: theme.palette.warning.contrastText }
            case "학습자료":
                return { bgcolor: theme.palette.error.light, color: theme.palette.error.contrastText }
            case "학교생활":
                return { bgcolor: theme.palette.primary.light, color: theme.palette.primary.contrastText }
            case "인간관계":
                return { bgcolor: theme.palette.secondary.light, color: theme.palette.secondary.contrastText }
            case "진로":
                return { bgcolor: theme.palette.info.light, color: theme.palette.info.contrastText }
            case "가족":
                return { bgcolor: theme.palette.warning.light, color: theme.palette.warning.contrastText }
            case "연애":
                return { bgcolor: theme.palette.error.light, color: theme.palette.error.contrastText }
            case "기타":
                return { bgcolor: theme.palette.grey[300], color: theme.palette.grey[800] }
            default:
                return { bgcolor: theme.palette.grey[300], color: theme.palette.grey[800] }
        }
    }

    const categoryStyle = getCategoryColor(post.category)

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>

            <Paper
                sx={{
                    p: { xs: 3, md: 5 },
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    backgroundColor: "background.paper",
                }}
            >
                <Stack direction="row" alignItems="center" spacing={1} mb={3}>
                    <IconButton onClick={handleGoBack} sx={{ color: "text.primary" }}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        게시글 상세
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>

                    <Chip
                        label={post.category}
                        size="small"
                        sx={{
                            ...categoryStyle,
                            fontWeight: 500,
                            fontSize: 12,
                            height: 28,
                            borderRadius: 2,
                        }}
                    />
                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "text.secondary", fontSize: 14 }}>
                        <AccessTimeOutlined sx={{ fontSize: 16 }} />
                        <Typography variant="body2">{formatDate(post.createdAt)}</Typography>
                    </Stack>
                </Stack>

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        color: "text.primary",
                        mb: 2,
                        fontSize: { xs: "1.75rem", md: "2.25rem" },
                    }}
                >
                    {post.title}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1.5} mb={4}>
                    {post.isAnonymous ? (
                        <Avatar sx={{ bgcolor: theme.palette.grey[300], width: 40, height: 40 }}>
                            <PersonOutlineOutlined sx={{ fontSize: 22, color: theme.palette.grey[600] }} />
                        </Avatar>
                    ) : (
                        <Avatar
                            sx={{
                                background: "linear-gradient(45deg, #2563eb 30%, #10b981 90%)",
                                width: 40,
                                height: 40,
                                fontSize: 16,
                                fontWeight: 600,
                            }}
                        >
                            {post.author.name.charAt(0)}
                        </Avatar>
                    )}
                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "text.primary" }}>
                            {post.isAnonymous ? "익명" : post.author.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            {post.author.studentId}
                        </Typography>
                    </Box>
                </Stack>

                <Divider sx={{ mb: 4 }} />

                <Typography variant="body1" sx={{ color: "text.primary", lineHeight: 1.8, mb: 4 }}>
                    {post.content}
                </Typography>

                {post.tags && post.tags.length > 0 && (
                    <Stack direction="row" flexWrap="wrap" spacing={1} mb={4}>
                        {post.tags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={`#${tag}`}
                                size="small"
                                sx={{
                                    bgcolor: theme.palette.grey[100],
                                    color: theme.palette.grey[700],
                                    fontSize: 12,
                                    fontWeight: 500,
                                    borderRadius: 1.5,
                                }}
                            />
                        ))}
                    </Stack>
                )}

                <Stack direction="row" alignItems="center" spacing={3} sx={{ color: "text.secondary", fontSize: 16, mb: 4 }}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <FavoriteBorderOutlined sx={{ fontSize: 20 }} />
                        <Typography variant="body1">{post.likes}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <ChatBubbleOutlineOutlined sx={{ fontSize: 20 }} />
                        <Typography variant="body1">{post.comments.length}</Typography>
                    </Stack>
                </Stack>

                <Divider sx={{ mb: 4 }} />

                <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary", mb: 3 }}>
                    댓글 ({post.comments.length})
                </Typography>

                <Box sx={{ mb: 4 }}>
                    <TextField
                        label="댓글 작성"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="댓글을 입력하세요..."
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: theme.shape.borderRadius } }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, float: "right", borderRadius: theme.shape.borderRadius }}
                    >
                        댓글 등록
                    </Button>
                </Box>

                <List sx={{ width: "100%" }}>
                    {post.comments.map((comment, index) => (
                        <React.Fragment key={comment.id}>
                            <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                                {comment.isAnonymous ? (
                                    <Avatar sx={{ bgcolor: theme.palette.grey[300], width: 32, height: 32, mr: 2 }}>
                                        <PersonOutlineOutlined sx={{ fontSize: 18, color: theme.palette.grey[600] }} />
                                    </Avatar>
                                ) : (
                                    <Avatar
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            background: "linear-gradient(45deg, #2563eb 30%, #10b981 90%)",
                                            mr: 2,
                                        }}
                                    >
                                        {comment.author.name.charAt(0)}
                                    </Avatar>
                                )}
                                <ListItemText
                                    primary={
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "text.primary" }}>
                                            {comment.isAnonymous ? "익명" : comment.author.name}
                                        </Typography>
                                    }
                                    secondary={
                                        <React.Fragment>
                                            <Typography sx={{ display: "block", color: "text.secondary" }} component="span" variant="body2">
                                                {comment.content}
                                            </Typography>
                                            <Typography
                                                sx={{ display: "block", color: "grey.500", mt: 0.5 }}
                                                component="span"
                                                variant="caption"
                                            >
                                                {formatDate(comment.createdAt)}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            {index < post.comments.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
        </Container>
    )
}

export default BoardDetailPage
