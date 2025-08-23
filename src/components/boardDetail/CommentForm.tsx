"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
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
                                                     onCancelReply,
                                                 }) => {
    const theme = useTheme()
    const isDark = theme.palette.mode === "dark"
    const [keyboardHeight, setKeyboardHeight] = useState(0)
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
    const [isPWA, setIsPWA] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const detectPWA = () => {
            return (
                ("standalone" in window.navigator && (window.navigator as any).standalone === true) ||
                window.matchMedia("(display-mode: standalone)").matches ||
                window.matchMedia("(display-mode: fullscreen)").matches ||
                (typeof document !== "undefined" && document.referrer.includes("android-app://"))
            )
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
                // iOS Safari PWA - visualViewport 사용
                const currentHeight = visualViewport.height
                const heightDiff = initialViewportHeight - currentHeight

                if (heightDiff > 150) {
                    // 키보드가 올라온 상태 - 정확한 키보드 높이 사용
                    setKeyboardHeight(heightDiff)
                    setIsKeyboardVisible(true)

                    setTimeout(() => {
                        if (inputRef.current) {
                            inputRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
                        }
                    }, 100)
                } else {
                    setKeyboardHeight(0)
                    setIsKeyboardVisible(false)
                }
            } else {
                // Android Chrome PWA - window.innerHeight 사용
                const currentHeight = window.innerHeight
                const heightDiff = initialViewportHeight - currentHeight

                if (heightDiff > 100) {
                    // Android에서도 키보드 높이를 그대로 사용 (보정 제거)
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

        // iOS PWA용 visualViewport 리스너
        const visualViewport = (window as any).visualViewport
        if (visualViewport) {
            visualViewport.addEventListener("resize", debouncedViewportChange)
            handleViewportChange() // 초기 상태 체크
        }

        // Android 등을 위한 추가 리스너
        window.addEventListener("resize", debouncedViewportChange)

        const handleFocus = () => {
            setTimeout(handleViewportChange, 300) // 키보드 애니메이션 완료 대기
        }

        const handleBlur = () => {
            setTimeout(handleViewportChange, 300)
        }

        if (inputRef.current) {
            inputRef.current.addEventListener("focus", handleFocus)
            inputRef.current.addEventListener("blur", handleBlur)
        }

        return () => {
            clearTimeout(timeoutId)
            if (visualViewport) {
                visualViewport.removeEventListener("resize", debouncedViewportChange)
            }
            window.removeEventListener("resize", debouncedViewportChange)
            if (inputRef.current) {
                inputRef.current.removeEventListener("focus", handleFocus)
                inputRef.current.removeEventListener("blur", handleBlur)
            }
        }
    }, [])

    useEffect(() => {
        if (containerRef.current) {
            const height = containerRef.current.offsetHeight
            // CSS 변수로 실제 입력창 높이 전달
            document.documentElement.style.setProperty("--comment-form-height", `${height}px`)
        }
    }, [isReplyMode, keyboardHeight])

    // 색상 변수
    const containerBg = isDark ? theme.palette.background.paper : "#FFFFFF"
    const borderTopColor = isDark ? theme.palette.divider : "#e0e0e0"
    const inputBg = isDark ? theme.palette.background.default : theme.palette.background.paper
    const inputBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"
    const placeholderColor = isDark ? theme.palette.text.secondary : "#9ca3af"
    const checkboxCheckedColor = "red"

    return (
        <Box
            ref={containerRef}
            sx={{
                position: "fixed",
                bottom: isKeyboardVisible && keyboardHeight > 0 ? `${keyboardHeight}px` : 0,
                left: 0,
                right: 0,
                borderTop: `1px solid ${borderTopColor}`,
                zIndex: 1100,
                bgcolor: containerBg,
                px: 0,
                py: 1,
                transition: "bottom 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                paddingBottom: !isKeyboardVisible
                    ? isPWA
                        ? `calc(8px + env(safe-area-inset-bottom))`
                        : `max(8px, env(safe-area-inset-bottom))`
                    : "8px",
                paddingLeft: isPWA ? "env(safe-area-inset-left)" : 0,
                paddingRight: isPWA ? "env(safe-area-inset-right)" : 0,
                pointerEvents: "auto",
                boxShadow: isKeyboardVisible ? "0 -4px 20px rgba(0, 0, 0, 0.1)" : "0 -1px 3px rgba(0, 0, 0, 0.05)",
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
                        ref={inputRef}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        multiline
                        minRows={1}
                        maxRows={6}
                        aria-label="comment input"
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
                            "& .MuiInputBase-inputMultiline": {
                                padding: "8px 10px",
                                lineHeight: 1.4,
                                fontSize: 16, // 줌 방지를 위해 16px 이상
                                color: theme.palette.text.primary,
                                inputMode: "text",
                                autoComplete: "off",
                                autoCorrect: "off",
                                autoCapitalize: "sentences",
                            },
                            "& .MuiInputBase-input": {
                                color: theme.palette.text.primary,
                            },
                            "& .MuiInputBase-input::placeholder, & .MuiInputBase-inputMultiline::placeholder": {
                                color: placeholderColor,
                                opacity: 1,
                                fontSize: 16,
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
