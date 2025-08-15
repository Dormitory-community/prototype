"use client"

import React from "react"
import {
    Box,
    TextField,
    Button,
    Stack,
    FormControlLabel,
    Checkbox,
    Typography,
} from "@mui/material"

interface ReplyFormProps {
    isOpen: boolean
    value: string
    onChange: (value: string) => void
    isAnonymous: boolean
    onAnonymousChange: (isAnonymous: boolean) => void
    onSubmit: () => void
    onCancel: () => void
}

const ReplyForm: React.FC<ReplyFormProps> = ({
                                                 isOpen,
                                                 value,
                                                 onChange,
                                                 isAnonymous,
                                                 onAnonymousChange,
                                                 onSubmit,
                                                 onCancel
                                             }) => {
    if (!isOpen) return null

    return (
        <Box
            sx={{
                p: 2.5,
                bgcolor: 'rgba(25, 118, 210, 0.04)', // 연한 파란색 배경
                borderRadius: 2,
                border: 1,
                borderColor: 'primary.light',
                borderStyle: 'dashed' // 대시 테두리로 구분감 강화
            }}
        >
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, color: 'primary.main' }}>
                💬 답글 작성하기
            </Typography>

            <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="답글을 입력하세요..."
                sx={{
                    mb: 1.5,
                    '& .MuiOutlinedInput-root': {
                        bgcolor: 'background.paper',
                        borderRadius: 1.5,
                        '&:hover': {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'primary.main',
                            },
                        },
                        '&.Mui-focused': {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'primary.main',
                                borderWidth: 2,
                            },
                        },
                    }
                }}
            />

            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isAnonymous}
                            onChange={(e) => onAnonymousChange(e.target.checked)}
                            size="small"
                            sx={{
                                color: 'text.secondary',
                                '&.Mui-checked': {
                                    color: 'primary.main'
                                }
                            }}
                        />
                    }
                    label={
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            익명으로 작성
                        </Typography>
                    }
                />
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={onCancel}
                        sx={{
                            borderRadius: 1.5,
                            textTransform: 'none',
                            fontWeight: 500,
                            px: 2,
                            color: 'text.secondary',
                            borderColor: 'grey.300',
                            '&:hover': {
                                borderColor: 'grey.400',
                                bgcolor: 'grey.50'
                            }
                        }}
                    >
                        취소
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={onSubmit}
                        disabled={!value.trim()}
                        sx={{
                            borderRadius: 1.5,
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 2,
                            boxShadow: 'none',
                            '&:hover': {
                                boxShadow: 1,
                            }
                        }}
                    >
                        등록
                    </Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default ReplyForm