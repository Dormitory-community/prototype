import React from "react"
import {
    OutlinedInput, // TextField 대신 OutlinedInput 사용
    IconButton,
    Stack,
    Checkbox,
    Box,
    Typography,
    InputAdornment,
    FormControl // FormControl 추가
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
                                                     onCancelReply
                                                 }) => {
    return (
        <Box
            sx={{
                position: 'sticky',
                bottom: 0,
                borderTop: '1px solid #e0e0e0',
                zIndex: 100,
                bgcolor: '#FFFFFF',
                px: 0,
                py: 1,
            }}
        >
            {/* 대댓글 모드 헤더 */}
            {isReplyMode && (
                <Box sx={{ mb: 1, px: 1 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="caption" sx={{ fontSize: 12 }}>
                            <Box component="span" fontWeight="bold">@{replyToCommentAuthor}</Box> 님에게 답글
                        </Typography>
                        <IconButton
                            size="small"
                            onClick={onCancelReply}
                            sx={{ color: '#999', p: 0.5 }}
                        >
                            <Close sx={{ fontSize: 16 }} />
                        </IconButton>
                    </Stack>
                </Box>
            )}

            <Stack direction="row"
                   alignItems="flex-end"
                   spacing={1}
                   sx={{ width: '100%', maxWidth: 900, mx: 'auto' }}
            >
                {/* FormControl로 OutlinedInput 감싸기 */}
                <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        size="small" // OutlinedInput에는 size prop이 없으므로 sx로 조절해야 할 수 있습니다.
                        multiline
                        minRows={1}
                        maxRows={6}
                        sx={{
                            // OutlinedInput의 스타일을 여기에 직접 적용
                            '& .MuiInputBase-inputMultiline': {
                                padding: '8px 10px',
                                lineHeight: 1.4,
                                fontSize: 14,
                            },
                        }}
                        // startAdornment와 endAdornment를 InputProps 없이 바로 전달
                        startAdornment={
                            <InputAdornment
                                position="start"
                                sx={{
                                    mr: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    '& .adornmentContent': { display: 'flex', alignItems: 'center', gap: 0.5 }
                                }}
                            >
                                <Box className="adornmentContent">
                                    <Checkbox
                                        checked={isAnonymous}
                                        onChange={(e) => onAnonymousChange(e.target.checked)}
                                        size="small"
                                        sx={{
                                            p: 0,
                                            '&.Mui-checked': { color: '#ff6b6b' },
                                            '& .MuiSvgIcon-root': { fontSize: 18 },
                                        }}
                                    />
                                    <Typography fontSize={11}>익명</Typography>
                                </Box>
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end" sx={{ mr: 0, display: 'flex', alignItems: 'center' }}>
                                <IconButton
                                    onClick={onSubmit}
                                    disabled={!value.trim()}
                                    sx={{ width: 28, height: 28 }}
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