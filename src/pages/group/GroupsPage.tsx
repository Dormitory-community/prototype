"use client"

import type React from "react"
import { Box, Container, Typography } from "@mui/material"
import StudyGroupsContent from "@/components/groupContent/StudyGroupsContent.tsx"

const GroupsPage: React.FC = () => {
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
                    그룹 모집
                </Typography>
                <Typography variant="h6" sx={{ color: "text.secondary", fontSize: { xs: "1rem", md: "1.25rem" } }}>
                    함께 성장할 스터디 그룹이나 취미 모임을 찾아보세요.
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
                <StudyGroupsContent />
            </Box>
        </Container>
    )
}

export default GroupsPage
