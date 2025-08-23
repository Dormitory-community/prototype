"use client"

import React from "react"
import {
    OutlinedInput,
    IconButton,
    Stack,
    Checkbox,
    Box,
    Typography,
    InputAdornment,
    FormControl,
    useTheme,
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
    const theme = useTheme()
    const isDark = theme.palette.mode === "dark"

    // 색상 변수
    const containerBg = isDark ? theme.palette.background.paper : "#FFFFFF"
    const borderTopColor = isDark ? theme.palette.divider : "#e0e0e0"
    const inputBg = isDark ? theme.palette.background.default : theme.palette.background.paper
    const inputBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"
    const placeholderColor = isDark ? theme.palette.text.secondary : "#9ca3af"
    const checkboxCheckedColor = "red"

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                borderTop: `1px solid ${borderTopColor}`,
                zIndex: 100,
                bgcolor: containerBg,
                px: 0,
                py: 1,
                // safe-area 고려
                paddingBottom: `calc(8px + env(safe-area-inset-bottom))`,
            }}
        >
            {/* 대댓글 모드 헤더 */}
            {isReplyMode && (
                <Box sx={{ mb: 1, px: 1 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="caption" sx={{ fontSize: 12, color: theme.palette.text.secondary }}>
                            <Box component="span" fontWeight="bold" sx={{ mr: 0.5 }}>
                                @{replyToCommentAuthor}
                            </Box>
                            님에게 답글
                        </Typography>
                        <IconButton
                            size="small"
                            onClick={onCancelReply}
                            sx={{
                                color: theme.palette.text.secondary,
                                p: 0.5,
                            }}
                            aria-label="cancel reply"
                        >
                            <Close sx={{ fontSize: 16 }} />
                        </IconButton>
                    </Stack>
                </Box>
            )}

            <Stack
                direction="row"
                alignItems="flex-end"
                spacing={1}
                sx={{
                    width: "100%",
                    maxWidth: 900,
                    mx: "auto",
                    px: 1,
                }}
            >
                <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        multiline
                        minRows={1}
                        maxRows={6}
                        aria-label="comment input"
                        // 줌 방지를 위한 스타일 조정
                        sx={{
                            bgcolor: inputBg,
                            borderRadius: 1.25,
                            pr: 0.5,
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: inputBorder,
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: theme.palette.action.focus || theme.palette.primary.main,
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: theme.palette.primary.main,
                                borderWidth: 1.5,
                            },
                            // 줌 방지: 16px 이상 필수
                            "& .MuiInputBase-inputMultiline": {
                                padding: "8px 10px",
                                lineHeight: 1.4,
                                fontSize: 16, // 줌 방지를 위해 16px 이상
                                color: theme.palette.text.primary,
                            },
                            "& .MuiInputBase-input": {
                                color: theme.palette.text.primary,
                            },
                            // 플레이스홀더도 16px 이상
                            "& .MuiInputBase-input::placeholder, & .MuiInputBase-inputMultiline::placeholder": {
                                color: placeholderColor,
                                opacity: 1,
                                fontSize: 16, // 줌 방지
                            },
                        }}
                        startAdornment={
                            <InputAdornment
                                position="start"
                                sx={{
                                    mr: 0,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ pl: 0.5 }}>
                                    <Checkbox
                                        checked={isAnonymous}
                                        onChange={(e) => onAnonymousChange(e.target.checked)}
                                        size="small"
                                        sx={{
                                            p: 0,
                                            mr: 0.3,
                                            "&.Mui-checked": {
                                                color: checkboxCheckedColor,
                                            },
                                            "& .MuiSvgIcon-root": { fontSize: 18 },
                                        }}
                                        inputProps={{ "aria-label": "익명 체크" }}
                                    />
                                    <Typography fontSize={12} sx={{ color: theme.palette.text.secondary }}>
                                        익명
                                    </Typography>
                                </Stack>
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end" sx={{ mr: 0, display: "flex", alignItems: "center" }}>
                                <IconButton
                                    onClick={onSubmit}
                                    disabled={!value.trim()}
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        ml: 0.5,
                                        "&.Mui-disabled": {
                                            opacity: 0.5,
                                            cursor: "default",
                                        },
                                    }}
                                    aria-label="send comment"
                                >
                                    <Send sx={{ fontSize: 16 }} />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Stack>
        </Box>
    )
}

export default CommentForm