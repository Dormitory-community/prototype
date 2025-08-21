"use client"

import { useState } from "react"
import { X, Megaphone } from "lucide-react"
import {
    Box,
    Alert,
    IconButton,
    Typography,
    useTheme,
    alpha
} from "@mui/material"

export function NotificationBanner() {
    const [isVisible, setIsVisible] = useState(true)
    const theme = useTheme()

    if (!isVisible) return null

    return (
        <Alert
            icon={<Megaphone style={{ width: 16, height: 16 }} />}
            sx={{
                borderRadius: 0,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                borderLeft: 0,
                borderRight: 0,
                '& .MuiAlert-message': {
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }
            }}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
            }}>
                <Typography variant="body2">
                    <strong>연합생활관 게시판 런칭</strong>
                    <br/>
                    이제 함께 소통할 수 있는 공간을 열어보세요!
                </Typography>
                <IconButton
                    size="small"
                    onClick={() => setIsVisible(false)}
                    sx={{
                        ml: 2,
                        p: 0.5,
                        '&:hover': {
                            bgcolor: 'transparent'
                        }
                    }}
                >
                    <X style={{ width: 16, height: 16 }} />
                </IconButton>
            </Box>
        </Alert>
    )
}