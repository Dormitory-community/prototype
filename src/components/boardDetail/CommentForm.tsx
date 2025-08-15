"use client"

import React from "react"
import {
    TextField,
    IconButton,
    Stack,
    Checkbox,
    Box,
    Typography,
    InputAdornment,
} from "@mui/material"
import { Send, Close } from "@mui/icons-material"

interface CommentFormProps {
    value: string
    onChange: (value: string) => void
    isAnonymous: boolean
    onAnonymousChange: (isAnonymous: boolean) => void
    onSubmit: () => void
    placeholder?: string
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
                borderTop: '1px solid #e0e0e0',
                zIndex: 100,
                bgcolor: '#FFFFFF',
                px: 0,
                py: 1,
            }}
        >
            {/* 대댓글 모드 헤더 */}
            {isReplyMode && (
                <Box sx={{ mb: 1, px: 1 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="caption" sx={{ fontSize: 12 }}>
                            <Box component="span" fontWeight="bold">@{replyToCommentAuthor}</Box> 님에게 답글
                        </Typography>
                        <IconButton
                            size="small"
                            onClick={onCancelReply}
                            sx={{ color: '#999', p: 0.5 }}
                        >
                            <Close sx={{ fontSize: 16 }} />
                        </IconButton>
                    </Stack>
                </Box>
            )}

            <Stack direction="row"
                   alignItems="flex-end"
                   spacing={1}
                   sx={{ width: '100%', maxWidth: 900, mx: 'auto' }}
            >
                <TextField
                    variant="outlined"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    size="small"
                    multiline
                    minRows={1}   // 기본 높이 작게
                    maxRows={6}   // 지나치게 커지지 않도록 제한
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment
                                position="start"
                                sx={{
                                    mr: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    // 어드온 자체 여백 줄이기
                                    '& .adornmentContent': { display: 'flex', alignItems: 'center', gap: 0.5 }
                                }}
                            >
                                <Box className="adornmentContent">
                                    <Checkbox
                                        checked={isAnonymous}
                                        onChange={(e) => onAnonymousChange(e.target.checked)}
                                        size="small"
                                        sx={{
                                            p: 0,
                                            '&.Mui-checked': { color: '#ff6b6b' },
                                            '& .MuiSvgIcon-root': { fontSize: 18 },
                                        }}
                                    />
                                    <Typography fontSize={11}>익명</Typography>
                                </Box>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end" sx={{ mr: 0, display: 'flex', alignItems: 'center' }}>
                                <IconButton
                                    onClick={onSubmit}
                                    disabled={!value.trim()}
                                    sx={{ width: 28, height: 28 }}
                                >
                                    <Send sx={{ fontSize: 16 }} />
                                </IconButton>
                            </InputAdornment>
                        ),
                        sx: {
                            '& .MuiInputBase-inputMultiline': {
                                padding: '8px 10px', // 세로/가로 패딩 조절 (작게)
                                lineHeight: 1.4,
                                fontSize: 14,
                            },
                            '& .MuiOutlinedInput-root': {
                                paddingRight: 0,
                            }
                        }
                    }}
                />
            </Stack>
        </Box>
    )
}

export default CommentForm
