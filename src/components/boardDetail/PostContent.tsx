"use client"

import type React from "react"

import { Box, Typography, Avatar, Stack, Chip, Divider } from "@mui/material"
import {
    FavoriteBorderOutlined,
    ChatBubbleOutlineOutlined,
    PersonOutlineOutlined,
} from "@mui/icons-material"
import type { Post } from "@/types"
import {theme} from "@/theme/theme.ts";

interface PostContentProps {
    post: Post
    totalCommentCount: number
}

const PostContent: React.FC<PostContentProps> = ({ post, totalCommentCount }) => {

    return (
        <>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    color: "text.primary",
                    mb: 2,
                    fontSize: { xs: "1.75rem", md: "2.25rem" },
                }}
            >
                {post.title}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1.5} mb={4}>
                {post.isAnonymous ? (
                    <Avatar sx={{ bgcolor: theme.palette.grey[300], width: 40, height: 40 }}>
                        <PersonOutlineOutlined sx={{ fontSize: 22, color: theme.palette.grey[600] }} />
                    </Avatar>
                ) : (
                    <Avatar
                        sx={{
                            background: "linear-gradient(45deg, #2563eb 30%, #10b981 90%)",
                            width: 40,
                            height: 40,
                            fontSize: 16,
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
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        {post.author.studentId}
                    </Typography>
                </Box>
            </Stack>

            <Divider sx={{ mb: 4 }} />

            <Typography variant="body1" sx={{ color: "text.primary", lineHeight: 1.8, mb: 4 }}>
                {post.content}
            </Typography>

            {post.images && post.images.length > 0 && (
                <Box sx={{ mb: 4 }}>
                    <Box
                        sx={{
                            display: "flex",
                            overflowX: "auto",
                            gap: 0.5,
                            px: 1,
                            py: 1,
                        }}
                    >
                        {post.images.map((img, index) => (
                            <Box
                                key={index}
                                sx={{
                                    flex: "0 0 auto",
                                    width: 100,
                                    height: 100,
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    bgcolor: theme.palette.grey[100],
                                }}
                            >
                                <img
                                    src={img || "/placeholder.svg"}
                                    alt={`게시글 이미지 ${index + 1}`}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}


            {post.tags && post.tags.length > 0 && (
                <Stack direction="row" flexWrap="wrap" spacing={1} mb={4}>
                    {post.tags.map((tag, index) => (
                        <Chip
                            key={index}
                            label={`#${tag}`}
                            size="small"
                            sx={{
                                bgcolor: theme.palette.grey[100],
                                color: theme.palette.grey[700],
                                fontSize: 12,
                                fontWeight: 500,
                                borderRadius: 1.5,
                            }}
                        />
                    ))}
                </Stack>
            )}

            <Stack direction="row" alignItems="center" spacing={3} sx={{ color: "text.secondary", fontSize: 16, mb: 4 }}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <FavoriteBorderOutlined sx={{ fontSize: 20 }} />
                    <Typography variant="body1">{post.likes}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <ChatBubbleOutlineOutlined sx={{ fontSize: 20 }} />
                    <Typography variant="body1">{totalCommentCount}</Typography>
                </Stack>
            </Stack>

            <Divider sx={{ mb: 4 }} />
        </>
    )
}

export default PostContent
