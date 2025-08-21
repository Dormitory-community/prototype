export const ROUTES = {
        LANDING: "/",
        MY_PAGE: "/my-page",
        BOARDS: "/boards", // 통합 게시판 라우트 추가
        GROUPS: "/groups", // 그룹 모집 라우트 추가
        GROUP_DETAIL: "/groups/:id",
        GROUP_WRITE: "/groups/write",
        COUNSELING_DETAIL: "/counseling/:id",
        BOARD_WRITE: "/write/:type",
        BOARD_DETAIL: "/board/:id",
        DELIVERY: "/delivery",
        DELIVERY_WRITE: "/delivery/write",
        DELIVERY_DETAIL: "/delivery/:id",
        NOTICES: "/notices",
        LOGIN: "/sign-in",
        SIGNUP: "/sign-up",
        ERROR: "/404",
        AUTH_CALLBACK: "/auth/callback",
        SEARCH: "/search",
} as const
