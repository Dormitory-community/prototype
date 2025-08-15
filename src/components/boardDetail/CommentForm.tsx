"use client"

import React from "react"
import {
    TextField,
    IconButton,
    Stack,
    Checkbox,
    Box,
    Typography,
} from "@mui/material"
import { Send, Close } from "@mui/icons-material"

interface CommentFormProps {
    value: string
    onChange: (value: string) => void
    isAnonymous: boolean
    onAnonymousChange: (isAnonymous: boolean) => void
    onSubmit: () => void
    placeholder?: string
    // 대댓글 모드 관련
    isReplyMode?: boolean
    replyToCommentAuthor?: string
    onCancelReply?: () => void
}

const CommentForm: React.FC<CommentFormProps> = ({
                                                     value,
                                                     onChange,
                                                     isAnonymous,
                                                     onAnonymousChange,
                                                     onSubmit,
                                                     placeholder = "댓글을 입력하세요...",
                                                     isReplyMode = false,
                                                     replyToCommentAuthor,
                                                     onCancelReply
                                                 }) => {
    return (
        <Box
            sx={{
                position: 'sticky',
                bottom: 0,
                borderTop: '1px solid #444',
                zIndex: 100,
                bgcolor: '#FFFFFF',
            }}
        >
            {/* 대댓글 모드 헤더 */}
            {isReplyMode && (
                <Box
                    sx={{
                        px: 2,
                        py: 1,
                        bgcolor: '#1#FFFFFF',
                        borderBottom: '1px solid #444'
                    }}
                >
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: 12
                            }}
                        >
                            <Box component="span" fontWeight="bold">@{replyToCommentAuthor}</Box> 님에게 답글
                        </Typography>
                        <IconButton
                            size="small"
                            onClick={onCancelReply}
                            sx={{
                                color: '#999',
                                p: 0.5
                            }}
                        >
                            <Close sx={{ fontSize: 16 }} />
                        </IconButton>
                    </Stack>
                </Box>
            )}

            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ px: 2, py: 1.5 }}
            >
                {/* 익명 체크박스 - 빨간색 */}
                <Checkbox
                    checked={isAnonymous}
                    onChange={(e) => onAnonymousChange(e.target.checked)}
                    size="small"
                    sx={{
                        p: 0,
                        '&.Mui-checked': {
                            color: '#ff6b6b' // 에브리타임 빨간색
                        },
                        '& .MuiSvgIcon-root': {
                            fontSize: 18
                        }
                    }}
                />

                {/* 입력창 */}
                <TextField
                    variant="outlined"
                    fullWidth
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    size="small"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 3,
                            fontSize: 14,
                            height: 36,
                            '&.Mui-focused fieldset': {
                                borderWidth: 1,
                            },
                        },
                        '& .MuiOutlinedInput-input': {
                            padding: '8px 12px',
                            '&::placeholder': {
                                opacity: 1
                            }
                        }
                    }}
                />

                {/* 전송 버튼 - 빨간색 */}
                <IconButton
                    onClick={onSubmit}
                    disabled={!value.trim()}
                    sx={{
                        width: 36,
                        height: 36,
                    }}
                >
                    <Send sx={{ fontSize: 18 }} />
                </IconButton>
            </Stack>
        </Box>
    )
}

export default CommentForm