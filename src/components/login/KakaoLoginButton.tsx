import type React from "react"
import { Button, Box, useTheme } from "@mui/material"
import { useSupabaseClient } from '@supabase/auth-helpers-react'

// 카카오 로그인 버튼 컴포넌트
interface KakaoLoginButtonProps {
    onSuccess?: () => void
    onError?: (error: any) => void
    disabled?: boolean
}

const KakaoLoginButton: React.FC<KakaoLoginButtonProps> = ({
                                                               onSuccess,
                                                               onError,
                                                               disabled = false
                                                           }) => {
    const theme = useTheme()
    const supabase = useSupabaseClient()

    // Supabase 카카오 로그인 처리
    const handleKakaoLogin = async () => {
        if (disabled) return

        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'kakao',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`
                }
            })

            if (error) {
                console.error('카카오 로그인 실패:', error)
                onError?.(error)
                return
            }

            console.log('카카오 로그인 요청 성공:', data)
            onSuccess?.()
        } catch (error) {
            console.error('카카오 로그인 오류:', error)
            onError?.(error)
        }
    }

    return (
        <Button
            onClick={handleKakaoLogin}
            disabled={disabled}
            variant="contained"
            fullWidth
            size="large"
            sx={{
                backgroundColor: '#FEE500',
                color: '#191919',
                borderRadius: theme.shape.borderRadius,
                fontWeight: 600,
                py: 1.5,
                '&:hover': {
                    backgroundColor: '#FDD835',
                },
                '&:disabled': {
                    backgroundColor: '#E0E0E0',
                    color: '#9E9E9E',
                }
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* 카카오 로고 SVG */}
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9 1.5C4.85775 1.5 1.5 4.41075 1.5 8.01C1.5 10.4302 3.09075 12.5655 5.37225 13.647L4.356 16.926C4.25775 17.2425 4.608 17.514 4.8945 17.334L8.7915 14.841C8.862 14.844 8.931 14.847 9 14.847C13.14225 14.847 16.5 11.9363 16.5 8.337C16.5 4.737 13.14225 1.5 9 1.5Z"
                        fill="#191919"
                    />
                </svg>
                카카오톡으로 3초만에 로그인
            </Box>
        </Button>
    )
}

export default KakaoLoginButton