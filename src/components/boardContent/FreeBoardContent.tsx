"use client"

import type React from "react"
import { useState } from "react"
import {
    Box,
    Typography,
    InputAdornment,
    Button,
    Chip,
    Stack,
    Pagination,
    useTheme,
    useMediaQuery,
    FormControl, OutlinedInput,
} from "@mui/material"
import {Search, Add, Edit} from "@mui/icons-material"
import PostCard from "./PostCard.tsx"
import type { PostList, User} from "@/types"
import { useNavigation } from "@/hooks/useNavigation.ts"
import profileImage from "#/default-profile.webp"

const FreeBoardContent: React.FC = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("전체")
    const [currentPage, setCurrentPage] = useState(1)
    const { goToBoardWrite, goToBoardDetail } = useNavigation()

    // Mock User Data
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
        {
            id: "3",
            title: "시험 기간 스트레스 해소법 공유",
            content:
                "다들 시험 기간에 스트레스 어떻게 푸시나요? 저는 운동하거나 맛있는 거 먹으면서 푸는데, 여러분만의 특별한 방법이 있다면 공유해주세요!",
            author: mockUser1,
            createdAt: new Date("2024-07-17T15:00:00"),
            updatedAt: new Date("2024-07-17T15:00:00"),
            category: "일상",
            likes: 30,
            tags: ["시험", "스트레스", "꿀팁"],
            views: 200,
            commentNumber: 2
        },
        {
            id: "4",
            title: "주말에 뭐 할지 추천해주세요!",
            content:
                "이번 주말에 딱히 할 일이 없는데, 학교 근처나 서울에서 가볼 만한 곳 추천해주실 분 있나요? 혼자서도 즐길 수 있는 곳이면 더 좋아요!",
            author: mockUser2,
            createdAt: new Date("2024-07-15T11:00:00"),
            updatedAt: new Date("2024-07-15T11:00:00"),
            category: "일상",
            likes: 10,
            tags: ["주말", "나들이", "추천"],
            views: 80,
            commentNumber: 2

        },
        {
            id: "5",
            title: "새로운 동아리 추천 받아요!",
            content:
                "새 학기에 새로운 동아리에 가입하고 싶은데, 어떤 동아리가 좋을지 고민이에요. 활동이 활발하고 분위기 좋은 동아리 추천해주시면 감사하겠습니다!",
            author: mockUser1,
            createdAt: new Date("2024-07-12T09:30:00"),
            updatedAt: new Date("2024-07-12T09:30:00"),
            category: "질문",
            likes: 22,
            tags: ["동아리", "추천", "학교생활"],
            views: 130,
            commentNumber: 2

        },
    ]

    const categories = ["전체", "일상", "질문", "정보", "기타"]

    const filteredPosts = mockPosts.filter((post) => {
        const matchesCategory = selectedCategory === "전체" || post.category === selectedCategory
        const matchesSearch =
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const postsPerPage = 20
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
    const paginatedPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
        setCurrentPage(1)
    }

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category)
        setCurrentPage(1)
    }

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }

    return (
        <Box sx={{ px: { xs: 2, md: 4 } }}>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                mb={4}
                alignItems={{ xs: "stretch", sm: "center" }}
                justifyContent="space-between"
            >
                <FormControl sx={{ flexGrow: 1, maxWidth: { sm: "400px" } }}>
                    <OutlinedInput
                        placeholder="게시글 검색..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        // 이 줄을 추가하여 multiline 속성을 명시적으로 false로 설정합니다.
                        multiline={false}
                        sx={{
                            borderRadius: theme.shape.borderRadius,
                            backgroundColor: theme.palette.background.paper,
                        }}
                        startAdornment={
                            <InputAdornment position="start">
                                <Search sx={{ color: "action.active" }} />
                            </InputAdornment>
                        }
                    />
                </FormControl>

                {/* Desktop Write Button - Hidden on mobile */}
                {!isMobile && (
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={() => goToBoardWrite("free")}
                        sx={{
                            height: "56px",
                            borderRadius: theme.shape.borderRadius,
                            px: 3,
                        }}
                    >
                        새 게시글 작성
                    </Button>
                )}
            </Stack>

            <Stack
                direction="row"
                spacing={1}
                mb={4}
                sx={{ overflowX: "auto", pb: 1, "&::-webkit-scrollbar": { display: "none" } }}
            >
                {categories.map((category) => (
                    <Chip
                        key={category}
                        label={category}
                        onClick={() => handleCategoryClick(category)}
                        color={selectedCategory === category ? "primary" : "default"}
                        variant={selectedCategory === category ? "filled" : "outlined"}
                        sx={{
                            minWidth: "fit-content",
                            px: 1,
                            py: 0.5,
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            borderRadius: 2,
                            borderColor: selectedCategory === category ? "transparent" : theme.palette.divider,
                            backgroundColor:
                                selectedCategory === category ? theme.palette.primary.main : theme.palette.background.paper,
                            color: selectedCategory === category ? theme.palette.primary.contrastText : theme.palette.text.secondary,
                            "&:hover": {
                                backgroundColor:
                                    selectedCategory === category ? theme.palette.primary.dark : theme.palette.action.hover,
                            },
                        }}
                    />
                ))}
            </Stack>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, mb: 6 }}>
                {paginatedPosts.length > 0 ? (
                    paginatedPosts.map((post) => (
                        <PostCard key={post.id}
                                  post={post}
                                  onClick={() => goToBoardDetail(post.id)}
                                  showCategory={true}
                                  dense={true}
                        />
                    ))
                ) : (
                    <Box sx={{ textAlign: "center", py: 8, gridColumn: "1 / -1" }}>
                        <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
                            게시글이 없습니다
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            선택한 카테고리나 검색어에 해당하는 게시글이 없습니다.
                        </Typography>
                    </Box>
                )}
            </Box>

            {totalPages > 1 && (
                <Stack spacing={2} alignItems="center">
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        size={isMobile ? "small" : "medium"}
                        sx={{
                            "& .MuiPaginationItem-root": {
                                borderRadius: 2,
                                "&.Mui-selected": {
                                    background: "linear-gradient(45deg, #2563eb 30%, #10b981 90%)",
                                    color: "white",
                                },
                            },
                        }}
                    />
                </Stack>
            )}
            {
                isMobile && (
                    <Box
                        sx={{
                            position: "fixed",
                            bottom: 72,
                            left: 0,
                            right: 0,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            onClick={() => goToBoardWrite("counseling")}
                            sx={{
                                width: 75,   // 크기 줄임 (기본 FAB 사이즈 정도)
                                height: 44,
                                borderRadius: "22px",
                                bgcolor: "primary.main",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "0.75rem",
                                gap: 1,
                            }}
                        >
                            <Edit sx={{fontSize: 16}}/>  글쓰기
                        </Button>
                    </Box>

                )
            }

        </Box>
    )
}

export default FreeBoardContent
