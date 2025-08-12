"use client"

import type React from "react"
import { Box, Card, CardContent, Typography, Avatar, Chip, Stack, useTheme } from "@mui/material"
import {
  FavoriteBorderOutlined,
  ChatBubbleOutlineOutlined,
  AccessTimeOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material"
import type { Post } from "@/types"

interface PostCardProps {
  post: Post
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
            borderRadius: 4,
            boxShadow: theme.shadows[1],
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              boxShadow: theme.shadows[3],
              transform: "translateY(-4px)",
            },
          }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between" mb={2}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              {post.isAnonymous ? (
                  <Avatar sx={{ bgcolor: theme.palette.grey[300], width: 32, height: 32 }}>
                    <PersonOutlineOutlined sx={{ fontSize: 18, color: theme.palette.grey[600] }} />
                  </Avatar>
              ) : (
                  <Avatar
                      sx={{
                        background: "linear-gradient(45deg, #2563eb 30%, #10b981 90%)",
                        width: 32,
                        height: 32,
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                  >
                    {post.author.name.charAt(0)}
                  </Avatar>
              )}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "text.primary" }}>
                  {post.isAnonymous ? "익명" : post.author.name}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "text.secondary", fontSize: 12 }}>
                  <AccessTimeOutlined sx={{ fontSize: 14 }} />
                  <Typography variant="caption">{formatDate(post.createdAt)}</Typography>
                </Stack>
              </Box>
            </Stack>
            {showCategory && (
                <Chip
                    label={post.category}
                    size="small"
                    sx={{
                      ...categoryStyle,
                      fontWeight: 500,
                      fontSize: 11,
                      height: 24,
                      borderRadius: 2,
                    }}
                />
            )}
          </Stack>

          <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                mb: 1,
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
          >
            {post.title}
          </Typography>

          <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mb: 2,
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                lineHeight: 1.5,
              }}
          >
            {post.content}
          </Typography>

          {post.tags && post.tags.length > 0 && (
              <Stack direction="row" flexWrap="wrap" spacing={1} mb={2}>
                {post.tags.map((tag, index) => (
                    <Chip
                        key={index}
                        label={`#${tag}`}
                        size="small"
                        sx={{
                          bgcolor: theme.palette.grey[100],
                          color: theme.palette.grey[700],
                          fontSize: 11,
                          fontWeight: 500,
                          borderRadius: 1.5,
                        }}
                    />
                ))}
              </Stack>
          )}

          <Stack direction="row" alignItems="center" spacing={2} sx={{ color: "text.secondary", fontSize: 14 }}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <FavoriteBorderOutlined sx={{ fontSize: 18 }} />
              <Typography variant="body2">{post.likes}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <ChatBubbleOutlineOutlined sx={{ fontSize: 18 }} />
              <Typography variant="body2">{post.comments.length}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
  )
}

export default PostCard
