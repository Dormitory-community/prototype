"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ShoppingCart, ArrowBack, AddPhotoAlternate, AttachFile } from "@mui/icons-material"
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

const DeliveryWritePage: React.FC = () => {
    const navigate = useNavigate()
    const theme = useTheme()
    const [restaurant, setRestaurant] = useState("")
    const [targetAmount, setTargetAmount] = useState("")
    const [deliveryFee, setDeliveryFee] = useState("")
    const [deadline, setDeadline] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("배달주문") // Default category
    const [tags, setTags] = useState<string[]>([])
    const [newTag, setNewTag] = useState("")

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
            restaurant,
            targetAmount,
            deliveryFee,
            deadline,
            location,
            description,
            title,
            content,
            category,
            tags,
        })
        // Here you would typically send this data to a backend API
        alert("게시글이 작성되었습니다!")
        // Optionally reset form or navigate
        setRestaurant("")
        setTargetAmount("")
        setDeliveryFee("")
        setDeadline("")
        setLocation("")
        setDescription("")
        setTitle("")
        setContent("")
        setCategory("배달주문")
        setTags([])
    }

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            {/* Back button */}
            <Button
                onClick={() => navigate("/delivery")}
                startIcon={<ArrowBack />}
                sx={{
                    color: "text.secondary",
                    mb: 3,
                    textTransform: "none",
                    "&:hover": { color: "warning.main", bgcolor: "transparent" },
                }}
            >
                배달 공동주문 목록으로 돌아가기
            </Button>

            {/* Header */}
            <Box
                sx={{ background: "linear-gradient(45deg, #f59e0b 30%, #ef4444 90%)", borderRadius: "16px 16px 0 0", p: 2.5 }}
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
                        <ShoppingCart sx={{ fontSize: 24, color: "white" }} />
                    </Box>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "white" }}>
                            배달 주문 게시글 작성
                        </Typography>
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
                            함께 배달 주문할 사람을 찾아보세요.
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
                        value={category}
                        label="카테고리"
                        onChange={(e) => setCategory(e.target.value as string)}
                        sx={{ borderRadius: theme.shape.borderRadius }}
                    >
                        <MenuItem value="배달주문">배달주문</MenuItem>
                        {/* Add other relevant categories if needed */}
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

                <Stack spacing={2.5} sx={{ p: 3 }}>
                    <TextField
                        label="음식점 이름"
                        value={restaurant}
                        onChange={(e) => setRestaurant(e.target.value)}
                        fullWidth
                        required
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                        placeholder="예: 맘스터치, 피자헛, 교촌치킨"
                    />

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <TextField
                            label="목표 금액"
                            type="number"
                            value={targetAmount}
                            onChange={(e) => setTargetAmount(e.target.value)}
                            fullWidth
                            required
                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                            placeholder="20000"
                        />
                        <TextField
                            label="배달비"
                            type="number"
                            value={deliveryFee}
                            onChange={(e) => setDeliveryFee(e.target.value)}
                            fullWidth
                            required
                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                            placeholder="3000"
                        />
                    </Stack>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <TextField
                            label="마감 시간"
                            type="datetime-local"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            fullWidth
                            required
                            InputLabelProps={{ shrink: true }}
                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                        />
                        <TextField
                            label="수령 장소"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            fullWidth
                            required
                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                            placeholder="예: A동 로비"
                        />
                    </Stack>

                    <TextField
                        label="추가 설명 (선택)"
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                        placeholder="주문에 대한 추가 정보나 요청사항을 적어주세요"
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

export default DeliveryWritePage
