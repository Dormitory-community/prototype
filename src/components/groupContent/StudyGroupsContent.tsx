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
import {Search, Add, Edit} from "@mui/icons-material"
import StudyGroupCard from "@/components/groupContent/StudyGroupCard.tsx"
import { useNavigation } from "@/hooks/useNavigation.ts"
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/router";

const StudyGroupsContent: React.FC = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("전체")
    const [currentPage, setCurrentPage] = useState(1)


    interface StudyGroup {
        id: string
        title: string
        description: string
        category: string
        leader: string
        schedule: string
        location: string
        tags: string[]
        participants: string[]
        maxParticipants: number
        createdAt: string
    }

    const mockStudyGroups: StudyGroup[] = [
        {
            id: "1",
            title: "TOEIC 스터디 모집",
            description:
                "토익 900점 목표로 함께 공부할 스터디원을 모집합니다. 매주 화, 목 저녁 7시에 모여서 문제 풀이와 단어 암기를 함께 해요!",
            category: "어학",
            leader: "김영어",
            schedule: "화, 목 19:00",
            location: "스터디룸 A",
            tags: ["토익", "영어", "자격증"],
            participants: ["A", "B", "C", "D"],
            maxParticipants: 6,
            createdAt: "1월 15일 생성",
        },
        {
            id: "2",
            title: "알고리즘 코딩테스트 준비",
            description: "백준, 프로그래머스 문제를 함께 풀며 코딩테스트를 준비해요. 초보자도 환영합니다!",
            category: "학습",
            leader: "박코딩",
            schedule: "월, 수, 금 20:00",
            location: "온라인 (디스코드)",
            tags: ["알고리즘", "코딩테스트", "프로그래밍"],
            participants: ["A", "B", "C", "D", "E", "F"],
            maxParticipants: 8,
            createdAt: "1월 14일 생성",
        },
        {
            id: "3",
            title: "독서 모임 - 자기계발서",
            description: "매월 자기계발서 한 권씩 읽고 토론하는 모임입니다. 함께 성장해요!",
            category: "취미",
            leader: "이독서",
            schedule: "매주 일 14:00",
            location: "카페 북스",
            tags: ["독서", "자기계발", "토론"],
            participants: ["A", "B", "C"],
            maxParticipants: 5,
            createdAt: "1월 12일 생성",
        },
        {
            id: "4",
            title: "헬스 운동 메이트",
            description: "주 3회 헬스장에서 함께 운동할 메이트를 구합니다. 초보자 환영!",
            category: "운동",
            leader: "최헬스",
            schedule: "월, 수, 금 18:00",
            location: "학교 헬스장",
            tags: ["헬스", "운동", "다이어트"],
            participants: ["A", "B"],
            maxParticipants: 4,
            createdAt: "1월 10일 생성",
        },
    ]

    const categories = ["전체", "학습", "어학", "취미", "운동"]

    // 이 부분은 사용되지 않으므로 제거
    // const filteredPosts = mockPosts.filter((post) => {
    //     const matchesCategory = selectedCategory === "전체" || post.category === selectedCategory
    //     const matchesSearch =
    //         post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         post.content.toLowerCase().includes(searchTerm.toLowerCase())
    //     return matchesCategory && matchesSearch
    // })

    const filteredStudyGroups = mockStudyGroups.filter((group) => {
        const matchesCategory = selectedCategory === "전체" || group.category === selectedCategory
        const matchesSearch =
            group.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            group.description.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

    // totalPages 계산을 filteredStudyGroups.length로 수정
    const groupsPerPage = 6
    const totalPages = Math.ceil(filteredStudyGroups.length / groupsPerPage)
    const paginatedGroups = filteredStudyGroups.slice((currentPage - 1) * groupsPerPage, currentPage * groupsPerPage)

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

    const {goToGroupWrite} = useNavigation()

    return (
        <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 2, md: 3 } }}>
            {/* Search and Create Button */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={4} alignItems={{ xs: "stretch", sm: "center" }} justifyContent={{ xs: "flex-start", sm: "space-between" }}>
                <TextField
                    variant="outlined"
                    placeholder="스터디/모임 검색..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{
                        width: { xs: "100%", sm: "400px" },
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            backgroundColor: theme.palette.background.paper,
                        },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: "action.active" }} />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                { !isMobile && (
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => goToGroupWrite()}
                        sx={{
                            height: "56px", // Match TextField height
                            borderRadius: 2,
                            px: 3,
                            bgcolor: "#8b5cf6",
                            color: "white",
                            fontWeight: 600,
                            textTransform: "none",
                            minWidth: { xs: "120px", md: "140px" },
                            alignSelf: { xs: "stretch", sm: "flex-end" },
                            "&:hover": {
                                bgcolor: "#7c3aed",
                            },
                        }}
                    >
                        모임 만들기
                    </Button>
                )}
            </Stack>

            {/* Category filters */}
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
                        sx={{
                            minWidth: "fit-content",
                            px: 2,
                            py: 1,
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            borderRadius: 2,
                            bgcolor: selectedCategory === category ? "#8b5cf6" : theme.palette.background.paper,
                            color: selectedCategory === category ? "white" : theme.palette.text.secondary,
                            border: selectedCategory === category ? "none" : "1px solid",
                            borderColor: theme.palette.divider,
                            "&:hover": {
                                bgcolor: selectedCategory === category ? "#7c3aed" : theme.palette.action.hover,
                            },
                        }}
                    />
                ))}
            </Stack>

            {/* Study groups grid */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, mb: 6 }}>
                {paginatedGroups.length > 0 ? (
                    paginatedGroups.map((group) => (
                        <StudyGroupCard
                            key={group.id}
                            studyGroup={group}
                            onClick={() => navigate(ROUTES.GROUP_DETAIL.replace(":id", group.id))}
                        />
                    ))
                ) : (
                    <Box sx={{ textAlign: "center", py: 8, gridColumn: "1 / -1" }}>
                        <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
                            모임이 없습니다
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            선택한 카테고리나 검색어에 해당하는 모임이 없습니다.
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Pagination */}
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
                                    bgcolor: "#8b5cf6",
                                    color: "white",
                                },
                            },
                        }}
                    />
                </Stack>
            )}
            {isMobile && (
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
                        onClick={goToGroupWrite}
                        sx={{
                            width: 75,   // 크기 줄임 (기본 FAB 사이즈 정도)
                            height: 44,
                            borderRadius: "22px",
                            bgcolor: "#8b5cf6",
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

            )}

        </Box>
    )
}

export default StudyGroupsContent