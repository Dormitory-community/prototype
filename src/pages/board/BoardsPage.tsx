"use client"

import type React from "react"
import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Box, Container, Typography, Tabs, Tab, useMediaQuery } from "@mui/material"
import FreeBoardContent from "@/components/boardContent/FreeBoardContent.tsx"
import InfoSharingContent from "@/components/boardContent/InfoSharingContent.tsx"
import CounselingContent from "@/components/boardContent/CounselingContent.tsx"
import { theme } from "@/theme/theme.ts"

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    }
}

const BoardsPage: React.FC = () => {
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const tabMap = {
        free: 0,
        info: 1,
        counseling: 2,
    } as const

    const reverseTabMap = {
        0: "free",
        1: "info",
        2: "counseling",
    } as const

    const currentTab = searchParams.get("tab") as keyof typeof tabMap
    const value = tabMap[currentTab] ?? 0

    useEffect(() => {
        if (!currentTab || !(currentTab in tabMap)) {
            navigate("?tab=free", { replace: true })
        }
    }, [currentTab, navigate])

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        const tabKey = reverseTabMap[newValue as keyof typeof reverseTabMap]
        navigate(`?tab=${tabKey}`)
    }

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 2, md: 8 } }}>
            <Box sx={{ mb: { xs: 3, md: 6 } }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        color: "text.primary",
                        mb: 1,
                        fontSize: { xs: "1.75rem", md: "2.5rem" },
                    }}
                >
                    게시판
                </Typography>
                <Typography variant="h6" sx={{ color: "text.secondary", fontSize: { xs: "1rem", md: "1.25rem" } }}>
                    다양한 주제의 게시판에서 소통하고 정보를 얻어가세요.
                </Typography>
            </Box>

            <Box
                sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                    borderRadius: { xs: 2, md: 4 },
                    border: "1px solid",
                    borderColor: "divider",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: { xs: "600px", sm: "500px" },
                    boxShadow: { xs: "0 2px 8px rgba(0,0,0,0.1)", md: "none" },
                }}
            >
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        bgcolor: { xs: "grey.50", sm: "transparent" },
                        p: { xs: 2, sm: 3 },
                        display: "flex",
                        justifyContent: { xs: "flex-start", sm: "center" },
                    }}
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        orientation={isMobile ? "vertical" : "horizontal"}
                        variant="standard"
                        aria-label="게시판 카테고리 탭"
                        sx={{
                            width: isMobile ? "auto" : "100%",
                            maxWidth: isMobile ? "none" : "600px",
                            "& .MuiTab-root": {
                                fontWeight: 600,
                                textTransform: "none",
                                fontSize: { xs: "0.875rem", md: "1rem" },
                                alignItems: isMobile ? "flex-start" : "center",
                                textAlign: isMobile ? "left" : "center",
                                minHeight: { xs: "48px", sm: "52px" },
                                py: { xs: 1.5, sm: 2 },
                                px: { xs: 2, sm: 3 },
                                borderRadius: 1,
                                minWidth: isMobile ? "140px" : "120px",
                                wordBreak: "keep-all",
                                whiteSpace: "nowrap",
                                "&:hover": {
                                    bgcolor: "action.hover",
                                },
                            },
                            "& .MuiTabs-indicator": {
                                ...(isMobile
                                    ? {
                                        width: 3,
                                        borderRadius: "4px 0 0 4px",
                                        background: "linear-gradient(45deg, #2563eb 30%, #10b981 90%)",
                                        left: 0,
                                    }
                                    : {
                                        height: 3,
                                        borderRadius: "4px 4px 0 0",
                                        background: "linear-gradient(45deg, #2563eb 30%, #10b981 90%)",
                                        bottom: 0,
                                    }),
                            },
                            "& .MuiTabs-flexContainer": {
                                gap: { xs: 0.5, sm: 1 },
                                justifyContent: isMobile ? "flex-start" : "center",
                            },
                        }}
                    >
                        <Tab label="자유 게시판" {...a11yProps(0)} />
                        <Tab label="정보 공유" {...a11yProps(1)} />
                        <Tab label="고민 상담" {...a11yProps(2)} />
                    </Tabs>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        overflow: "hidden",
                        p: { xs: 0, sm: 0 },
                    }}
                >
                    <CustomTabPanel value={value} index={0}>
                        <FreeBoardContent />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <InfoSharingContent />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <CounselingContent />
                    </CustomTabPanel>
                </Box>
            </Box>
        </Container>
    )
}
export default BoardsPage
