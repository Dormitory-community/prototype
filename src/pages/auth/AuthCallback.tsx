import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase.ts";
import { CircularProgress, Box, Typography, Paper, Avatar } from "@mui/material";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

const AuthCallback: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                // URL fragment에서 OAuth 토큰 처리
                const hashParams = new URLSearchParams(window.location.hash.substring(1));
                const accessToken = hashParams.get("access_token");
                const refreshToken = hashParams.get("refresh_token");

                if (accessToken) {
                    // OAuth 토큰이 있으면 Supabase에서 세션 설정
                    const { data, error } = await supabase.auth.setSession({
                        access_token: accessToken,
                        refresh_token: refreshToken || "",
                    });

                    if (error) {
                        console.error("Session setting error:", error);
                        navigate("/login");
                        return;
                    }

                    if (data.session) {
                        console.log("OAuth 로그인 성공:", data.session.user.email);
                        navigate("/");
                        return;
                    }
                }

                // 일반적인 세션 확인 (이메일 로그인 등)
                const { data, error } = await supabase.auth.getSession();

                if (error) {
                    console.error("Auth callback error:", error);
                    navigate("/sign-in");
                    return;
                }

                if (data.session) {
                    navigate("/");
                } else {
                    navigate("/sign-in");
                }
            } catch (err) {
                console.error("Callback handling error:", err);
                navigate("/sign-in");
            }
        };

        handleAuthCallback();
    }, [navigate]);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 3,
                }}
            >
                <Avatar
                    sx={{
                        bgcolor: "primary.main",
                        width: 64,
                        height: 64,
                        margin: "0 auto",
                        mb: 2,
                    }}
                >
                    <HourglassBottomIcon sx={{ fontSize: 32 }} />
                </Avatar>
                <CircularProgress
                    size={32}
                    thickness={5}
                    sx={{ color: "primary.main", mb: 2 }}
                />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    로그인 처리 중...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    잠시만 기다려주세요
                </Typography>
            </Paper>
        </Box>
    );
};

export default AuthCallback;
