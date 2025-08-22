"use client"

import React from "react"
import { useNavigation } from "@/hooks/useNavigation"
import { Box, Container, Typography, IconButton, List, ListItem, ListItemText, Divider } from "@mui/material"
import { ArrowBack, Comment } from "@mui/icons-material"
import type { Comment as CommentType, User } from "@/types"

const Comments: React.FC = () => {
    const { goToMyPage } = useNavigation()
    // Mock User Data
    const currentUser: User = {
        id: "user-123",
        name: "김기숙",
        email: "kim.gisuk@example.com",
        studentId: "2024001234",
        avatar: "/default-profile.webp",
    }

    // Mock Comments Data
    const myComments: CommentType[] = [
        {
            id: "comment-1",
            content: "정말 유용한 정보네요! 감사합니다",
            author: currentUser,
            createdAt: new Date("2024-01-15T10:30:00"),
            likes: 3,
            parentId: "1",
        },
        {
            id: "comment-2",
            content: "저도 처음엔 그랬어요. 시간이 지나면 괜찮아질 거예요! 동아리에 가입해보는 건 어떨까요?",
            author: currentUser,
            createdAt: new Date("2024-01-15T10:30:00"),
            likes: 3,
            parentId: "2",
        },
        {
            id: "comment-3",
            content: "솔직한 대화가 가장 중요한 것 같아요. 감정을 숨기면 오히려 더 큰 오해가 생길 수 있어요.",
            author: currentUser,
            createdAt: new Date("2024-01-13T15:00:00"),
            likes: 5,
            parentId: "3",
        },
    ]

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <IconButton onClick={goToMyPage} sx={{ mr: 1 }}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary" }}>
                    내 댓글
                </Typography>
            </Box>

            <List sx={{ width: "100%", bgcolor: "background.paper", borderRadius: 2 }}>
                {myComments.length > 0 ? (
                    myComments.map((comment, index) => (
                        <React.Fragment key={comment.id}>
                            <ListItem alignItems="flex-start" sx={{ py: 2 }}>
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
                                                {new Date(comment.createdAt).toLocaleDateString("ko-KR", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            {index < myComments.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                    ))
                ) : (
                    <Box sx={{ textAlign: "center", py: 8 }}>
                        <Comment sx={{ fontSize: 64, color: "grey.300", mb: 2 }} />
                        <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
                            작성한 댓글이 없습니다
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            다른 게시글에 댓글을 남겨보세요.
                        </Typography>
                    </Box>
                )}
            </List>
        </Container>
    )
}

export default Comments
