"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
    Paper,
    TextField,
    InputAdornment,
    IconButton,
    type SxProps,
    type Theme,
    useTheme,
    useMediaQuery,
    Box,
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
    const [keyboardHeight, setKeyboardHeight] = useState(0)
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

    // 키보드 높이 감지 및 레이아웃 조정
    useEffect(() => {
        const handleViewportChange = () => {
            const visualViewport = (window as any).visualViewport
            if (!visualViewport) return

            const currentHeight = visualViewport.height
            const windowHeight = window.innerHeight
            const heightDiff = windowHeight - currentHeight

            if (heightDiff > 150) { // 키보드가 올라온 상태
                setKeyboardHeight(heightDiff)
                setIsKeyboardVisible(true)
            } else { // 키보드가 내려간 상태
                setKeyboardHeight(0)
                setIsKeyboardVisible(false)
            }
        }

        // iOS PWA용 viewport 리스너
        const visualViewport = (window as any).visualViewport
        if (visualViewport) {
            visualViewport.addEventListener('resize', handleViewportChange)
            visualViewport.addEventListener('scroll', handleViewportChange)
            // 초기 상태 체크
            handleViewportChange()
        }

        // 추가적인 키보드 감지 (Android 등)
        const handleResize = () => {
            // 짧은 지연 후 실행하여 iOS 애니메이션 완료 대기
            setTimeout(handleViewportChange, 100)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            if (visualViewport) {
                visualViewport.removeEventListener('resize', handleViewportChange)
                visualViewport.removeEventListener('scroll', handleViewportChange)
            }
            window.removeEventListener('resize', handleResize)
        }
    }, [])

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
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                borderRadius: 0,
                backgroundColor: "background.paper",
                borderTop: 1,
                borderColor: "divider",
                p: isMobile ? 1.5 : 2,
                zIndex: 1100, // 높은 z-index로 스크롤과 분리
                // 키보드 상태에 따른 동적 위치 조정
                transform: isKeyboardVisible && keyboardHeight > 0
                    ? `translateY(-${keyboardHeight}px)`
                    : 'translateY(0)',
                transition: 'transform 0.3s ease-out', // 부드러운 애니메이션
                // safe-area 고려 (키보드가 없을 때만)
                paddingBottom: !isKeyboardVisible
                    ? `calc(${isMobile ? '12px' : '16px'} + env(safe-area-inset-bottom))`
                    : isMobile ? '12px' : '16px',
                // 스크롤 영역에서 완전히 분리
                pointerEvents: 'auto',
                ...sx,
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <TextField
                // fullWidth
                multiline
                minRows={1}
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
                    width: "100%",          // 부모 폭의 100%이지만
                    maxWidth: 900,
                    mx: "auto",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        backgroundColor: "background.paper",
                        "& input, & textarea": {
                            fontSize: isMobile ? "16px" : "14px", // 16px로 줌 방지
                            lineHeight: 1.4,
                            padding: "8px 10px",
                        },
                        "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "primary.main",
                                borderWidth: "1.5px",
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
                                        width: isMobile ? 32 : 40,
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
            </Box>
        </Paper>
    )
}

export default ChatInput