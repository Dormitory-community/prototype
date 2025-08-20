"use client"

import type React from "react"
import { useState } from "react"
import {
    Box,
    Container,
    Typography,
    TextField,
    InputAdornment,
    Chip,
    Stack,
    Pagination,
    useTheme,
    useMediaQuery,
} from "@mui/material"
import { Search } from "@mui/icons-material"
import PostCard from "../../components/boardContent/PostCard.tsx"
import type { Post, User } from "@/types"

const NoticesPage: React.FC = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("전체")
    const [currentPage, setCurrentPage] = useState(1)

    // Mock User Data
    const mockUser: User = {
        id: "admin-1",
        name: "관리자",
        email: "admin@example.com",
        studentId: "00000000",
    }

    // Mock Posts Data
    const mockPosts: Post[] = [
        {
            id: "1",
            title: "2024학년도 1학기 성적 이의신청 기간 안내",
            content:
                "2024학년도 1학기 성적 이의신청 기간을 안내드립니다. 기간 내에 성적에 이의가 있는 학생은 반드시 신청하시기 바랍니다. 자세한 내용은 학교 홈페이지 공지사항을 참조해주세요.",
            author: mockUser,
            createdAt: new Date("2024-07-25T09:00:00"),
            updatedAt: new Date("2024-07-25T09:00:00"),
            category: "공지사항",
            likes: 15,
            comments: [],
            tags: ["성적", "이의신청", "학사"],
            views: 300,
            commentsCount:10

        },
        {
            id: "2",
            title: "하계 계절학기 수강신청 안내",
            content:
                "하계 계절학기 수강신청이 시작됩니다. 수강을 희망하는 학생들은 기간 내에 신청하시기 바랍니다. 개설 강좌 목록 및 자세한 내용은 학사공지 게시판을 확인해주세요.",
            author: mockUser,
            createdAt: new Date("2024-07-20T14:00:00"),
            updatedAt: new Date("2024-07-20T14:00:00"),
            category: "공지사항",
            likes: 20,
            comments: [],
            tags: ["계절학기", "수강신청", "학사"],
            views: 250,
            commentsCount:10
        },
        {
            id: "3",
            title: "도서관 시스템 점검 안내 (7/28)",
            content:
                "도서관 시스템 개선을 위한 정기 점검이 7월 28일 (일) 00:00부터 06:00까지 진행될 예정입니다. 해당 시간 동안 도서관 웹사이트 및 일부 서비스 이용이 제한될 수 있습니다. 이용에 불편을 드려 죄송합니다.",
            author: mockUser,
            createdAt: new Date("2024-07-18T10:00:00"),
            updatedAt: new Date("2024-07-18T10:00:00"),
            category: "공지사항",
            likes: 10,
            comments: [],
            tags: ["도서관", "시스템", "점검"],
            views: 180,
            commentsCount:10

        },
        {
            id: "4",
            title: "학생회관 시설 이용 안내",
            content:
                "학생회관 내 동아리방, 스터디룸, 휴게실 등 시설 이용에 대한 안내입니다. 각 시설별 이용 수칙을 준수하여 쾌적한 환경을 유지해 주시기 바랍니다.",
            author: mockUser,
            createdAt: new Date("2024-07-15T11:30:00"),
            updatedAt: new Date("2024-07-15T11:30:00"),
            category: "공지사항",
            likes: 8,
            comments: [],
            tags: ["학생회관", "시설", "이용"],
            views: 150,
            commentsCount:10

        },
        {
            id: "5",
            title: "교내 장학금 신청 기간 연장 안내",
            content:
                "2024학년도 2학기 교내 장학금 신청 기간이 연장되었습니다. 아직 신청하지 못한 학생들은 연장된 기간 내에 신청하시기 바랍니다. 자세한 내용은 장학팀 공지사항을 확인해주세요.",
            author: mockUser,
            createdAt: new Date("2024-07-10T16:00:00"),
            updatedAt: new Date("2024-07-10T16:00:00"),
            category: "공지사항",
            likes: 25,
            comments: [],
            tags: ["장학금", "신청", "학사"],
            views: 280,
            commentsCount:10

        },
    ]

    const categories = ["전체", "공지사항"] // Only "공지사항" for this page

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
        setCurrentPage(1) // Reset to first page on search
    }

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category)
        setCurrentPage(1) // Reset to first page on category change
    }

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ mb: 6 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        color: "text.primary",
                        mb: 1,
                        fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                >
                    공지사항
                </Typography>
                <Typography variant="h6" sx={{ color: "text.secondary" }}>
                    학교의 중요한 공지사항을 확인하세요.
                </Typography>
            </Box>

            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                mb={4}
                alignItems={{ xs: "stretch", sm: "center" }}
                justifyContent="space-between"
            >
                <TextField
                    variant="outlined"
                    placeholder="공지사항 검색..."
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
                {/* No "새 게시글 작성" button for notices page */}
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
                        <PostCard
                            key={post.id}
                            post={post}
                            onClick={() => console.log("Navigate to post:", post.id)}
                            showCategory={true}
                        />
                    ))
                ) : (
                    <Box sx={{ textAlign: "center", py: 8, gridColumn: "1 / -1" }}>
                        <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
                            공지사항이 없습니다
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            선택한 카테고리나 검색어에 해당하는 공지사항이 없습니다.
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
        </Container>
    )
}

export default NoticesPage
