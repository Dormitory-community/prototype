import React from "react"
import { Paper, TextField, InputAdornment, IconButton } from "@mui/material"
import { Send } from "@mui/icons-material"

type ChatInputProps = {
    value: string
    onChange: (v: string) => void
    onSend: () => void
    placeholder?: string
    disabled?: boolean
    maxRows?: number
    autoFocus?: boolean
}

const ChatInput: React.FC<ChatInputProps> = ({
                                                 value,
                                                 onChange,
                                                 onSend,
                                                 placeholder = "메시지를 입력하세요...",
                                                 disabled = false,
                                                 maxRows = 4,
                                                 autoFocus = false,
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
            elevation={3}
            sx={{
                p: 2,
                borderRadius: 0,
                borderTop: 1,
                borderColor: "divider",
                // 하단 안전 영역(safe-area)을 고려한 padding
                paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 8px)`,
                backgroundColor: "background.paper",
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
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                color="primary"
                                disabled={disabled || !value.trim()}
                                onClick={onSend}
                                sx={{
                                    backgroundColor: value.trim() && !disabled ? "primary.main" : "transparent",
                                    color: value.trim() && !disabled ? "white" : "text.disabled",
                                    '&:hover': {
                                        backgroundColor: value.trim() && !disabled ? "primary.dark" : "transparent",
                                    },
                                    '&.Mui-disabled': {
                                        backgroundColor: "transparent",
                                    },
                                }}
                            >
                                <Send />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Paper>
    )
}

export default ChatInput
