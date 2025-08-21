"use client"

import { TrendingUp } from "lucide-react"
import {
    Box,
    Card, CardContent,
    CardHeader,
    Typography,
} from "@mui/material"
import {theme} from "@/theme/theme.ts";
import PostCard from "@/components/boardContent/PostCard.tsx";
import { PostList, User } from "@/types";
import profileImage from "#/default-profile.webp";
import {useNavigation} from "@/hooks/useNavigation.ts";

export function TrendingPosts() {
    const {goToBoardDetail} = useNavigation()

    const mockUser1: User = {
        id: "user-1",
        name: "김철수",
        email: "chulsoo.kim@example.com",
        studentId: "202312345",
    }
    const mockUser2: User = {
        id: "user-2",
        name: "이영희",
        email: "younghee.lee@example.com",
        studentId: "202254321",
    }

// Mock Posts Data with sample images
    const mockPosts: PostList[] = [
        {
            id: "1",
            title: "기숙사 생활 꿀팁 공유해요!",
            content:
                "기숙사에서 1년 넘게 살면서 터득한 생활 꿀팁들을 공유합니다. 세탁실 이용 시간대, 공부하기 좋은 장소, 야식 주문 꿀팁 등등...",
            author: mockUser1,
            createdAt: new Date("2024-07-20T10:00:00"),
            updatedAt: new Date("2024-07-20T10:00:00"),
            category: "일상",
            likes: 24,
            tags: ["꿀팁", "생활정보", "기숙사"],
            views: 150,
            images: profileImage,
            commentNumber: 3,
        },
        {
            id: "2",
            title: "오늘 점심 뭐 먹지? 추천 받아요!",
            content: "학교 근처에서 점심 먹을 곳 추천해주세요! 한식, 양식, 일식 다 좋아요. 혼밥하기 좋은 곳도 환영입니다!",
            author: mockUser2,
            createdAt: new Date("2024-07-19T12:00:00"),
            updatedAt: new Date("2024-07-19T12:00:00"),
            category: "일상",
            likes: 18,

            tags: ["점심", "맛집", "추천"],
            views: 100,
            images: profileImage,
            commentNumber: 4,
        },
    ]


    return (
        <Card>
            <CardHeader
                title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TrendingUp style={{ width: 20, height: 20, color: theme.palette.primary.main }} />
                        <Typography variant="h6" component="span">실시간 인기 글</Typography>
                    </Box>
                }
                sx={{ pb: 2 }}
            />

            <CardContent>
                {mockPosts.map(post =>
                    <PostCard
                        key={post.id}
                        post={post}
                        onClick={() => goToBoardDetail(post.id)}
                        showCategory={true}/>
                )}
            </CardContent>
        </Card>
    )
}