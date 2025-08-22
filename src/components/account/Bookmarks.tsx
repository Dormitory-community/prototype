"use client"

import type React from "react"
import { Box, Container, Typography, IconButton } from "@mui/material"
import { ArrowBack, Bookmark } from "@mui/icons-material"
import PostCard from "@/components/boardContent/PostCard"
import type { PostList, User } from "@/types"
import { useNavigation } from "@/hooks/useNavigation.ts"


const Bookmarks: React.FC = () => {
    const { goToBoardDetail, goToMyPage } = useNavigation()

    const currentUser: User = {
        id: "user-123",
        name: "김기숙",
        email: "kim.gisuk@example.com",
        studentId: "2024001234",
        avatar: "/default-profile.webp",
    }

    const bookmarkedPosts: PostList[] = [
        {
            id: "1",
            title: "기숙사 생활 꿀팁 공유해요!",
            content: "기숙사에서 1년 넘게 살면서 터득한 생활 꿀팁들을 공유합니다...",
            author: currentUser,
            createdAt: new Date("2024-01-15T10:00:00"),
            updatedAt: new Date("2024-01-15T10:00:00"),
            category: "자유게시판",
            likes: 24,
            commentNumber: 1,
            tags: ["꿀팁", "생활정보", "기숙사"],
        },
    ]

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <IconButton onClick={goToMyPage} sx={{ mr: 1 }}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary" }}>
                    스크랩
                </Typography>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
                {bookmarkedPosts.length > 0 ? (
                    bookmarkedPosts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onClick={() => goToBoardDetail(post.id)}
                            showCategory
                            dense
                        />
                    ))
                ) : (
                    <Box sx={{ textAlign: "center", py: 8, gridColumn: "1 / -1" }}>
                        <Bookmark sx={{ fontSize: 64, color: "grey.300", mb: 2 }} />
                        <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
                            스크랩한 게시글이 없습니다
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            게시글을 스크랩해보세요.
                        </Typography>
                    </Box>
                )}
            </Box>
        </Container>
    )
}

export default Bookmarks
