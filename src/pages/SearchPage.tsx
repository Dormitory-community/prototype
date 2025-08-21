import { Box, Typography, InputBase, IconButton, List } from "@mui/material"
import { ArrowBack, Search as SearchIcon } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { theme } from "@/theme/theme"

const SearchPage = () => {
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
                height: "100vh",
                px: 2,
                pt: 6,
            }}
        >
            {/* Top Bar */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ color: "inherit" }}>
                    <ArrowBack />
                </IconButton>
                <InputBase
                    autoFocus
                    placeholder="글 제목, 내용, 해시태그"
                    sx={{
                        ml: 1,
                        flex: 1,
                        color: "inherit",
                        bgcolor: theme.palette.background.paper,
                        borderRadius: 1,
                        px: 2,
                        py: 1,
                        boxShadow: 1,
                    }}
                />
                <IconButton sx={{ color: "inherit" }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* Recent Searches */}
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                최근 검색어
            </Typography>
            <List>
                <Typography sx={{ color: theme.palette.text.secondary, px: 1 }}>
                    최근 검색어가 없습니다.
                </Typography>
            </List>
        </Box>
    )
}
export default SearchPage