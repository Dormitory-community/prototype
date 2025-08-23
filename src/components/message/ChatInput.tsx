"use client"

import type React from "react"
import {
    Paper,
    TextField,
    InputAdornment,
    IconButton,
    type SxProps,
    type Theme,
    useTheme,
    useMediaQuery,
} from "@mui/material"
import { Send } from "@mui/icons-material"

type ChatInputProps = {
    value: string
    onChange: (v: string) => void
    onSend: () => void
    placeholder?: string
    disabled?: boolean
    maxRows?: number
    autoFocus?: boolean
    sx?: SxProps<Theme>
}

const ChatInput: React.FC<ChatInputProps> = ({
                                                 value,
                                                 onChange,
                                                 onSend,
                                                 placeholder = "메시지를 입력하세요...",
                                                 disabled = false,
                                                 maxRows = 4,
                                                 autoFocus = false,
                                                 sx,
                                             }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            if (!disabled && value.trim()) {
                onSend()
            }
        }
    }

    const handleSend = () => {
        if (!disabled && value.trim()) {
            onSend()
        }
    }

    return (
        <Paper
            elevation={0}
            sx={{
                position: "fixed", // CommentForm처럼 고정 위치
                bottom: 0,
                left: 0,
                right: 0,
                borderRadius: 0, // 하단 고정이므로 radius 제거
                backgroundColor: "background.paper",
                borderTop: 1,
                borderColor: "divider",
                p: isMobile ? 1.5 : 2,
                paddingBottom: `calc(${isMobile ? '12px' : '16px'} + env(safe-area-inset-bottom))`, // 고정값으로 변경
                zIndex: 100, // CommentForm과 동일
                ...sx,
            }}
        >
            <TextField
                fullWidth
                multiline
                minRows={1} // CommentForm과 동일
                maxRows={maxRows}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                variant="outlined"
                autoFocus={autoFocus}
                disabled={disabled}
                size="medium"
                sx={{
                    maxWidth: 900, // CommentForm과 동일한 최대 너비
                    mx: "auto", // 중앙 정렬
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        backgroundColor: "background.paper",
                        // minHeight 제거 - 동적 높이 변경 방지
                        "& input, & textarea": {
                            fontSize: isMobile ? "16px" : "14px", // 16px로 줌 방지
                            lineHeight: 1.4,
                            padding: "8px 10px", // CommentForm과 동일한 패딩
                        },
                        "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "primary.main",
                                borderWidth: "1.5px", // CommentForm과 동일
                            },
                        },
                        ...(!isMobile && {
                            "&:hover": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "primary.light",
                                },
                            },
                        }),
                    },
                }}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    color="primary"
                                    disabled={disabled || !value.trim()}
                                    onClick={handleSend}
                                    size={isMobile ? "small" : "medium"}
                                    sx={{
                                        width: isMobile ? 32 : 40, // CommentForm과 유사한 크기
                                        height: isMobile ? 32 : 40,
                                        backgroundColor:
                                            value.trim() && !disabled ? "primary.main" : "transparent",
                                        color:
                                            value.trim() && !disabled ? "white" : "text.disabled",
                                        "&:hover": {
                                            backgroundColor:
                                                value.trim() && !disabled
                                                    ? "primary.dark"
                                                    : "action.hover",
                                        },
                                        "&.Mui-disabled": {
                                            backgroundColor: "transparent",
                                            color: "text.disabled",
                                        },
                                        transition: "all 0.2s ease-in-out",
                                    }}
                                >
                                    <Send sx={{ fontSize: isMobile ? 16 : 20 }} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
            />
        </Paper>
    )
}

export default ChatInput