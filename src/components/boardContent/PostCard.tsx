"use client"

import type React from "react"
import { Box, Card, CardContent, Typography, Chip, Stack } from "@mui/material"
import type { PostList } from "@/types"
import { MessageCircle, ThumbsUp } from "lucide-react"
import { theme } from "@/theme/theme"

interface PostCardProps {
    post: PostList
    onClick?: () => void
    showCategory?: boolean
    dense?: boolean // compact 모드 (true면 카드가 더 작아집니다)
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick, showCategory = true, dense = false }) => {
    const isCompact = dense

    const formatDate = (date: Date) => {
        const now = new Date()
        const diff = now.getTime() - new Date(date).getTime()
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
            case "질문":
                return { bgcolor: theme.palette.warning.light, color: theme.palette.warning.contrastText }
            case "일상":
                return { bgcolor: theme.palette.success.light, color: theme.palette.success.contrastText }
            case "정보공유":
            case "학사정보":
            case "학교생활":
                return { bgcolor: theme.palette.primary.light, color: theme.palette.primary.contrastText }
            case "생활정보":
            case "진로":
                return { bgcolor: theme.palette.info.light, color: theme.palette.info.contrastText }
            case "자격증":
            case "학습자료":
                return { bgcolor: theme.palette.success.light, color: theme.palette.success.contrastText }
            case "취업정보":
            case "가족":
                return { bgcolor: theme.palette.warning.light, color: theme.palette.warning.contrastText }
            case "연애":
                return { bgcolor: theme.palette.error.light, color: theme.palette.error.contrastText }
            case "인간관계":
                return { bgcolor: theme.palette.secondary.light, color: theme.palette.secondary.contrastText }
            case "기타":
            default:
                return { bgcolor: theme.palette.grey[300], color: theme.palette.grey[800] }
        }
    }

    const categoryStyle = getCategoryColor(post.category)

    return (
        <Card
            onClick={onClick}
            sx={{
                cursor: onClick ? "pointer" : "default",
                borderRadius: isCompact ? 1 : 2,
                boxShadow: "none",
                border: `1px solid ${theme.palette.grey[200]}`,
            }}
        >
            <CardContent sx={{ p: isCompact ? 1 : 2 }}>
                <Stack direction="row" spacing={isCompact ? 1 : 1.5} alignItems="center">                    <Box sx={{ flex: 1 }}>
                        {showCategory && (
                            <Chip
                                label={post.category}
                                size="small"
                                sx={{
                                    ...categoryStyle,
                                    mb: isCompact ? 0.5 : 1,
                                    fontWeight: 500,
                                    fontSize: isCompact ? 9 : 10,
                                    height: isCompact ? 18 : 20,
                                }}
                            />
                        )}

                        <Typography
                            variant={isCompact ? "body2" : "subtitle2"}
                            sx={{
                                fontWeight: 600,
                                color: "text.primary",
                                mb: isCompact ? 0.25 : 0.5,
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
                                mb: isCompact ? 0.5 : 1,
                                display: "-webkit-box",
                                overflow: "hidden",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: isCompact ? 1 : 2,
                                lineHeight: 1.3,
                                fontSize: isCompact ? '0.8rem' : '0.875rem',
                            }}
                        >
                            {post.content}
                        </Typography>
                    </Box>

                    {post.images && post.images.length > 0 && (
                        <Box
                            sx={{
                                width: isCompact ? 56 : 72,
                                height: isCompact ? 56 : 72,
                                borderRadius: 1.5,
                                overflow: "hidden",
                                flexShrink: 0,
                            }}
                        >
                            <img
                                src={Array.isArray(post.images) ? post.images[0] : post.images}
                                alt="게시글 이미지"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </Box>
                    )}
                </Stack>

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={isCompact ? 1 : 1.5}
                    sx={{ color: "text.secondary", fontSize: isCompact ? 12 : 13, mt: isCompact ? 0.5 : 0.75 }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ThumbsUp size={isCompact ? 14 : 16} />
                        <Typography variant="caption">{post.likes}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <MessageCircle size={isCompact ? 14 : 16} />
                        <Typography variant="caption">{post.commentNumber}</Typography>
                    </Box>

                    <Typography variant="caption" sx={{ ml: 1 }}>
                        {formatDate(post.createdAt)}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default PostCard
