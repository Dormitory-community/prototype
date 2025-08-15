"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Groups, ArrowBack, AddPhotoAlternate, AttachFile } from "@mui/icons-material"
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
    useTheme,
} from "@mui/material"
import { ROUTES } from "@/router"

const GroupWritePage: React.FC = () => {
    const navigate = useNavigate()
    const theme = useTheme()

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
        schedule: "",
        location: "",
        maxParticipants: 6,
    })
    const [tags, setTags] = useState<string[]>([])
    const [newTag, setNewTag] = useState("")

    const categories = ["학습", "어학", "취미", "운동", "공모전", "자격증", "IT/코딩"]

    const handleInputChange = (field: string, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

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
        console.log({
            ...formData,
            tags,
        })
        // Here you would typically send this data to a backend API
        alert("모임이 생성되었습니다!")
        navigate(ROUTES.GROUPS)
    }

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            {/* Back button */}
            <Button
                onClick={() => navigate(ROUTES.GROUPS)}
                startIcon={<ArrowBack />}
                sx={{
                    color: "text.secondary",
                    mb: 3,
                    textTransform: "none",
                    "&:hover": { color: "#8b5cf6", bgcolor: "transparent" },
                }}
            >
                그룹 모집 목록으로 돌아가기
            </Button>

            {/* Header */}
            <Box
                sx={{ background: "linear-gradient(45deg, #8b5cf6 30%, #3b82f6 90%)", borderRadius: "16px 16px 0 0", p: 2.5 }}
            >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            bgcolor: "rgba(255,255,255,0.2)",
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Groups sx={{ fontSize: 24, color: "white" }} />
                    </Box>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "white" }}>
                            모임 게시글 작성
                        </Typography>
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
                            함께 활동할 모임을 만들어보세요.
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            {/* Form */}
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
                        value={formData.category}
                        label="카테고리"
                        onChange={(e) => handleInputChange("category", e.target.value)}
                        sx={{ borderRadius: theme.shape.borderRadius }}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="제목"
                    variant="outlined"
                    fullWidth
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                    placeholder="예: TOEIC 900점 목표 스터디"
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: theme.shape.borderRadius } }}
                />

                <TextField
                    label="내용"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={10}
                    value={formData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    required
                    placeholder="모임에 대한 자세한 설명을 작성해주세요..."
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

                <Stack spacing={2.5} sx={{ p: 3 }}>
                    <TextField
                        label="모임 일정"
                        type="datetime-local"
                        value={formData.schedule}
                        onChange={(e) => handleInputChange("schedule", e.target.value)}
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />

                    <TextField
                        label="모임 장소"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        fullWidth
                        required
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                        placeholder="예: 스터디룸 A, 온라인 (디스코드)"
                    />

                    <TextField
                        label="최대 참여 인원"
                        type="number"
                        value={formData.maxParticipants}
                        onChange={(e) => handleInputChange("maxParticipants", Number.parseInt(e.target.value) || 6)}
                        fullWidth
                        required
                        inputProps={{ min: 2, max: 20 }}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                        placeholder="6"
                    />
                </Stack>

                <Stack direction="row" spacing={2} mt={2}>
                    <Button variant="outlined" startIcon={<AddPhotoAlternate />} sx={{ borderRadius: theme.shape.borderRadius }}>
                        사진 첨부
                    </Button>
                    <Button variant="outlined" startIcon={<AttachFile />} sx={{ borderRadius: theme.shape.borderRadius }}>
                        파일 첨부
                    </Button>
                </Stack>

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                        mt: 4,
                        borderRadius: theme.shape.borderRadius,
                        bgcolor: "#8b5cf6",
                        "&:hover": { bgcolor: "#7c3aed" }
                    }}
                >
                    모임 생성 완료
                </Button>
            </Box>
        </Container>
    )
}

export default GroupWritePage