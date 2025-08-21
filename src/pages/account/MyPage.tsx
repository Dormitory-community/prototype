"use client"

import React from "react"
import { useState } from "react"
import {
    Box,
    Container,
    Typography,
    Avatar,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button,
    useTheme,
    useMediaQuery,
} from "@mui/material"
import {Person, Article, Comment, Settings, Edit, Bookmark} from "@mui/icons-material"
import PostCard from "@/components/boardContent/PostCard.tsx"
import type {Comment as CommentType, User, PostList} from "@/types"

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
            id={`mypage-tabpanel-${index}`}
            aria-labelledby={`mypage-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ pt: 0 }}>{children}</Box>}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `mypage-tab-${index}`,
        "aria-controls": `mypage-tabpanel-${index}`,
    }
}

const MyPage: React.FC = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const [selectedTab, setSelectedTab] = useState(0)

    // Mock User Data
    const currentUser: User = {
        id: "user-123",
        name: "김기숙",
        email: "kim.gisuk@example.com",
        studentId: "2024001234",
        avatar: "/default-profile.webp",
    }

    // Mock Posts Data (from FreeBoardPage and CounselingPage)
    const myPosts: PostList[] = [
        {
            id: "1",
            title: "기숙사 생활 꿀팁 공유해요!",
            content:
                "기숙사에서 1년 넘게 살면서 터득한 생활 꿀팁들을 공유합니다. 세탁실 이용 시간대, 공부하기 좋은 장소, 야식 주문 꿀팁 등등...",
            author: currentUser,
            createdAt: new Date("2024-01-15T10:00:00"),
            updatedAt: new Date("2024-01-15T10:00:00"),
            category: "자유게시판",
            likes: 24,
            commentNumber: 1,
            tags: ["꿀팁", "생활정보", "기숙사"],
        },
        {
            id: "2",
            title: "새 학기 적응이 어려워요",
            content:
                "기숙사에 처음 들어와서 새로운 환경에 적응하기가 힘들어요. 룸메이트와도 어색하고, 수업도 어렵고, 친구 사귀는 것도 쉽지 않네요. 다들 어떻게 적응하셨나요? 조언 부탁드립니다.",
            author: currentUser,
            createdAt: new Date("2024-01-14T14:00:00"),
            updatedAt: new Date("2024-01-14T14:00:00"),
            category: "고민상담",
            likes: 12,
            commentNumber: 1,
            isAnonymous: true,
            tags: ["새학기", "적응", "룸메이트"],
        },
    ]

    // Mock Comments Data
    const myComments: CommentType[] = [
        {
            id: "comment-1",
            content: "정말 유용한 정보네요! 감사합니다",
            author: currentUser,
            createdAt: new Date("2024-01-15T10:30:00"),
            likes: 3,
            parentId: "1",
        },
        {
            id: "comment-2",
            content: "저도 처음엔 그랬어요. 시간이 지나면 괜찮아질 거예요! 동아리에 가입해보는 건 어떨까요?",
            author: currentUser,
            createdAt: new Date("2024-01-15T10:30:00"),
            likes: 3,
            parentId: "2",
        },
        {
            id: "comment-3",
            content: "솔직한 대화가 가장 중요한 것 같아요. 감정을 숨기면 오히려 더 큰 오해가 생길 수 있어요.",
            author: currentUser,
            createdAt: new Date("2024-01-13T15:00:00"),
            likes: 5,
            parentId: "3",
        },
    ]

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue)
    }

    const renderMyPosts = () => (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
            {myPosts.length > 0 ? (
                myPosts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        onClick={() => console.log("Navigate to post:", post.id)}
                        showCategory={true}
                    />
                ))
            ) : (
                <Box sx={{ textAlign: "center", py: 8, gridColumn: "1 / -1" }}>
                    <Article sx={{ fontSize: 64, color: "grey.300", mb: 2 }} />
                    <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
                        작성한 게시글이 없습니다
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        새로운 게시글을 작성해보세요.
                    </Typography>
                </Box>
            )}
        </Box>
    )

    const renderMyComments = () => (
        <List sx={{ width: "100%" }}>
            {myComments.length > 0 ? (
                myComments.map((comment, index) => (
                    <React.Fragment key={comment.id}>
                        <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                            <Avatar
                                sx={{
                                    width: 32,
                                    height: 32,
                                    background: "linear-gradient(45deg, #2563eb 30%, #10b981 90%)",
                                    mr: 2,
                                }}
                            >
                                {comment.author.name.charAt(0)}
                            </Avatar>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "text.primary" }}>
                                        {comment.author.name}
                                    </Typography>
                                }
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: "block", color: "text.secondary" }}
                                            component="span"
                                            variant="body2"
                                        >
                                            {comment.content}
                                        </Typography>
                                        <Typography
                                            sx={{ display: "block", color: "grey.500", mt: 0.5 }}
                                            component="span"
                                            variant="caption"
                                        >
                                            {new Date(comment.createdAt).toLocaleDateString("ko-KR", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        {index < myComments.length - 1 && <Divider component="li" />}
                    </React.Fragment>
                ))
            ) : (
                <Box sx={{ textAlign: "center", py: 8 }}>
                    <Comment sx={{ fontSize: 64, color: "grey.300", mb: 2 }} />
                    <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
                        작성한 댓글이 없습니다
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        다른 게시글에 댓글을 남겨보세요.
                    </Typography>
                </Box>
            )}
        </List>
    )

    const renderMyProfile = () => (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Avatar
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    sx={{
                        width: 80,
                        height: 80,
                        mr: 3,
                        background: "linear-gradient(45deg, #2563eb 30%, #10b981 90%)",
                    }}
                >
                    {!currentUser.avatar && currentUser.name.charAt(0)}
                </Avatar>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary" }}>
                        {currentUser.name}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "text.secondary", mb: 0.5 }}>
                        {currentUser.email}
                    </Typography>
                </Box>
            </Box>
            <Button variant="outlined" startIcon={<Edit />} sx={{ borderRadius: 3 }}>
                프로필 수정
            </Button>
        </Box>
    )

    const renderSettings = () => (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ color: "text.primary", mb: 2 }}>
                설정
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                설정 기능은 준비중입니다.
            </Typography>
        </Box>
    )

    const renderBookmark = () => (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
            {myPosts.length > 0 ? (
                myPosts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        onClick={() => console.log("Navigate to post:", post.id)}
                        showCategory={true}
                    />
                ))
            ) : (
                <Box sx={{ textAlign: "center", py: 8, gridColumn: "1 / -1" }}>
                    <Article sx={{ fontSize: 64, color: "grey.300", mb: 2 }} />
                    <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
                        스크랩한 게시글이 없습니다
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        게시글을 스크랩 해보세요.
                    </Typography>
                </Box>
            )}
        </Box>
    )

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
                    마이페이지
                </Typography>
                <Typography variant="h6" sx={{ color: "text.secondary", fontSize: { xs: "1rem", md: "1.25rem" } }}>
                    내 활동을 한눈에 확인하고 정보를 관리하세요.
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
                        bgcolor: { xs: "background.paper", sm: "transparent" },
                        p: { xs: 2, sm: 3 },
                        display: "flex",
                        justifyContent: { xs: "flex-start", sm: "center" },
                    }}
                >
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
                        orientation={isMobile ? "vertical" : "horizontal"}
                        variant="standard"
                        aria-label="마이페이지 탭"
                        sx={{
                            width: isMobile ? "100%" : "auto", // 이 부분을 수정했습니다.
                            maxWidth: isMobile ? "none" : "600px",
                            "& .MuiTab-root": {
                                fontSize: { xs: "0.875rem", md: "1rem" },
                                minHeight: { xs: "48px", sm: "52px" },
                                py: { xs: 1.5, sm: 2 },
                                px: { xs: 2, sm: 3 },
                                ...(isMobile && {
                                    alignItems: "flex-start",
                                    justifyContent: "flex-start",
                                    minWidth: "100%", // 탭 버튼 영역을 가득 채움
                                    textAlign: "left",
                                    "& .MuiTab-iconWrapper": {
                                        marginRight: 1,
                                        marginBottom: 0,
                                    },
                                }),
                                ...(!isMobile && {
                                    alignItems: "center",
                                    textAlign: "center",
                                    minWidth: "120px",
                                    "& .MuiTab-iconWrapper": {
                                        marginRight: 0.5,
                                        marginBottom: 0.5,
                                    },
                                }),
                            },
                            "& .MuiTabs-flexContainer": {
                                gap: { xs: 0.5, sm: 1 },
                                justifyContent: isMobile ? "flex-start" : "center",
                            },
                        }}
                    >
                        <Tab
                            label="내 게시글"
                            icon={<Article />}
                            iconPosition={isMobile ? "start" : "top"}
                            {...a11yProps(0)}
                        />
                        <Tab
                            label="내 댓글"
                            icon={<Comment />}
                            iconPosition={isMobile ? "start" : "top"}
                            {...a11yProps(1)}
                        />
                        <Tab
                            label="스크랩"
                            icon={<Bookmark />}
                            iconPosition={isMobile ? "start" : "top"}
                            {...a11yProps(2)}
                        />
                        <Tab
                            label="내 정보"
                            icon={<Person />}
                            iconPosition={isMobile ? "start" : "top"}
                            {...a11yProps(3)}
                        />
                        <Tab
                            label="설정"
                            icon={<Settings />}
                            iconPosition={isMobile ? "start" : "top"}
                            {...a11yProps(4)}
                        />
                    </Tabs>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        overflow: "hidden",
                        p: { xs: 0, sm: 0 },
                    }}
                >
                    <CustomTabPanel value={selectedTab} index={0}>
                        <Box sx={{ p: { xs: 2, md: 4 } }}>
                            {renderMyPosts()}
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={selectedTab} index={1}>
                        <Box sx={{ p: { xs: 2, md: 4 } }}>
                            {renderMyComments()}
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel index={2} value={selectedTab}>
                        <Box sx={{ p: { xs: 2, md: 4 } }}>
                            {renderBookmark()}
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={selectedTab} index={3}>
                        <Box sx={{ p: { xs: 2, md: 4 } }}>
                            {renderMyProfile()}
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={selectedTab} index={4}>
                        <Box sx={{ p: { xs: 2, md: 4 } }}>
                            {renderSettings()}
                        </Box>
                    </CustomTabPanel>
                </Box>
            </Box>
        </Container>
    )
}

export default MyPage