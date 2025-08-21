"use client"

import type React from "react"
import { Card, CardContent, Typography, Avatar, Chip, Stack, Button, useTheme } from "@mui/material"
import { AccessTime, LocationOn, Person } from "@mui/icons-material"

interface StudyGroup {
    id: string
    title: string
    description: string
    category: string
    leader: string
    schedule: string
    location: string
    tags: string[]
    participants: string[]
    maxParticipants: number
    createdAt: string
}

interface StudyGroupCardProps {
    studyGroup: StudyGroup
    onClick?: () => void
}

const StudyGroupCard: React.FC<StudyGroupCardProps> = ({ studyGroup, onClick }) => {
    const theme = useTheme()

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "어학":
                return { bgcolor: "#10b981", color: "white" }
            case "학습":
                return { bgcolor: "#3b82f6", color: "white" }
            case "취미":
                return { bgcolor: "#f59e0b", color: "white" }
            case "운동":
                return { bgcolor: "#ef4444", color: "white" }
            case "IT/코딩":
                return { bgcolor: "#8b5cf6", color: "white" }
            case "공모전":
                return { bgcolor: "#06b6d4", color: "white" }
            case "자격증":
                return { bgcolor: "#84cc16", color: "white" }
            default:
                return { bgcolor: theme.palette.grey[300], color: theme.palette.grey[800] }
        }
    }

    const categoryStyle = getCategoryColor(studyGroup.category)

    return (
        <Card
            onClick={onClick}
            sx={{
                cursor: "pointer",
                borderRadius: 3,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    transform: "translateY(-2px)",
                },
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Header with category and date */}
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Chip
                        label={studyGroup.category}
                        size="small"
                        sx={{
                            ...categoryStyle,
                            fontWeight: 600,
                            fontSize: "0.75rem",
                            height: 24,
                            borderRadius: 1.5,
                        }}
                    />
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        {studyGroup.createdAt}
                    </Typography>
                </Stack>

                {/* Title and Description */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        color: "text.primary",
                        mb: 2,
                        fontSize: "1.1rem",
                        lineHeight: 1.3,
                    }}
                >
                    {studyGroup.title}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: "text.secondary",
                        mb: 3,
                        lineHeight: 1.5,
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        flex: 1,
                    }}
                >
                    {studyGroup.description}
                </Typography>

                {/* Details */}
                <Stack spacing={1} mb={2}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Person sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            리더: {studyGroup.leader}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <AccessTime sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {studyGroup.schedule}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <LocationOn sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {studyGroup.location}
                        </Typography>
                    </Stack>
                </Stack>

                {/* Tags */}
                <Stack direction="row" flexWrap="wrap" spacing={0.5} mb={3}>
                    {studyGroup.tags.map((tag, index) => (
                        <Chip
                            key={index}
                            label={`#${tag}`}
                            size="small"
                            sx={(theme) => ({
                                bgcolor:
                                    theme.palette.mode === "dark"
                                        ? theme.palette.grey[700]
                                        : theme.palette.grey[100],
                                color:
                                    theme.palette.mode === "dark"
                                        ? theme.palette.grey[100]
                                        : theme.palette.grey[700],
                                fontSize: "0.7rem",
                                fontWeight: 500,
                                height: 20,
                                borderRadius: 1,
                                "& .MuiChip-label": {
                                    px: 1,
                                },
                            })}
                        />
                    ))}
                </Stack>

                {/* Footer with participants and join button */}
                <Stack direction="row" alignItems="center" justifyContent="space-between" mt="auto">
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Stack direction="row" spacing={-0.5}>
                            {studyGroup.participants.slice(0, 4).map((participant, index) => (
                                <Avatar
                                    key={index}
                                    sx={{
                                        width: 28,
                                        height: 28,
                                        bgcolor: index === 0 ? "#8b5cf6" : index === 1 ? "#3b82f6" : index === 2 ? "#10b981" : "#f59e0b",
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                        border: "2px solid white",
                                    }}
                                >
                                    {participant}
                                </Avatar>
                            ))}
                            {studyGroup.participants.length > 4 && (
                                <Avatar
                                    sx={{
                                        width: 28,
                                        height: 28,
                                        bgcolor: theme.palette.grey[400],
                                        fontSize: "0.7rem",
                                        fontWeight: 600,
                                        border: "2px solid white",
                                    }}
                                >
                                    +{studyGroup.participants.length - 4}
                                </Avatar>
                            )}
                        </Stack>
                        <Typography variant="body2" sx={{ color: "text.secondary", ml: 1 }}>
                            {studyGroup.participants.length}/{studyGroup.maxParticipants}명
                        </Typography>
                    </Stack>

                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            bgcolor: "#8b5cf6",
                            color: "white",
                            px: 2.5,
                            py: 0.75,
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            borderRadius: 2,
                            textTransform: "none",
                            "&:hover": {
                                bgcolor: "#7c3aed",
                            },
                        }}
                        onClick={(e) => {
                            e.stopPropagation()
                            // Handle join action
                        }}
                    >
                        참여하기
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default StudyGroupCard
