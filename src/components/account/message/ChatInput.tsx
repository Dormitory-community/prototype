"use client"

import type React from "react"
import { Paper, TextField, InputAdornment, IconButton, type SxProps, type Theme } from "@mui/material"
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
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        // Enter (Shift+Enter으로 줄바꿈 허용)
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            if (!disabled && value.trim()) onSend()
        }
    }

    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 0,
                backgroundColor: "background.paper",
                borderTop: 1,
                borderColor: "divider",
                p: 1,
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
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                    },
                }}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    color="primary"
                                    disabled={disabled || !value.trim()}
                                    onClick={onSend}
                                    sx={{
                                        backgroundColor: value.trim() && !disabled ? "primary.main" : "transparent",
                                        color: value.trim() && !disabled ? "white" : "text.disabled",
                                        "&:hover": {
                                            backgroundColor: value.trim() && !disabled ? "primary.dark" : "transparent",
                                        },
                                        "&.Mui-disabled": {
                                            backgroundColor: "transparent",
                                        },
                                    }}
                                >
                                    <Send />
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
