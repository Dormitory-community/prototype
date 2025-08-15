"use client"

import type React from "react"
import { useState } from "react"
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    Button,
    Chip,
    Stack,
    Pagination,
    useTheme,
    useMediaQuery,
} from "@mui/material"
import { Search, Add } from "@mui/icons-material"
import PostCard from "./PostCard.tsx"
import type { PostList, User} from "@/types"
import {useNavigation} from "@/hooks/useNavigation.ts";

const InfoSharingContent: React.FC = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("전체")
    const [currentPage, setCurrentPage] = useState(1)
    const { goToBoardWrite, goToBoardDetail } = useNavigation()


    // Mock User Data
    const mockUser: User = {
        id: "user-1",
        name: "김철수",
        email: "chulsoo.kim@example.com",
        studentId: "202312345",
    }

    // Mock Posts Data
    const mockPosts: PostList[] = [
        {
            id: "1",
            title: "학교 주변 맛집 리스트 (업데이트)",
            content:
                "새롭게 발견한 학교 주변 맛집들을 공유합니다! 가성비 좋은 곳부터 분위기 좋은 곳까지 다양하게 모아봤어요.",
            author: mockUser,
            createdAt: new Date("2024-07-20T10:00:00"),
            updatedAt: new Date("2024-07-20T10:00:00"),
            category: "생활정보",
            likes: 35,
            commentNumber: 30,
            tags: ["맛집", "학교생활", "생활정보"],
            views: 120,
        },
    ]

    const categories = ["전체", "생활정보", "자격증", "취업정보", "학교생활", "기타"]

    const filteredPosts = mockPosts.filter((post) => {
        const matchesCategory = selectedCategory === "전체" || post.category === selectedCategory
        const matchesSearch =
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const postsPerPage = 6
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
                <TextField
                    variant="outlined"
                    placeholder="게시글 검색..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{
                        flexGrow: 1,
                        maxWidth: { sm: "400px" },
                        "& .MuiOutlinedInput-root": {
                            borderRadius: theme.shape.borderRadius,
                            backgroundColor: theme.palette.background.paper,
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search sx={{ color: "action.active" }} />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => goToBoardWrite("info")}
                    sx={{
                        height: "56px",
                        borderRadius: theme.shape.borderRadius,
                        px: 3,
                    }}
                >
                    새 게시글 작성
                </Button>
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
                        }}
                    />
                ))}
            </Stack>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, mb: 6 }}>
                {paginatedPosts.length > 0 ? (
                    paginatedPosts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onClick={() => goToBoardDetail(post.id)}
                            showCategory={true}
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
                    />
                </Stack>
            )}
        </Box>
    )
}

export default InfoSharingContent
