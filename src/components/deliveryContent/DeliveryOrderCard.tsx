"use client"

import type React from "react"
import {
    Box,
    Card,
    CardContent,
    Typography,
    Avatar,
    Chip,
    Stack,
    useTheme,
    LinearProgress,
    Button,
} from "@mui/material"
import { ShoppingCart, AccessTime, LocationOn, AttachMoney } from "@mui/icons-material"

interface DeliveryOrder {
    id: string
    title: string
    organizer: string
    status: "모집중" | "주문중" | "완료"
    targetAmount: number
    currentAmount: number
    deadline: string
    location: string
    deliveryFee: number
    participants: string[]
}

interface DeliveryOrderCardProps {
    order: DeliveryOrder
    onClick?: () => void
}

const DeliveryOrderCard: React.FC<DeliveryOrderCardProps> = ({ order, onClick }) => {
    const theme = useTheme()

    const progress = (order.currentAmount / order.targetAmount) * 100

    const getStatusColor = (status: string) => {
        switch (status) {
            case "모집중":
                return { bgcolor: theme.palette.success.light, color: theme.palette.success.contrastText }
            case "주문중":
                return { bgcolor: theme.palette.warning.light, color: theme.palette.warning.contrastText }
            case "완료":
                return { bgcolor: theme.palette.grey[300], color: theme.palette.grey[800] }
            default:
                return { bgcolor: theme.palette.grey[300], color: theme.palette.grey[800] }
        }
    }

    const statusStyle = getStatusColor(order.status)

    return (
        <Card
            onClick={onClick}
            sx={{
                cursor: "pointer",
                borderRadius: 3,
                boxShadow: theme.shadows[1],
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                    boxShadow: theme.shadows[3],
                    transform: "translateY(-2px)",
                },
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="flex-start" justifyContent="space-between" mb={2}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar sx={{ bgcolor: theme.palette.warning.main, width: 40, height: 40 }}>
                            <ShoppingCart />
                        </Avatar>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
                                {order.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                주최자: {order.organizer}
                            </Typography>
                        </Box>
                    </Stack>
                    <Chip
                        label={order.status}
                        size="small"
                        sx={{
                            ...statusStyle,
                            fontWeight: 600,
                            fontSize: 12,
                            height: 28,
                            borderRadius: 2,
                        }}
                    />
                </Stack>

                <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                    목표 금액까지
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
                    {order.currentAmount.toLocaleString()}원 / {order.targetAmount.toLocaleString()}원
                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        height: 6,
                        borderRadius: 3,
                        mb: 3,
                        backgroundColor: theme.palette.grey[200],
                        "& .MuiLinearProgress-bar": {
                            bgcolor: theme.palette.warning.main,
                            borderRadius: 3,
                        },
                    }}
                />

                <Stack spacing={1} mb={3}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <AccessTime sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {order.deadline}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <LocationOn sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {order.location}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <AttachMoney sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            배달비: {order.deliveryFee.toLocaleString()}원
                        </Typography>
                    </Stack>
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={1}>
                        {order.participants.map((participant, index) => (
                            <Avatar
                                key={index}
                                sx={{
                                    width: 28,
                                    height: 28,
                                    bgcolor: theme.palette.warning.main,
                                    fontSize: 12,
                                    fontWeight: 600,
                                }}
                            >
                                {participant}
                            </Avatar>
                        ))}
                        <Typography variant="body2" sx={{ color: "text.secondary", ml: 1 }}>
                            {order.participants.length}명 참여
                        </Typography>
                    </Stack>

                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            bgcolor: theme.palette.warning.main,
                            color: "white",
                            px: 2,
                            py: 0.5,
                            fontSize: 12,
                            fontWeight: 600,
                            borderRadius: 2,
                            "&:hover": {
                                bgcolor: theme.palette.warning.dark,
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

export default DeliveryOrderCard
