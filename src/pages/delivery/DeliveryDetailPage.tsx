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
    LinearProgress,
} from "@mui/material"
import {
    FavoriteBorderOutlined,
    ChatBubbleOutlineOutlined,
    AccessTimeOutlined,
    ShoppingCart,
    LocationOn,
    AttachMoney,
} from "@mui/icons-material"
import type { Post, User } from "@/types"
import { useParams } from "react-router-dom"

const DeliveryDetailPage: React.FC = () => {
    const theme = useTheme()
    const { id } = useParams<{ id: string }>()

    // Mock User Data
    const mockUser1: User = {
        id: "user-1",
        name: "김배달",
        email: "delivery.kim@example.com",
        studentId: "202300001",
    }
    const mockUser2: User = {
        id: "user-2",
        name: "박미자",
        email: "mija.park@example.com",
        studentId: "202200002",
    }

    // Mock Delivery Posts Data
    const mockDeliveryPosts: Post[] = [
        {
            id: "1",
            title: "맘스터치",
            content: "맘스터치 싸이버거 세트 같이 시키실 분! A동 로비에서 만나요.",
            author: mockUser1,
            createdAt: new Date("2024-07-26T17:00:00"),
            updatedAt: new Date("2024-07-26T17:00:00"),
            category: "배달주문",
            likes: 5,
            comments: [{ id: "c1", content: "참여하고 싶어요!", author: mockUser2, createdAt: new Date(), likes: 1 }],
            tags: ["햄버거", "배달", "저녁"],
            views: 45,
            deliveryInfo: {
                targetAmount: 20000,
                currentAmount: 15000,
                deliveryFee: 3000,
                location: "A동 로비",
                deadline: "마감",
                status: "모집중",
                participants: ["김", "이"],
            },
        },
        {
            id: "2",
            title: "피자헛",
            content: "피자헛 라지 피자 같이 드실 분 구해요. B동 1층에서 받을게요.",
            author: mockUser2,
            createdAt: new Date("2024-07-25T18:30:00"),
            updatedAt: new Date("2024-07-25T18:30:00"),
            category: "배달주문",
            likes: 3,
            comments: [],
            tags: ["피자", "배달", "저녁"],
            views: 30,
            deliveryInfo: {
                targetAmount: 30000,
                currentAmount: 28000,
                deliveryFee: 2000,
                location: "B동 1층",
                deadline: "마감",
                status: "모집중",
                participants: ["박", "최", "정"],
            },
        },
    ]

    const post = mockDeliveryPosts.find((p) => p.id === id)

    if (!post) {
        return (
            <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
                <Typography variant="h5" color="error">
                    배달 주문을 찾을 수 없습니다.
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

    const progress = post.deliveryInfo ? (post.deliveryInfo.currentAmount / post.deliveryInfo.targetAmount) * 100 : 0

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
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar sx={{ bgcolor: theme.palette.warning.main, width: 48, height: 48 }}>
                            <ShoppingCart />
                        </Avatar>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary" }}>
                                {post.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                주최자: {post.author.name}
                            </Typography>
                        </Box>
                    </Stack>
                    <Chip
                        label={post.deliveryInfo?.status || "모집중"}
                        sx={{
                            bgcolor: theme.palette.success.light,
                            color: theme.palette.success.contrastText,
                            fontWeight: 600,
                        }}
                    />
                </Stack>

                {post.deliveryInfo && (
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            목표 금액까지
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                            {post.deliveryInfo.currentAmount.toLocaleString()}원 / {post.deliveryInfo.targetAmount.toLocaleString()}원
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                height: 8,
                                borderRadius: 4,
                                mb: 3,
                                "& .MuiLinearProgress-bar": {
                                    bgcolor: theme.palette.warning.main,
                                },
                            }}
                        />

                        <Stack spacing={2}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <AccessTimeOutlined sx={{ fontSize: 20, color: "text.secondary" }} />
                                <Typography variant="body2">{post.deliveryInfo.deadline}</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <LocationOn sx={{ fontSize: 20, color: "text.secondary" }} />
                                <Typography variant="body2">{post.deliveryInfo.location}</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <AttachMoney sx={{ fontSize: 20, color: "text.secondary" }} />
                                <Typography variant="body2">배달비: {post.deliveryInfo.deliveryFee.toLocaleString()}원</Typography>
                            </Stack>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={1} mt={2}>
                            {post.deliveryInfo.participants.map((participant, index) => (
                                <Avatar
                                    key={index}
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        bgcolor: theme.palette.warning.main,
                                        fontSize: 14,
                                        fontWeight: 600,
                                    }}
                                >
                                    {participant}
                                </Avatar>
                            ))}
                            <Typography variant="body2" sx={{ color: "text.secondary", ml: 1 }}>
                                {post.deliveryInfo.participants.length}명 참여
                            </Typography>
                        </Stack>
                    </Box>
                )}

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

                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        bgcolor: theme.palette.warning.main,
                        color: "white",
                        py: 1.5,
                        fontSize: 16,
                        fontWeight: 600,
                        borderRadius: 2,
                        mb: 4,
                        "&:hover": {
                            bgcolor: theme.palette.warning.dark,
                        },
                    }}
                >
                    참여하기
                </Button>

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
                                <ListItemText
                                    primary={
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "text.primary" }}>
                                            {comment.author.name}
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

export default DeliveryDetailPage
