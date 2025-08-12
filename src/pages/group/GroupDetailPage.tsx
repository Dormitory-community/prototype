"use client"

import type React from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
    Box,
    Container,
    Typography,
    Button,
    Chip,
    Stack,
    Card,
    CardContent,
    Avatar,
    IconButton,
    Divider,
} from "@mui/material"
import { ArrowBack, Groups, Schedule, LocationOn, Person, Favorite, Share } from "@mui/icons-material"

// 샘플 그룹 데이터
const sampleGroups = {
    1: {
        id: 1,
        title: "React 스터디 그룹",
        category: "학습",
        description: "React를 함께 공부하며 프로젝트를 진행하는 스터디 그룹입니다. 초보자도 환영합니다!",
        fullDescription: `React를 처음 시작하는 분들부터 중급자까지 함께 공부할 수 있는 스터디 그룹입니다.

매주 토요일 오후 2시에 모여서 React 공식 문서를 함께 읽고, 실습 프로젝트를 진행합니다.

현재 진행 중인 프로젝트:
- Todo 앱 만들기
- 날씨 앱 개발
- 개인 포트폴리오 사이트 제작

스터디 진행 방식:
1. 매주 정해진 분량의 React 문서 학습
2. 실습 과제 진행 및 코드 리뷰
3. 개인 프로젝트 진행 상황 공유
4. Q&A 시간

준비물: 노트북, 개발 환경 세팅`,
        members: 8,
        maxMembers: 12,
        schedule: "매주 토요일 14:00",
        location: "강남역 스터디카페",
        organizer: {
            name: "김개발",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        tags: ["React", "JavaScript", "프론트엔드", "초보환영"],
        createdAt: "2024-01-15",
    },
    2: {
        id: 2,
        title: "영어 회화 모임",
        category: "어학",
        description: "원어민과 함께하는 영어 회화 연습 모임입니다.",
        fullDescription: `원어민 강사와 함께하는 영어 회화 연습 모임입니다.

매주 수요일 저녁 7시에 모여서 다양한 주제로 영어 대화를 나눕니다.

모임 특징:
- 원어민 강사 1명과 한국인 참가자 6-8명
- 레벨별 그룹 구성 (초급, 중급, 고급)
- 매주 다른 주제로 토론 진행
- 발음 교정 및 표현 피드백 제공

주요 활동:
1. 아이스브레이킹 (10분)
2. 주제별 토론 (30분)
3. 롤플레이 활동 (15분)
4. 자유 대화 시간 (15분)

참가 조건: 기초 영어 회화 가능자`,
        members: 6,
        maxMembers: 8,
        schedule: "매주 수요일 19:00",
        location: "홍대 카페",
        organizer: {
            name: "Sarah Kim",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        tags: ["영어", "회화", "원어민", "토론"],
        createdAt: "2024-01-20",
    },
}

const GroupDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const group = id ? sampleGroups[Number.parseInt(id) as keyof typeof sampleGroups] : null

    if (!group) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                    그룹을 찾을 수 없습니다.
                </Typography>
            </Container>
        )
    }

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
            {/* 헤더 */}
            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                <IconButton onClick={handleBack} aria-label="뒤로가기">
                    <ArrowBack />
                </IconButton>
                <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
                    그룹 상세보기
                </Typography>
                <IconButton aria-label="좋아요">
                    <Favorite />
                </IconButton>
                <IconButton aria-label="공유하기">
                    <Share />
                </IconButton>
            </Stack>

            {/* 메인 카드 */}
            <Card sx={{ mb: 3, borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    {/* 그룹 기본 정보 */}
                    <Stack direction="row" alignItems="flex-start" spacing={3} mb={3}>
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: 3,
                                bgcolor: "#8b5cf6",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}
                        >
                            <Groups sx={{ color: "white", fontSize: 32 }} />
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                                {group.title}
                            </Typography>
                            <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
                                {group.description}
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                <Chip label={group.category} size="small" sx={{ bgcolor: "#8b5cf6", color: "white" }} />
                                {group.tags.map((tag) => (
                                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                                ))}
                            </Stack>
                        </Box>
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    {/* 그룹 정보 */}
                    <Stack spacing={2} mb={3}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Person sx={{ color: "text.secondary" }} />
                            <Typography variant="body1">
                                멤버 {group.members}/{group.maxMembers}명
                            </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Schedule sx={{ color: "text.secondary" }} />
                            <Typography variant="body1">{group.schedule}</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <LocationOn sx={{ color: "text.secondary" }} />
                            <Typography variant="body1">{group.location}</Typography>
                        </Stack>
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    {/* 모임장 정보 */}
                    <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                        <Avatar src={group.organizer.avatar} alt={group.organizer.name} sx={{ width: 48, height: 48 }} />
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                모임장: {group.organizer.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                {group.createdAt} 개설
                            </Typography>
                        </Box>
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    {/* 상세 설명 */}
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        상세 설명
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: "text.secondary",
                            lineHeight: 1.8,
                            whiteSpace: "pre-line",
                            mb: 4,
                        }}
                    >
                        {group.fullDescription}
                    </Typography>

                    {/* 액션 버튼 */}
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: "#8b5cf6",
                                color: "white",
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                                fontWeight: 600,
                                "&:hover": {
                                    bgcolor: "#7c3aed",
                                },
                            }}
                        >
                            참여 신청하기
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                                fontWeight: 600,
                                borderColor: "#8b5cf6",
                                color: "#8b5cf6",
                                "&:hover": {
                                    borderColor: "#7c3aed",
                                    bgcolor: "rgba(139, 92, 246, 0.04)",
                                },
                            }}
                        >
                            문의하기
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    )
}

export default GroupDetailPage
