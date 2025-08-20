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

const SignupPage: React.FC = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const { user, signUpWithEmail, signInWithKakao, loading } = useAuth()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
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

    // 입력 유효성 검증
    const validateForm = () => {
        setError("")
        setSuccess("")

        if (!name.trim()) {
            setError("이름을 입력해주세요.")
            return false
        }
        if (!email) {
            setError("이메일을 입력해주세요.")
            return false
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setError("올바른 이메일 형식을 입력해주세요.")
            return false
        }
        if (!password) {
            setError("비밀번호를 입력해주세요.")
            return false
        }
        if (password.length < 6) {
            setError("비밀번호는 6자 이상이어야 합니다.")
            return false
        }
        if (password !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.")
            return false
        }
        return true
    }

    // 이메일 회원가입 처리
    const handleEmailSignup = async () => {
        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)
        setError("")
        setSuccess("")

        try {
            const { error } = await signUpWithEmail(email, password, name)

            if (error) {
                if (error.message.includes("User already registered")) {
                    setError("이미 등록된 이메일입니다.")
                } else if (error.message.includes("Password should be at least 6 characters")) {
                    setError("비밀번호는 6자 이상이어야 합니다.")
                } else {
                    setError("회원가입에 실패했습니다. 다시 시도해주세요.")
                }
                console.error('Signup error:', error)
            } else {
                setSuccess("회원가입이 완료되었습니다! 이메일을 확인하여 계정을 인증해주세요.")
                // 3초 후 로그인 페이지로 이동
                setTimeout(() => {
                    navigate("/sign-in")
                }, 3000)
            }
        } catch (error) {
            console.error('Signup error:', error)
            setError("회원가입 중 오류가 발생했습니다.")
        } finally {
            setIsSubmitting(false)
        }
    }

    // 카카오 회원가입 처리
    const handleKakaoSignup = async () => {
        setError("")
        try {
            const { error } = await signInWithKakao()
            if (error) {
                setError("카카오 회원가입에 실패했습니다. 다시 시도해주세요.")
                console.error('Kakao signup error:', error)
            }
            // 성공 시 OAuth 리다이렉트가 자동으로 처리됨
        } catch (error) {
            console.error('Kakao signup error:', error)
            setError("카카오 회원가입 중 오류가 발생했습니다.")
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !isSubmitting && !loading) {
            handleEmailSignup()
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
                    회원가입
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
                        계정 만들기
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
                    >
                        새 계정을 만들어 서비스를 시작하세요
                    </Typography>
                </Box>

                {/* 회원가입 폼 */}
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
                    {/* 성공 메시지 */}
                    {success && (
                        <Alert
                            severity="success"
                            sx={{
                                mb: 2.5,
                                fontSize: isMobile ? '0.8rem' : '0.875rem',
                            }}
                        >
                            {success}
                        </Alert>
                    )}

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

                    {/* 이름 입력 */}
                    <TextField
                        autoFocus={!isMobile}
                        margin="dense"
                        label="이름"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                            autoComplete: "name",
                            ...(isMobile && { style: { fontSize: '16px' } })
                        }}
                    />

                    {/* 이메일 입력 */}
                    <TextField
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
                            autoComplete: "new-password",
                            ...(isMobile && { style: { fontSize: '16px' } })
                        }}
                        helperText="비밀번호는 6자 이상이어야 합니다"
                    />

                    {/* 비밀번호 확인 입력 */}
                    <TextField
                        margin="dense"
                        label="비밀번호 확인"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                            autoComplete: "new-password",
                            ...(isMobile && { style: { fontSize: '16px' } })
                        }}
                    />

                    {/* 회원가입 버튼 */}
                    <Button
                        onClick={handleEmailSignup}
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
                        {isSubmitting ? "가입 중..." : "회원가입"}
                    </Button>

                    {/* 로그인 링크 */}
                    <Box sx={{ textAlign: "center", mb: 2.5 }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}
                        >
                            이미 계정이 있으신가요?{" "}
                            <Button
                                variant="text"
                                onClick={() => navigate("/sign-in")}
                                sx={{
                                    textTransform: "none",
                                    fontWeight: 600,
                                    fontSize: isMobile ? '0.8rem' : '0.875rem',
                                    minWidth: 'auto',
                                    p: 0.5,
                                }}
                            >
                                로그인
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

                    {/* 카카오 회원가입 버튼 */}
                    <Button
                        onClick={handleKakaoSignup}
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
                        카카오로 회원가입
                    </Button>
                </Paper>
            </Box>

            {/* 하단 여백 */}
            {isMobile && <Box sx={{ height: 20 }} />}
        </Container>
    )
}

export default SignupPage