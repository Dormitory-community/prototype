"use client"

import type React from "react"
import { useNavigation } from "@/hooks/useNavigation"
import { Box, Container, Typography, IconButton } from "@mui/material"
import { ArrowBack, Article } from "@mui/icons-material"
import PostCard from "@/components/boardContent/PostCard"
import type { PostList, User } from "@/types"

const Posts: React.FC = () => {
    const {goToMyPage} = useNavigation()

    // Mock User Data
    const currentUser: User = {
        id: "user-123",
        name: "김기숙",
        email: "kim.gisuk@example.com",
        studentId: "2024001234",
        avatar: "/default-profile.webp",
    }

    // Mock Posts Data
    const myPosts: PostList[] = [
        {
            id: "1",
            title: "기숙사 생활 꿀팁 공유해요!",
            content:
                "기숙사에서 1년 넘게 살면서 터득한 생활 꿀팁들을 공유합니다. 세탁실 이용 시간대, 공부하기 좋은 장소, 야식 주문 꿀팁 등등...",
            author: currentUser,
            createdAt: new Date("2024-01-15T10:00:00"),
            updatedAt: new Date("2024-01-15T10:00:00"),
            category: "자유게시판",
            likes: 24,
            commentNumber: 1,
            tags: ["꿀팁", "생활정보", "기숙사"],
        },
        {
            id: "2",
            title: "새 학기 적응이 어려워요",
            content:
                "기숙사에 처음 들어와서 새로운 환경에 적응하기가 힘들어요. 룸메이트와도 어색하고, 수업도 어렵고, 친구 사귀는 것도 쉽지 않네요. 다들 어떻게 적응하셨나요? 조언 부탁드립니다.",
            author: currentUser,
            createdAt: new Date("2024-01-14T14:00:00"),
            updatedAt: new Date("2024-01-14T14:00:00"),
            category: "고민상담",
            likes: 12,
            commentNumber: 1,
            isAnonymous: true,
            tags: ["새학기", "적응", "룸메이트"],
        },
    ]

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <IconButton onClick={goToMyPage} sx={{ mr: 1 }}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary" }}>
                    내 게시글
                </Typography>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
                {myPosts.length > 0 ? (
                    myPosts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onClick={() => console.log("Navigate to post:", post.id)}
                            showCategory={true}
                        />
                    ))
                ) : (
                    <Box sx={{ textAlign: "center", py: 8, gridColumn: "1 / -1" }}>
                        <Article sx={{ fontSize: 64, color: "grey.300", mb: 2 }} />
                        <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
                            작성한 게시글이 없습니다
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            새로운 게시글을 작성해보세요.
                        </Typography>
                    </Box>
                )}
            </Box>
        </Container>
    )
}

export default Posts
