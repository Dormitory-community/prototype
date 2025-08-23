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
    const [isPWA, setIsPWA] = useState(false)

    useEffect(() => {
        const detectPWA = () => {
            const isStandalone =
                ("standalone" in window.navigator && (window.navigator as any).standalone === true) ||
                window.matchMedia("(display-mode: standalone)").matches ||
                window.matchMedia("(display-mode: fullscreen)").matches ||
                (typeof document !== "undefined" && document.referrer.includes("android-app://"))
            return Boolean(isStandalone)
        }
        setIsPWA(detectPWA())
    }, [])

    useEffect(() => {
        const initialViewportHeight = window.innerHeight
        const isAndroid = /Android/i.test(navigator.userAgent)
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

        let timeoutId: NodeJS.Timeout

        const handleViewportChange = () => {
            const visualViewport = (window as any).visualViewport

            if (visualViewport) {
                const currentHeight = visualViewport.height
                const heightDiff = initialViewportHeight - currentHeight

                if (heightDiff > 150) {
                    setKeyboardHeight(heightDiff)
                    setIsKeyboardVisible(true)
                } else {
                    setKeyboardHeight(0)
                    setIsKeyboardVisible(false)
                }
            } else {
                const currentHeight = window.innerHeight
                const heightDiff = initialViewportHeight - currentHeight

                if (heightDiff > 100) {
                    setKeyboardHeight(heightDiff)
                    setIsKeyboardVisible(true)
                } else {
                    setKeyboardHeight(0)
                    setIsKeyboardVisible(false)
                }
            }
        }

        const debouncedViewportChange = () => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(handleViewportChange, 50)
        }

        const visualViewport = (window as any).visualViewport
        if (visualViewport) {
            visualViewport.addEventListener("resize", debouncedViewportChange)
            visualViewport.addEventListener("scroll", debouncedViewportChange)
        }

        window.addEventListener("resize", debouncedViewportChange)

        handleViewportChange()

        return () => {
            clearTimeout(timeoutId)
            if (visualViewport) {
                visualViewport.removeEventListener("resize", debouncedViewportChange)
                visualViewport.removeEventListener("scroll", debouncedViewportChange)
            }
            window.removeEventListener("resize", debouncedViewportChange)
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

    const getBottomPosition = () => {
        if (!isKeyboardVisible) {
            return isPWA ? "env(safe-area-inset-bottom)" : "0px"
        } else {
            return `${keyboardHeight}px`
        }
    }

    return (
        <Paper
            elevation={0}
            sx={{
                position: "fixed",
                bottom: getBottomPosition(),
                left: 0,
                right: 0,
                borderRadius: 0,
                backgroundColor: "background.paper",
                borderTop: 1,
                borderColor: "divider",
                p: isMobile ? 1.5 : 2,
                zIndex: 1100,
                transition: "bottom 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                paddingBottom:
                    !isKeyboardVisible && isPWA
                        ? `calc(${isMobile ? "12px" : "16px"} + env(safe-area-inset-bottom))`
                        : isMobile
                            ? "12px"
                            : "16px",
                paddingLeft: isPWA ? `calc(${isMobile ? "12px" : "16px"} + env(safe-area-inset-left))` : undefined,
                paddingRight: isPWA ? `calc(${isMobile ? "12px" : "16px"} + env(safe-area-inset-right))` : undefined,
                pointerEvents: "auto",
                ...sx,
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <TextField
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
                        width: "100%",
                        maxWidth: 900,
                        mx: "auto",
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            backgroundColor: "background.paper",
                            "& input, & textarea": {
                                fontSize: isMobile ? "16px" : "14px",
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
                                            backgroundColor: value.trim() && !disabled ? "primary.main" : "transparent",
                                            color: value.trim() && !disabled ? "white" : "text.disabled",
                                            "&:hover": {
                                                backgroundColor: value.trim() && !disabled ? "primary.dark" : "action.hover",
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
