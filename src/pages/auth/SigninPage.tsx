"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Divider,
    useTheme,
    IconButton,
    useMediaQuery,
    Alert
} from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

const SigninPage: React.FC = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const { user, signInWithEmail, signInWithKakao, loading } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    // 이미 로그인된 경우 리다이렉트
    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user, navigate])

    // 뒤로가기 처리
    const handleGoBack = () => {
        if (window.history.length > 1) {
            navigate(-1)
        } else {
            navigate("/")
        }
    }

    // 이메일 로그인 처리
    const handleEmailLogin = async () => {
        if (!email || !password) {
            setError("이메일과 비밀번호를 모두 입력해주세요.")
            return
        }

        setIsSubmitting(true)
        setError("")

        try {
            const { error } = await signInWithEmail(email, password)

            if (error) {
                if (error.message.includes("Invalid login credentials")) {
                    setError("이메일 또는 비밀번호가 올바르지 않습니다.")
                } else if (error.message.includes("Email not confirmed")) {
                    setError("이메일 인증이 완료되지 않았습니다. 이메일을 확인해주세요.")
                } else {
                    setError("로그인에 실패했습니다. 다시 시도해주세요.")
                }
                console.error('Login error:', error)
            } else {
                // 성공 시 자동으로 리다이렉트됨 (useEffect에서 처리)
                console.log('Login successful')
            }
        } catch (error) {
            console.error('Login error:', error)
            setError("로그인 중 오류가 발생했습니다.")
        } finally {
            setIsSubmitting(false)
        }
    }

    // 카카오 로그인 처리
    const handleKakaoLogin = async () => {
        setError("")
        try {
            const { error } = await signInWithKakao()
            if (error) {
                setError("카카오 로그인에 실패했습니다. 다시 시도해주세요.")
                console.error('Kakao login error:', error)
            }
            // 성공 시 OAuth 리다이렉트가 자동으로 처리됨
        } catch (error) {
            console.error('Kakao login error:', error)
            setError("카카오 로그인 중 오류가 발생했습니다.")
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !isSubmitting && !loading) {
            handleEmailLogin()
        }
    }

    return (
        <Container
            maxWidth="sm"
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                px: isMobile ? 2 : 3,
                py: isMobile ? 1 : 3,
            }}
        >
            {/* 상단 헤더 - 뒤로가기 버튼 */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: isMobile ? 2 : 3,
                    mt: isMobile ? 1 : 0,
                }}
            >
                <IconButton
                    onClick={handleGoBack}
                    sx={{
                        mr: 1,
                        '&:hover': {
                            backgroundColor: 'action.hover',
                        }
                    }}
                    aria-label="뒤로가기"
                >
                    <ArrowBack />
                </IconButton>
                <Typography
                    variant={isMobile ? "h6" : "h5"}
                    component="h1"
                    sx={{ fontWeight: 600 }}
                >
                    로그인
                </Typography>
            </Box>

            {/* 메인 콘텐츠 */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                {/* 타이틀 섹션 */}
                <Box sx={{ mb: isMobile ? 3 : 4, textAlign: "center" }}>
                    <Typography
                        variant={isMobile ? "h5" : "h4"}
                        component="h2"
                        sx={{ fontWeight: 700, mb: 1 }}
                    >
                        환영합니다
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
                    >
                        계정에 로그인하여 서비스를 이용하세요
                    </Typography>
                </Box>

                {/* 로그인 폼 */}
                <Paper
                    elevation={isMobile ? 0 : 1}
                    sx={{
                        p: isMobile ? 3 : 4,
                        borderRadius: 2,
                        ...(isMobile && {
                            boxShadow: 'none',
                            border: `1px solid ${theme.palette.divider}`,
                        })
                    }}
                >
                    {/* 에러 메시지 */}
                    {error && (
                        <Alert
                            severity="error"
                            sx={{
                                mb: 2.5,
                                fontSize: isMobile ? '0.8rem' : '0.875rem',
                            }}
                        >
                            {error}
                        </Alert>
                    )}

                    {/* 이메일 입력 */}
                    <TextField
                        autoFocus={!isMobile}
                        margin="dense"
                        label="이메일"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isSubmitting || loading}
                        sx={{
                            mb: 2.5,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: theme.shape.borderRadius,
                                fontSize: isMobile ? '16px' : '14px',
                            }
                        }}
                        inputProps={{
                            autoComplete: "email",
                            ...(isMobile && { style: { fontSize: '16px' } })
                        }}
                    />

                    {/* 비밀번호 입력 */}
                    <TextField
                        margin="dense"
                        label="비밀번호"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isSubmitting || loading}
                        sx={{
                            mb: 2.5,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: theme.shape.borderRadius,
                                fontSize: isMobile ? '16px' : '14px',
                            }
                        }}
                        inputProps={{
                            autoComplete: "current-password",
                            ...(isMobile && { style: { fontSize: '16px' } })
                        }}
                    />

                    {/* 로그인 버튼 */}
                    <Button
                        onClick={handleEmailLogin}
                        variant="contained"
                        color="primary"
                        fullWidth
                        size={isMobile ? "large" : "large"}
                        disabled={isSubmitting || loading}
                        sx={{
                            mb: 2.5,
                            borderRadius: theme.shape.borderRadius,
                            py: isMobile ? 1.5 : 1.25,
                            fontSize: isMobile ? '1rem' : '0.875rem',
                            fontWeight: 600,
                        }}
                    >
                        {isSubmitting ? "로그인 중..." : "로그인"}
                    </Button>

                    {/* 회원가입 링크 */}
                    <Box sx={{ textAlign: "center", mb: 2.5 }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}
                        >
                            계정이 없으신가요?{" "}
                            <Button
                                onClick={() => navigate("/sign-up")}
                                variant="text"
                                sx={{
                                    textTransform: "none",
                                    fontWeight: 600,
                                    fontSize: isMobile ? '0.8rem' : '0.875rem',
                                    minWidth: 'auto',
                                    p: 0.5,
                                }}
                            >
                                회원가입
                            </Button>
                        </Typography>
                    </Box>

                    {/* 구분선 */}
                    <Divider sx={{ my: 2.5 }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}
                        >
                            또는
                        </Typography>
                    </Divider>

                    {/* 카카오 로그인 버튼 */}
                    <Button
                        onClick={handleKakaoLogin}
                        variant="contained"
                        fullWidth
                        size={isMobile ? "large" : "large"}
                        disabled={isSubmitting || loading}
                        sx={{
                            backgroundColor: '#FEE500',
                            color: '#000',
                            borderRadius: theme.shape.borderRadius,
                            py: isMobile ? 1.5 : 1.25,
                            fontSize: isMobile ? '1rem' : '0.875rem',
                            fontWeight: 600,
                            '&:hover': {
                                backgroundColor: '#FFDB00',
                            },
                            '&:disabled': {
                                backgroundColor: '#FEE50080',
                                color: '#00000060',
                            }
                        }}
                    >
                        카카오로 로그인
                    </Button>
                </Paper>
            </Box>

            {/* 하단 여백 */}
            {isMobile && <Box sx={{ height: 20 }} />}
        </Container>
    )
}

export default SigninPage