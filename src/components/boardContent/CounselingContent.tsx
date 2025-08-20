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
import { useNavigation } from "@/hooks/useNavigation.ts"
import profileImage from "#/default-profile.webp"; // NEW

const CounselingContent: React.FC = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("전체")
    const [currentPage, setCurrentPage] = useState(1)

    const { goToBoardWrite, goToBoardDetail } = useNavigation() // NEW

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

    // Mock Posts Data
    const mockPosts: PostList[] = [
        {
            id: "1",
            title: "새 학기 적응이 어려워요",
            content:
                "기숙사에 처음 들어와서 새로운 환경에 적응하기가 힘들어요. 룸메이트와도 어색하고, 수업도 어렵고, 친구 사귀는 것도 쉽지 않네요. 다들 어떻게 적응하셨나요? 조언 부탁드립니다.",
            author: mockUser1,
            createdAt: new Date("2024-07-20T10:00:00"),
            updatedAt: new Date("2024-07-20T10:00:00"),
            category: "인간관계",
            likes: 12,
            isAnonymous: true,
            tags: ["새학기", "적응", "룸메이트"],
            views: 80,
            commentNumber: 30,
            images: profileImage
        },
        {
            id: "2",
            title: "인간관계 고민, 어떻게 해결해야 할까요?",
            content:
                "친한 친구와 사소한 오해가 생겨서 관계가 서먹해졌어요. 먼저 다가가서 화해하고 싶은데 어떻게 말을 꺼내야 할지 모르겠어요. 조언 부탁드립니다.",
            author: mockUser2,
            createdAt: new Date("2024-07-18T14:00:00"),
            updatedAt: new Date("2024-07-18T14:00:00"),
            category: "인간관계",
            likes: 8,
            commentNumber: 30,
            isAnonymous: false,
            tags: ["친구", "관계", "고민"],
            views: 60,
        },
        {
            id: "3",
            title: "졸업 후 진로 고민이 많아요",
            content:
                "졸업이 다가오면서 진로에 대한 고민이 많습니다. 어떤 분야로 나아가야 할지, 어떤 준비를 해야 할지 막막하네요. 선배님들의 경험담이나 조언을 듣고 싶습니다.",
            author: mockUser1,
            createdAt: new Date("2024-07-15T09:00:00"),
            updatedAt: new Date("2024-07-15T09:00:00"),
            category: "진로",
            likes: 15,
            commentNumber: 30,
            isAnonymous: true,
            tags: ["진로", "취업", "고민"],
            views: 100,
        },
        {
            id: "4",
            title: "가족과의 갈등, 어떻게 풀어야 할까요?",
            content:
                "부모님과 의견 차이가 커서 자주 다 퉈요. 서로 이해하고 싶은데 대화가 잘 안 통하네요. 가족 갈등을 현명하게 해결하는 방법이 있을까요?",
            author: mockUser2,
            createdAt: new Date("2024-07-12T11:00:00"),
            updatedAt: new Date("2024-07-12T11:00:00"),
            category: "가족",
            likes: 7,
            commentNumber: 30,
            isAnonymous: false,
            tags: ["가족", "갈등", "대화"],
            views: 50,
        },
        {
            id: "5",
            title: "연애 고민, 조언 부탁드립니다",
            content:
                "썸 타는 사람이 있는데, 어떻게 해야 관계가 발전할 수 있을지 모르겠어요. 고백 타이밍이나 상대방의 마음을 확인하는 방법 등 연애 조언 부탁드립니다.",
            author: mockUser1,
            createdAt: new Date("2024-07-10T16:00:00"),
            updatedAt: new Date("2024-07-10T16:00:00"),
            category: "연애",
            likes: 10,
            commentNumber: 30,
            isAnonymous: true,
            tags: ["연애", "썸", "고백"],
            views: 70,
        },
    ]

    const categories = ["전체", "인간관계", "진로", "가족", "연애", "기타"]

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
                    onClick={() => goToBoardWrite("counseling")} // UPDATED
                    sx={{
                        height: "56px", // Match TextField height
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
        </Box>
    )
}

export default CounselingContent
