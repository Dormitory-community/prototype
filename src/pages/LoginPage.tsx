"use client"

import type React from "react"
import { useState } from "react"
import { Container, Paper, TextField, Button, Typography, Box, useTheme } from "@mui/material"
import { useAuth } from "@/contexts/AuthContext"
import {useNavigate} from "react-router-dom";

const LoginPage: React.FC = () => {
    const theme = useTheme()
    const { login } = useAuth()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleLogin = () => {
        setError("")
        if (username === "test" && password === "password") {
            login(username)
            navigate("/")
        } else {
            setError("잘못된 사용자 이름 또는 비밀번호입니다.")
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleLogin()
        }
    }

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                    로그인
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    계정에 로그인하여 서비스를 이용하세요
                </Typography>
            </Box>

            <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
                <TextField
                    autoFocus
                    margin="dense"
                    label="사용자 이름"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                    sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: theme.shape.borderRadius } }}
                />
                <TextField
                    margin="dense"
                    label="비밀번호"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: theme.shape.borderRadius } }}
                />
                {error && (
                    <Typography color="error" variant="body2" sx={{ mb: 3 }}>
                        {error}
                    </Typography>
                )}
                <Button
                    onClick={handleLogin}
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ mb: 3, borderRadius: theme.shape.borderRadius }}
                >
                    로그인
                </Button>
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                        계정이 없으신가요?{" "}
                        <Button variant="text" sx={{ textTransform: "none", fontWeight: 600 }}>
                            회원가입
                        </Button>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    )
}

export default LoginPage
