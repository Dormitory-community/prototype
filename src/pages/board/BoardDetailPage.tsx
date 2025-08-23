"use client"

import React, { useState } from "react"
import {
    Container,
    Paper,
    Typography,
} from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import type { Post, User } from "@/types"
import PostHeader from "@/components/boardDetail/PostHeader"
import PostContent from "@/components/boardDetail/PostContent"
import CommentList from "@/components/boardDetail/CommentList"
import CommentForm from "@/components/boardDetail/CommentForm"
import profileImage from "#/default-profile.webp";

const BoardDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    // State for comments
    const [newComment, setNewComment] = useState("")
    const [isAnonymousComment, setIsAnonymousComment] = useState(false)
    const [replyToComment, setReplyToComment] = useState<string | null>(null)

    const handleGoBack = () => {
        navigate(-1)
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
            bookmarkCount: 4,
            images: [profileImage, profileImage, profileImage, profileImage, profileImage, profileImage],
            comments: [
                {
                    id: "c1",
                    content: "저도 처음엔 그랬어요. 시간이 지나면 괜찮아질 거예요! 동아리에 가입해보는 건 어떨까요?",
                    author: mockUser2,
                    createdAt: new Date("2024-07-20T10:30:00"),
                    likes: 3,
                    isAnonymous: true,
                    replies: [
                        {
                            id: "r1",
                            content: "동아리 추천 감사해요! 어떤 동아리가 좋을까요?",
                            author: mockUser1,
                            createdAt: new Date("2024-07-20T11:00:00"),
                            likes: 1,
                            isAnonymous: false,
                        }
                    ]
                },
                {
                    id: "c2",
                    content: "시간이 약입니다. 너무 조급해하지 마세요.",
                    author: mockUser1,
                    createdAt: new Date("2024-07-20T11:00:00"),
                    likes: 1,
                    isAnonymous: false,
                    replies: []
                },
            ],
            commentsCount: 3,
            isAnonymous: true,
            tags: ["새학기", "적응", "룸메이트"],
            views: 80,
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

    const handleCommentSubmit = () => {
        if (replyToComment) {
            // 대댓글 작성
            console.log("New reply:", {
                commentId: replyToComment,
                content: newComment,
                isAnonymous: isAnonymousComment
            })
            setReplyToComment(null)
        } else {
            // 일반 댓글 작성
            console.log("New comment:", { content: newComment, isAnonymous: isAnonymousComment })
        }
        setNewComment("")
        setIsAnonymousComment(false)
    }

    const handleReplyClick = (commentId: string) => {
        setReplyToComment(replyToComment === commentId ? null : commentId)
    }

    return (
        <>
            {/* 메인 컨텐츠 - 스크롤 가능 영역 */}
            <Container
                maxWidth="md"
                sx={{
                    py: { xs: 2, md: 4 },
                    height: "100%",
                    overflow: "auto",
                    // 하단 입력창 공간 확보
                    paddingBottom: "100px",
                }}
            >
                <Paper
                    sx={{
                        p: { xs: 3, md: 5 },
                        borderRadius: 4,
                        border: "1px solid",
                        borderColor: "divider",
                        backgroundColor: "background.paper",
                    }}
                >
                    <PostHeader
                        category={post.category}
                        createdAt={post.createdAt}
                        onGoBack={handleGoBack}
                    />

                    <PostContent
                        post={post}
                        totalLikeCount={post.likes}
                        totalCommentCount={post.commentsCount}
                        totalBookmarkCount={post.bookmarkCount}
                    />

                    <CommentList
                        comments={post.comments}
                        onReplyClick={handleReplyClick}
                        replyToComment={replyToComment}
                    />
                </Paper>
            </Container>

            <CommentForm
                value={newComment}
                onChange={setNewComment}
                isAnonymous={isAnonymousComment}
                onAnonymousChange={setIsAnonymousComment}
                onSubmit={handleCommentSubmit}
                isReplyMode={replyToComment !== null}
                replyToCommentAuthor={replyToComment ? post.comments.find(c => c.id === replyToComment)?.author.name || '익명' : undefined}
                onCancelReply={() => setReplyToComment(null)}
            />
        </>
    )
}

export default BoardDetailPage