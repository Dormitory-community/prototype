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
                borderRadius: isMobile ? 0 : "0 0 8px 8px",
                backgroundColor: "background.paper",
                borderTop: 1,
                borderColor: "divider",
                p: isMobile ? 1.5 : 2,
                paddingBottom: isMobile
                    ? `max(12px, env(safe-area-inset-bottom, 0px))`
                    : "16px",
                ...sx,
            }}
        >
            <TextField
                fullWidth
                multiline
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
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        backgroundColor: "background.paper",
                        minHeight: isMobile ? "56px" : "60px",
                        "& input, & textarea": {
                            fontSize: isMobile ? "16px" : "14px",
                            lineHeight: 1.4,
                        },
                        "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "primary.main",
                                borderWidth: "2px",
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
                                        width: isMobile ? 36 : 40,
                                        height: isMobile ? 36 : 40,
                                        backgroundColor:
                                            value.trim() && !disabled ? "primary.main" : "transparent",
                                        color:
                                            value.trim() && !disabled ? "white" : "text.disabled",
                                        "&:hover": {
                                            backgroundColor:
                                                value.trim() && !disabled
                                                    ? "primary.dark"
                                                    : "action.hover",
                                            transform:
                                                value.trim() && !disabled && !isMobile
                                                    ? "scale(1.05)"
                                                    : "none",
                                        },
                                        "&.Mui-disabled": {
                                            backgroundColor: "transparent",
                                            color: "text.disabled",
                                        },
                                        transition: "all 0.2s ease-in-out",
                                        transform:
                                            value.trim() && !disabled ? "scale(1)" : "scale(0.9)",
                                    }}
                                >
                                    <Send sx={{ fontSize: isMobile ? 18 : 20 }} />
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
