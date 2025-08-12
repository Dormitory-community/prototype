"use client"

import type React from "react"
import {useState} from "react"
import {
    Box,
    Button,
    Chip,
    Container,
    InputAdornment,
    Pagination,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material"
import {Add, Search} from "@mui/icons-material"
import DeliveryOrderCard from "../../components/deliveryContent/DeliveryOrderCard.tsx"
import {useNavigation} from "../../hooks/useNavigation.ts" // NEW

const DeliveryPage: React.FC = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("전체")
    const [currentPage, setCurrentPage] = useState(1)
    const { goToDeliveryWrite, goToDeliveryDetail } = useNavigation() // NEW


    const mockDeliveryOrders = [
        {
            id: "1",
            title: "맘스터치",
            organizer: "김배달",
            status: "모집중" as const,
            targetAmount: 20000,
            currentAmount: 15000,
            deadline: "마감",
            location: "A동 로비",
            deliveryFee: 3000,
            participants: ["김", "이"],
        },
        {
            id: "2",
            title: "피자헛",
            organizer: "박미자",
            status: "모집중" as const,
            targetAmount: 30000,
            currentAmount: 28000,
            deadline: "마감",
            location: "B동 1층",
            deliveryFee: 2000,
            participants: ["박", "최", "정"],
        },
        {
            id: "3",
            title: "교촌치킨",
            organizer: "이치킨",
            status: "주문중" as const,
            targetAmount: 25000,
            currentAmount: 25000,
            deadline: "마감",
            location: "C동 로비",
            deliveryFee: 2500,
            participants: ["이", "김", "박"],
        },
    ]

    const categories = ["전체", "모집중", "마감"]

    const filteredOrders = mockDeliveryOrders.filter((order) => {
        return order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.organizer.toLowerCase().includes(searchTerm.toLowerCase())
    })

    const ordersPerPage = 6
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)
    const paginatedOrders = filteredOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage)

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
        setCurrentPage(1) // Reset to first page on search
    }

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category)
        setCurrentPage(1) // Reset to first page on category change
    }

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ mb: 6 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        color: "text.primary",
                        mb: 1,
                        fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                >
                    배달 주문
                </Typography>
                <Typography variant="h6" sx={{ color: "text.secondary" }}>
                    함께 배달 주문할 사람을 찾아 배달비를 절약하세요.
                </Typography>
            </Box>

            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                mb={4}
                alignItems={{ xs: "stretch", sm: "center" }}
                justifyContent="space-between"
            >
                <TextField
                    variant="outlined"
                    placeholder="게시글 검색..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{
                        flexGrow: 1,
                        maxWidth: { sm: "400px" },
                        "& .MuiOutlinedInput-root": {
                            borderRadius: theme.shape.borderRadius,
                            backgroundColor: theme.palette.background.paper,
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search sx={{ color: "action.active" }} />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={goToDeliveryWrite} // UPDATED
                    sx={{
                        height: "56px", // Match TextField height
                        borderRadius: theme.shape.borderRadius,
                        px: 3,
                    }}
                >
                    새 게시글 작성
                </Button>
            </Stack>

            <Stack
                direction="row"
                spacing={1}
                mb={4}
                sx={{ overflowX: "auto", pb: 1, "&::-webkit-scrollbar": { display: "none" } }}
            >
                {categories.map((category) => (
                    <Chip
                        key={category}
                        label={category}
                        onClick={() => handleCategoryClick(category)}
                        color={selectedCategory === category ? "primary" : "default"}
                        variant={selectedCategory === category ? "filled" : "outlined"}
                        sx={{
                            minWidth: "fit-content",
                            px: 1,
                            py: 0.5,
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            borderRadius: 2,
                            borderColor: selectedCategory === category ? "transparent" : theme.palette.divider,
                            backgroundColor:
                                selectedCategory === category ? theme.palette.primary.main : theme.palette.background.paper,
                            color: selectedCategory === category ? theme.palette.primary.contrastText : theme.palette.text.secondary,
                            "&:hover": {
                                backgroundColor:
                                    selectedCategory === category ? theme.palette.primary.dark : theme.palette.action.hover,
                            },
                        }}
                    />
                ))}
            </Stack>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, mb: 6 }}>
                {paginatedOrders.length > 0 ? (
                    paginatedOrders.map((order) => (
                        <DeliveryOrderCard key={order.id} order={order} onClick={() => goToDeliveryDetail(order.id)} />
                    ))
                ) : (
                    <Box sx={{ textAlign: "center", py: 8, gridColumn: "1 / -1" }}>
                        <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
                            배달 주문이 없습니다
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            검색어에 해당하는 배달 주문이 없습니다.
                        </Typography>
                    </Box>
                )}
            </Box>

            {totalPages > 1 && (
                <Stack spacing={2} alignItems="center">
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        size={isMobile ? "small" : "medium"}
                        sx={{
                            "& .MuiPaginationItem-root": {
                                borderRadius: 2,
                                "&.Mui-selected": {
                                    background: "linear-gradient(45deg, #2563eb 30%, #10b981 90%)",
                                    color: "white",
                                },
                            },
                        }}
                    />
                </Stack>
            )}
        </Container>
    )
}

export default DeliveryPage
