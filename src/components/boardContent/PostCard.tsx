"use client"

import type React from "react"
import { Box, Card, CardContent, Typography, Chip, Stack, useTheme } from "@mui/material"
import type { PostList } from "@/types"
import {MessageCircle, ThumbsUp} from "lucide-react";

interface PostCardProps {
    post: PostList
    onClick?: () => void
    showCategory?: boolean
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick, showCategory = true }) => {
    const theme = useTheme()

    const formatDate = (date: Date) => {
        const now = new Date()
        const diff = now.getTime() - date.getTime()
        const minutes = Math.floor(diff / (1000 * 60))
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))

        if (minutes < 60) return `${minutes}분 전`
        if (hours < 24) return `${hours}시간 전`
        return `${days}일 전`
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
            case "학사정보":
                return { bgcolor: theme.palette.primary.light, color: theme.palette.primary.contrastText }
            case "생활정보":
                return { bgcolor: theme.palette.info.light, color: theme.palette.info.contrastText }
            case "자격증":
                return { bgcolor: theme.palette.success.light, color: theme.palette.success.contrastText }
            case "취업정보":
                return { bgcolor: theme.palette.warning.light, color: theme.palette.warning.contrastText }
            case "학습자료":
                return { bgcolor: theme.palette.error.light, color: theme.palette.error.contrastText }
            case "학교생활":
                return { bgcolor: theme.palette.primary.light, color: theme.palette.primary.contrastText }
            case "인간관계":
                return { bgcolor: theme.palette.secondary.light, color: theme.palette.secondary.contrastText }
            case "진로":
                return { bgcolor: theme.palette.info.light, color: theme.palette.info.contrastText }
            case "가족":
                return { bgcolor: theme.palette.warning.light, color: theme.palette.warning.contrastText }
            case "연애":
                return { bgcolor: theme.palette.error.light, color: theme.palette.error.contrastText }
            case "기타":
                return { bgcolor: theme.palette.grey[300], color: theme.palette.grey[800] }
            default:
                return { bgcolor: theme.palette.grey[300], color: theme.palette.grey[800] }
        }
    }

    const categoryStyle = getCategoryColor(post.category)

    return (
        <Card
            onClick={onClick}
            sx={{
                cursor: "pointer",
                borderRadius: 2,
                boxShadow: "none",
                border: `1px solid ${theme.palette.grey[200]}`,
                "&:hover": {
                    backgroundColor: theme.palette.grey[50],
                },
            }}
        >
            <CardContent sx={{ p: 2 }}>
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 600,
                                color: "text.primary",
                                mb: 0.5,
                                display: "-webkit-box",
                                overflow: "hidden",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 1,
                            }}
                        >
                            {post.title}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                color: "text.secondary",
                                mb: 1,
                                display: "-webkit-box",
                                overflow: "hidden",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                lineHeight: 1.4,
                            }}
                        >
                            {post.content}
                        </Typography>
                    </Box>

                    {post.images && post.images.length > 0 && (
                        <Box
                            sx={{
                                width: 72,
                                height: 72,
                                borderRadius: 1.5,
                                overflow: "hidden",
                                flexShrink: 0,
                            }}
                        >
                            <img
                                src={post.images || "/placeholder.svg"}
                                alt="게시글 이미지"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </Box>
                    )}
                </Stack>

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                    sx={{ color: "text.secondary", fontSize: 13, mt: 0.5 }}
                >

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ThumbsUp size={ 16 } />
                        <Typography variant="caption">{post.likes}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <MessageCircle size={16} />
                        <Typography variant="caption">{post.commentNumber}</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ ml: 1 }}>
                        {formatDate(post.createdAt)}
                    </Typography>

                    {showCategory && (
                        <Chip
                            label={post.category}
                            size="small"
                            sx={{
                                ...categoryStyle,
                                ml: "auto",
                                fontWeight: 500,
                                fontSize: 10,
                                height: 20,
                            }}
                        />
                    )}
                </Stack>
            </CardContent>
        </Card>

    )
}

export default PostCard
