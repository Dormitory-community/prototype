// ShareMenu.tsx
import { IconButton, Menu, MenuItem, Snackbar, Alert } from '@mui/material'
import { Share, ContentCopy, ChatBubble } from '@mui/icons-material'
import { useEffect, useState } from 'react'

interface ShareMenuProps {
    url?: string
    title?: string
    description?: string
}

const ShareMenu: React.FC<ShareMenuProps> = ({
                                                 url,
                                                 title = '이 스터디 그룹을 확인해보세요!',
                                                 description = '함께 공부하고 성장해요!'
                                             }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error'
    })
    const [currentUrl, setCurrentUrl] = useState('')

    const open = Boolean(anchorEl)

    // 클립보드 복사 및 알림
    const showSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
        setSnackbar({ open: true, message, severity })
    }
    const handleCloseSnackbar = () => setSnackbar(prev => ({ ...prev, open: false }))

    // 메뉴 열기/닫기
    const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    // URL 세팅 (SSR 안전)
    useEffect(() => {
        setCurrentUrl(url || (typeof window !== 'undefined' ? window.location.href : ''))
    }, [url])

    // Kakao SDK 초기화
    useEffect(() => {
        const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY
        if (!kakaoKey) return console.error('카카오톡 앱 키가 설정되지 않았습니다.')

        if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init(kakaoKey)
            console.log('카카오톡 SDK 초기화 완료')
        }
    }, [])

    // 링크 복사
    const handleCopy = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(currentUrl)
            } else {
                const textArea = document.createElement('textarea')
                textArea.value = currentUrl
                textArea.style.position = 'fixed'
                textArea.style.left = '-999999px'
                textArea.style.top = '-999999px'
                document.body.appendChild(textArea)
                textArea.focus()
                textArea.select()
                const successful = document.execCommand('copy')
                document.body.removeChild(textArea)
                if (!successful) throw new Error('복사 실패')
            }
            showSnackbar('URL이 복사되었습니다!')
        } catch (err) {
            console.error(err)
            showSnackbar('URL 복사에 실패했습니다.', 'error')
        }
        handleClose()
    }

    // Kakao 공유
    const handleKakaoShare = () => {
        const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent)

        if (!isMobile) {
            showSnackbar('데스크톱에서는 카카오톡 공유 대신 링크 복사를 이용해주세요.', 'error')
            handleClose()
            return
        }

        if (typeof window.Kakao === 'undefined' || !window.Kakao.isInitialized()) {
            showSnackbar('카카오톡 SDK가 초기화되지 않았습니다.', 'error')
            handleClose()
            return
        }

        window.Kakao.Share.sendDefault({
            objectType: 'text',
            text: `${title}\n\n${description}`,
            link: {
                webUrl: url ?? window.location.href,       // undefined면 현재 URL 사용
                mobileWebUrl: url ?? window.location.href // 모바일도 동일
            },
        })


        showSnackbar('카카오톡으로 공유했습니다!')
        handleClose()
    }

    const handleWebShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({ title, text: description, url })
                showSnackbar('공유했습니다!')
            } else {
                await handleCopy()
            }
        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                showSnackbar('공유에 실패했습니다.', 'error')
            }
        }
        handleClose()
    }

    return (
        <>
            <IconButton onClick={handleClick} aria-label="공유하기">
                <Share />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{ sx: { borderRadius: 2, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', minWidth: 160 } }}
            >
                {typeof navigator.share === 'function' && (
                    <MenuItem onClick={handleWebShare}>
                        <Share sx={{ mr: 1, fontSize: 20 }} /> 공유하기
                    </MenuItem>
                )}

                <MenuItem onClick={handleCopy}>
                    <ContentCopy sx={{ mr: 1, fontSize: 20 }} /> 링크 복사
                </MenuItem>
                <MenuItem onClick={handleKakaoShare}>
                    <ChatBubble sx={{ mr: 1, fontSize: 20 }} /> 카카오톡 공유
                </MenuItem>
            </Menu>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default ShareMenu
