"use client"

import { Clock } from "lucide-react"
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Typography,
    Chip,
    Divider,
} from "@mui/material"
import {theme} from "@/theme/theme.ts";

export function RecentActivity() {

    const activities = [
        {
            id: 1,
            type: "post",
            title: "효율적인 알고리즘 스터디 방법 공유",
            category: "자유게시판",
        },
        {
            id: 2,
            type: "post",
            title: "사이드 프로젝트 팀원 모집합니다",
            category: "그룹 모집",
        },
        {
            id: 3,
            type: "post",
            title: "개발자 취업 면접 후기 및 팁",
            category: "정보 공유",
        },
        {
            id: 4,
            type: "post",
            title: "개발 환경 설정 완벽 가이드",
            category: "고민 상담",
        },
    ]

    return (
        <Card>
            <CardHeader
                title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Clock style={{ width: 20, height: 20, color: theme.palette.primary.main }} />
                        <Typography variant="h6" component="span">최근 게시글</Typography>
                    </Box>
                }
                sx={{ pb: 2 }}
            />
            <CardContent sx={{ pt: 0 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {activities.map((activity, index) => (
                        <Box key={activity.id}>
                            <Box sx={{
                                display: 'flex',
                                gap: 1.5,
                                py: 1,
                                width: '100%',
                                minWidth: 0,
                                alignItems: 'center' // 중앙 정렬 추가
                            }}>
                                {/* 이 Box가 공간을 채우고, 자식 요소의 오버플로우를 관리합니다. */}
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5,
                                    mb: 0.5,
                                    flexGrow: 1, // 이 박스가 남는 공간을 모두 차지하도록 함
                                    minWidth: 0, // 중요: flex item이 내용물보다 작아질 수 있도록 허용
                                }}>
                                    <Chip
                                        label={activity.category}
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            fontSize: '0.75rem',
                                            flexShrink: 0,
                                        }}
                                    />
                                    {/* 이 Typography 컴포넌트가 ... 처리를 담당합니다. */}
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            flexGrow: 1, // Typography가 남은 공간을 모두 차지하도록 함
                                            minWidth: 0, // 중요: flex item이 넘치는 텍스트를 숨길 수 있도록 허용
                                        }}
                                    >
                                        {activity.title}
                                    </Typography>
                                </Box>
                            </Box>
                            {index < activities.length - 1 && <Divider />}
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    )
}
