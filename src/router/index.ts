export const ROUTES = {
        LANDING: "/",
        MY_PAGE: "/my-page",
        MY_PAGE_POSTS: "/my-page/posts",
        MY_PAGE_COMMENTS: "/my-page/comments",
        MY_PAGE_BOOKMARKS: "/my-page/bookmarks",
        MY_PAGE_PRIVACY: "/my-page/privacy",
        MY_PAGE_MESSAGES: "/my-page/chat",
        MESSAGE_DETAIL: "/my-page/chat/:id",
        BOARDS: "/boards", // 통합 게시판 라우트 추가
        GROUPS: "/groups", // 그룹 모집 라우트 추가
        GROUP_DETAIL: "/groups/:id",
        GROUP_WRITE: "/groups/write",
        COUNSELING_DETAIL: "/counseling/:id",
        BOARD_WRITE: "/write/:type",
        BOARD_DETAIL: "/board/:id",
        NOTICES: "/notices",
        LOGIN: "/sign-in",
        SIGNUP: "/sign-up",
        ERROR: "/404",
        AUTH_CALLBACK: "/auth/callback",
        SEARCH: "/search",
} as const
