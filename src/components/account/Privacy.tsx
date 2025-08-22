"use client"

import React, { useState } from "react"
import { useNavigation } from "@/hooks/useNavigation"
import {
    Box,
    Container,
    Typography,
    IconButton,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
} from "@mui/material"
import { ArrowBack, Person, Shield, Description, Warning, ChevronRight } from "@mui/icons-material"
import type { User } from "@/types"

const Privacy: React.FC = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)

    const [showPasswordModal, setShowPasswordModal] = useState(false)
    const [passwordLoading, setPasswordLoading] = useState(false)
    const [newPassword, setNewPassword] = useState("")

    const {goToMyPage, goToSignIn} = useNavigation()

    const handleChangePassword = async () => {
        setPasswordLoading(true)
        try {
            // TODO: 실제 비밀번호 변경 API 호출
            await new Promise((resolve) => setTimeout(resolve, 2000)) // mock delay
            alert("비밀번호가 성공적으로 변경되었습니다.")
            setShowPasswordModal(false)
            setNewPassword("")
        } catch (error) {
            console.error("비밀번호 변경 오류:", error)
            alert("비밀번호 변경 중 오류가 발생했습니다.")
        } finally {
            setPasswordLoading(false)
        }
    }

    // Mock User Data
    const currentUser: User = {
        id: "user-123",
        name: "김기숙",
        email: "kim.gisuk@example.com",
        studentId: "2024001234",
        avatar: "/default-profile.webp",
    }

    // 로그인 방식 판별
    const getLoginMethod = () => {
        // Mock data - 실제로는 user 객체에서 가져와야 함
        return "이메일 로그인"
    }

    const getLastLoginTime = () => {
        // Mock data - 실제로는 user 객체에서 가져와야 함
        return new Date().toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    // 회원 탈퇴 처리
    const handleDeleteAccount = async () => {
        setDeleteLoading(true)
        try {
            // TODO: 실제 계정 삭제 API 호출
            await new Promise((resolve) => setTimeout(resolve, 2000)) // Mock delay
            goToSignIn()
        } catch (error) {
            console.error("계정 삭제 중 오류:", error)
            alert("계정 삭제 중 오류가 발생했습니다.")
        } finally {
            setDeleteLoading(false)
            setShowDeleteModal(false)
        }
    }

    const accountInfo = [
        { label: "이메일", value: currentUser.email },
        { label: "로그인 방식", value: getLoginMethod() },
        { label: "마지막 로그인", value: getLastLoginTime() },
    ]

    const privacyItems = [
        {
            label: "개인정보 처리방침",
            description: "개인정보 수집 및 이용에 대한 정책",
            icon: <Description />,
            action: () => {
                alert("개인정보 처리방침 페이지로 이동합니다.")
            },
        },
        {
            label: "앱 내 권한 안내",
            description: "위치, 카메라 등 앱 권한 설명",
            icon: <Shield />,
            action: () => {
                alert("앱 권한 안내 페이지로 이동합니다.")
            },
        },
    ]

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <IconButton onClick={goToMyPage} sx={{ mr: 1 }}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary" }}>
                    개인정보 및 보안
                </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* 계정 정보 */}
                <Card sx={{ borderRadius: 2 }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                            <Person sx={{ color: "primary.main", mr: 2 }} />
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                계정 정보
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {accountInfo.map(({ label, value }) => (
                                <Box key={label} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                        {label}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {value}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                </Card>

                {/* 개인정보 및 권한 */}
                <Card sx={{ borderRadius: 2 }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                            <Shield sx={{ color: "success.main", mr: 2 }} />
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                개인정보 및 권한
                            </Typography>
                        </Box>

                        <List sx={{ p: 0 }}>
                            {privacyItems.map(({ label, description, icon, action }, index) => (
                                <React.Fragment key={label}>
                                    <ListItem
                                        button
                                        onClick={action}
                                        sx={{
                                            borderRadius: 1,
                                            "&:hover": {
                                                backgroundColor: "action.hover",
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: "text.secondary" }}>{icon}</ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                    {label}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                                    {description}
                                                </Typography>
                                            }
                                        />
                                        <ChevronRight sx={{ color: "text.secondary" }} />
                                    </ListItem>
                                    {index < privacyItems.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    </CardContent>
                </Card>

                {/* 계정 관리 */}
                <Card sx={{ borderRadius: 2 }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                            <Warning sx={{ color: "error.main", mr: 2 }} />
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                계정 관리
                            </Typography>
                        </Box>

                        {/* 비밀번호 변경 */}
                        <ListItem
                            button
                            onClick={() => setShowPasswordModal(true)}
                            sx={{
                                borderRadius: 1,
                                "&:hover": {
                                    backgroundColor: "action.hover",
                                },
                            }}
                        >
                            <ListItemText
                                primary={<Typography variant="body1" sx={{ fontWeight: 500 }}>비밀번호 변경</Typography>}
                                secondary={<Typography variant="body2" sx={{ color: "text.secondary" }}>새로운 비밀번호로 업데이트합니다</Typography>}
                            />
                        </ListItem>
                        <Divider sx={{ my: 1 }} />

                        {/* 회원 탈퇴 */}
                        <ListItem
                            button
                            onClick={() => setShowDeleteModal(true)}
                            sx={{
                                borderRadius: 1,
                                "&:hover": {
                                    backgroundColor: "error.light",
                                    "& .MuiTypography-root": { color: "error.contrastText" },
                                },
                            }}
                        >
                            <ListItemText
                                primary={
                                    <Typography variant="body1" sx={{ fontWeight: 500, color: "error.main" }}>
                                        회원 탈퇴
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="body2" sx={{ color: "error.main", opacity: 0.7 }}>
                                        계정 및 모든 데이터가 영구적으로 삭제됩니다
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </CardContent>
                </Card>
            </Box>

            {/* 비밀번호 변경 모달 */}
            <Dialog open={showPasswordModal} onClose={() => setShowPasswordModal(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ textAlign: "center", pt: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        비밀번호 변경
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ textAlign: "center", pb: 2 }}>
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                        새로운 비밀번호를 입력하세요.
                    </Typography>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="새 비밀번호"
                        style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 3, gap: 1 }}>
                    <Button onClick={() => setShowPasswordModal(false)} variant="outlined" fullWidth disabled={passwordLoading}>
                        취소
                    </Button>
                    <Button onClick={handleChangePassword} variant="contained" color="primary" fullWidth disabled={passwordLoading || !newPassword}>
                        {passwordLoading ? "처리 중..." : "변경하기"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default Privacy
