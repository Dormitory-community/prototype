"use client"

import React from "react"
import {
    Stack,
    Typography,
    Chip,
    IconButton,
    useTheme,
} from "@mui/material"
import {
    AccessTimeOutlined,
    ArrowBack,
} from "@mui/icons-material"

interface PostHeaderProps {
    category: string
    createdAt: Date
    onGoBack: () => void
}

const PostHeader: React.FC<PostHeaderProps> = ({ category, createdAt, onGoBack }) => {
    const theme = useTheme()

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "공지사항":
                return { bgcolor: theme.palette.error.light, color: theme.palette.error.contrastText }
            case "고민상담":
                return { bgcolor: theme.palette.secondary.light, color: theme.palette.secondary.contrastText }
            case "모임/스터디":
                return { bgcolor: theme.palette.info.light, color: theme.palette.info.contrastText }
            case "배달주문":
                return { bgcolor: theme.palette.warning.light, color: theme.palette.warning.contrastText }
            case "자유게시판":
                return { bgcolor: theme.palette.success.light, color: theme.palette.success.contrastText }
            case "정보공유":
                return { bgcolor: theme.palette.primary.light, color: theme.palette.primary.contrastText }
            default:
                return { bgcolor: theme.palette.grey[300], color: theme.palette.grey[800] }
        }
    }

    const categoryStyle = getCategoryColor(category)

    return (
        <>
            <Stack direction="row" alignItems="center" spacing={1} mb={3}>
                <IconButton onClick={onGoBack} sx={{ color: "text.primary" }}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    게시글 상세
                </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Chip
                    label={category}
                    size="small"
                    sx={{
                        ...categoryStyle,
                        fontWeight: 500,
                        fontSize: 12,
                        height: 28,
                        borderRadius: 2,
                    }}
                />
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "text.secondary", fontSize: 14 }}>
                    <AccessTimeOutlined sx={{ fontSize: 16 }} />
                    <Typography variant="body2">{formatDate(createdAt)}</Typography>
                </Stack>
            </Stack>
        </>
    )
}

export default PostHeader
