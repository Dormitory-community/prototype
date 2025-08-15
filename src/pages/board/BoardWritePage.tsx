"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowBack, CameraAlt} from "@mui/icons-material"
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Chip,
    Stack,
    FormControlLabel,
    Checkbox,
    useTheme,
} from "@mui/material"

const boardConfigs = {
    free: {
        title: "자유 게시글 작성",
        description: "자유롭게 이야기를 나누고 정보를 공유하는 공간입니다.",
        defaultCategory: "선택",
        categories: [
            { value: "선택", label: "선택" },
            { value: "일상", label: "일상" },
            { value: "질문", label: "질문" },
            { value: "기타", label: "기타" },
        ],
    },
    info: {
        title: "정보 공유 게시글 작성",
        description: "유용한 정보를 공유하고 다른 학생들과 소통하세요.",
        defaultCategory: "학사정보",
        categories: [
            { value: "학사정보", label: "학사정보" },
            { value: "생활정보", label: "생활정보" },
            { value: "자격증", label: "자격증" },
            { value: "취업정보", label: "취업정보" },
            { value: "학습자료", label: "학습자료" },
            { value: "학교생활", label: "학교생활" },
            { value: "기타", label: "기타" },
        ],
    },
    counseling: {
        title: "고민 상담 게시글 작성",
        description: "익명으로 고민을 나누고 조언을 얻어보세요.",
        defaultCategory: "선택",
        categories: [
            { value: "선택", label: "선택" },
            { value: "인간관계", label: "인간관계" },
            { value: "진로", label: "진로" },
            { value: "연애", label: "연애" },
            { value: "기타", label: "기타" },
        ],
    },
    study: {
        title: "모임/스터디 게시글 작성",
        description: "함께 공부하고 성장할 스터디 그룹이나 모임을 찾아보세요.",
        defaultCategory: "어학",
        categories: [
            { value: "어학", label: "어학" },
            { value: "IT/코딩", label: "IT/코딩" },
            { value: "공모전", label: "공모전" },
            { value: "운동/취미", label: "운동/취미" },
            { value: "자격증", label: "자격증" },
            { value: "기타", label: "기타" },
        ],
    },
}

const BoardWritePage: React.FC = () => {
    const navigate = useNavigate()
    const { type } = useParams<{ type: string }>()
    const theme = useTheme()

    const boardType = type as keyof typeof boardConfigs
    const config = boardConfigs[boardType] || boardConfigs.free

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState(config.defaultCategory)
    const [tags, setTags] = useState<string[]>([])
    const [newTag, setNewTag] = useState("")
    const [isAnonymous, setIsAnonymous] = useState(false)

    useEffect(() => {
        setCategory(config.defaultCategory)
    }, [config.defaultCategory])

    const handleAddTag = () => {
        if (newTag.trim() !== "" && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()])
            setNewTag("")
        }
    }

    const handleDeleteTag = (tagToDelete: string) => {
        setTags(tags.filter((tag) => tag !== tagToDelete))
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        console.log({ title, content, category, tags, isAnonymous, boardType })
        // Here you would typically send this data to a backend API
        alert("게시글이 작성되었습니다!")
        // Reset form and navigate back
        setTitle("")
        setContent("")
        setCategory(config.defaultCategory)
        setTags([])
        setIsAnonymous(false)
        navigate("/boards")
    }

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Button
                onClick={() => navigate("/boards")}
                startIcon={<ArrowBack />}
                sx={{
                    color: "text.secondary",
                    mb: 3,
                    textTransform: "none",
                }}
            >
                게시판으로 돌아가기
            </Button>

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
                    {config.title}
                </Typography>
                <Typography variant="h6" sx={{ color: "text.secondary" }}>
                    {config.description}
                </Typography>
            </Box>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    p: { xs: 2, md: 4 },
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 4,
                    backgroundColor: "background.paper",
                }}
            >
                <FormControl fullWidth>
                    <InputLabel id="category-label">카테고리</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category-select"
                        value={category}
                        label="카테고리"
                        onChange={(e) => setCategory(e.target.value as string)}
                        sx={{ borderRadius: theme.shape.borderRadius }}
                    >
                        {config.categories.map((cat) => (
                            <MenuItem key={cat.value} value={cat.value}>
                                {cat.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="제목"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: theme.shape.borderRadius } }}
                />

                <TextField
                    label="내용"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={10}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: theme.shape.borderRadius } }}
                />

                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        태그 추가
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
                        {tags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                onDelete={() => handleDeleteTag(tag)}
                                sx={{ borderRadius: 2, bgcolor: theme.palette.grey[200] }}
                            />
                        ))}
                    </Stack>
                    <TextField
                        variant="outlined"
                        placeholder="태그를 입력하고 Enter를 누르세요"
                        fullWidth
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault()
                                handleAddTag()
                            }
                        }}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: theme.shape.borderRadius } }}
                    />
                </Box>

                <FormControlLabel
                    control={
                        <Checkbox checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} color="primary" />
                    }
                    label="익명으로 작성"
                />

                <Stack direction="row" spacing={2} mt={2}>
                    <Button variant="outlined" startIcon={<CameraAlt />} sx={{ borderRadius: theme.shape.borderRadius }}>
                        사진 첨부
                    </Button>
                </Stack>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ mt: 4, borderRadius: theme.shape.borderRadius }}
                >
                    게시글 작성 완료
                </Button>
            </Box>
        </Container>
    )
}

export default BoardWritePage
