"use client"

import React from "react"
import {
    Box,
    Typography,
    Avatar,
    Stack,
    List,
    ListItem,
    IconButton,
    Menu,
    MenuItem,
    useTheme,
} from "@mui/material"
import {
    PersonOutlineOutlined,
    Reply,
    MoreVert,
    ReportOutlined,
} from "@mui/icons-material"
import type { Post } from "@/types"

interface CommentListProps {
    comments: Post['comments']
    onReplyClick: (commentId: string) => void
    replyToComment: string | null
}

const CommentList: React.FC<CommentListProps> = ({
                                                     comments,
                                                     onReplyClick,
                                                     replyToComment
                                                 }) => {
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [selectedComment, setSelectedComment] = React.useState<string | null>(null)

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, commentId: string) => {
        setAnchorEl(event.currentTarget)
        setSelectedComment(commentId)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        setSelectedComment(null)
    }

    const handleReport = () => {
        console.log("신고하기:", selectedComment)
        handleMenuClose()
    }

    const handleNote = () => {
        console.log("쪽지 보내기:", selectedComment)
        handleMenuClose()
    }

    const getTotalCommentCount = () => {
        return comments.reduce((total, comment) => {
            return total + 1 + (comment.replies ? comment.replies.length : 0)
        }, 0)
    }

    return (
        <>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary", mb: 3 }}>
                댓글 ({getTotalCommentCount()})
            </Typography>

            <List sx={{ width: "100%" }}>
                {comments.map((comment, index) => (
                    <React.Fragment key={comment.id}>
                        <ListItem alignItems="flex-start" sx={{ py: 2, px: 0 }}>
                            {comment.isAnonymous ? (
                                <Avatar sx={{ bgcolor: theme.palette.grey[300], width: 32, height: 32, mr: 2 }}>
                                    <PersonOutlineOutlined sx={{ fontSize: 18, color: theme.palette.grey[600] }} />
                                </Avatar>
                            ) : (
                                <Avatar
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        background: "linear-gradient(45deg, #2563eb 30%, #10b981 90%)",
                                        mr: 2,
                                    }}
                                >
                                    {comment.author.name.charAt(0)}
                                </Avatar>
                            )}
                            <Box sx={{ flex: 1 }}>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "text.primary" }}>
                                        {comment.isAnonymous ? "익명" : comment.author.name}
                                    </Typography>
                                    <IconButton
                                        size="small"
                                        onClick={(e) => handleMenuClick(e, comment.id)}
                                        sx={{ color: "text.secondary" }}
                                    >
                                        <MoreVert sx={{ fontSize: 16 }} />
                                    </IconButton>
                                </Stack>

                                <Typography sx={{ color: "text.secondary", mb: 1 }} variant="body2">
                                    {comment.content}
                                </Typography>

                                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                                    <Typography
                                        sx={{ color: "grey.500" }}
                                        variant="caption"
                                    >
                                        {formatDate(comment.createdAt)}
                                    </Typography>

                                    <IconButton
                                        size="small"
                                        onClick={() => onReplyClick(comment.id)}
                                        sx={{
                                            color: replyToComment === comment.id ? "primary.main" : "text.secondary",
                                            p: 0.5,
                                            fontSize: 12,
                                            '&:hover': {
                                                color: "primary.main"
                                            }
                                        }}
                                    >
                                        <Reply sx={{ fontSize: 14, mr: 0.5 }} />
                                        <Typography variant="caption">
                                            {replyToComment === comment.id ? "취소" : "답글"}
                                        </Typography>
                                    </IconButton>
                                </Stack>
                            </Box>
                        </ListItem>



                        {/* 기존 대댓글들 표시 */}
                        {comment.replies && comment.replies.length > 0 && (
                            <Box sx={{ ml: 6, mb: 2 }}>
                                {comment.replies.map((reply) => (
                                    <ListItem key={reply.id} alignItems="flex-start" sx={{ py: 1, px: 0 }}>
                                        {reply.isAnonymous ? (
                                            <Avatar sx={{ bgcolor: theme.palette.grey[300], width: 28, height: 28, mr: 1.5 }}>
                                                <PersonOutlineOutlined sx={{ fontSize: 16, color: theme.palette.grey[600] }} />
                                            </Avatar>
                                        ) : (
                                            <Avatar
                                                sx={{
                                                    width: 28,
                                                    height: 28,
                                                    background: "linear-gradient(45deg, #2563eb 30%, #10b981 90%)",
                                                    mr: 1.5,
                                                    fontSize: 12,
                                                }}
                                            >
                                                {reply.author.name.charAt(0)}
                                            </Avatar>
                                        )}
                                        <Box sx={{ flex: 1 }}>
                                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.primary", fontSize: 14 }}>
                                                    {reply.isAnonymous ? "익명" : reply.author.name}
                                                </Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={(e) => handleMenuClick(e, reply.id)}
                                                    sx={{ color: "text.secondary" }}
                                                >
                                                    <MoreVert sx={{ fontSize: 14 }} />
                                                </IconButton>
                                            </Stack>

                                            <Typography sx={{ color: "text.secondary", fontSize: 14, mb: 0.5 }} variant="body2">
                                                {reply.content}
                                            </Typography>

                                            <Typography
                                                sx={{ color: "grey.500", fontSize: 12 }}
                                                variant="caption"
                                            >
                                                {formatDate(reply.createdAt)}
                                            </Typography>
                                        </Box>
                                    </ListItem>
                                ))}
                            </Box>
                        )}

                        {index < comments.length - 1 && <Box sx={{ borderBottom: 1, borderColor: 'divider', mx: 2 }} />}
                    </React.Fragment>
                ))}
            </List>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: { minWidth: 120 }
                }}
            >
                <MenuItem onClick={handleReport} sx={{ color: 'error.main' }}>
                    <ReportOutlined sx={{ fontSize: 16, mr: 1 }} />
                    신고하기
                </MenuItem>
                <MenuItem onClick={handleNote} sx={{ color: 'text.secondary' }}>
                    <PersonOutlineOutlined sx={{ fontSize: 16, mr: 1 }} />
                    쪽지 보내기
                </MenuItem>
            </Menu>
        </>
    )
}

export default CommentList