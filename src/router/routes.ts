import type React from "react"

// Define a type for your application routes for better type safety
export type AppRoute =
    | "home"
    | "boards" // 통합 게시판 라우트 추가
    | "groups" // 그룹 모집 라우트 타입 추가
    | "groupDetail"
    | "groupWrite"
    | "counselingDetail"
    | "freeboardDetail"
    | "delivery"
    | "deliveryWrite"
    | "deliveryDetail" // Added deliveryDetail route type
    | "notices"
    | "login"
    | "mypage"
    | "error"
    | "boardWrite" // Unified write route type

// Define the structure for navigation items
interface AppNavigationItem {
    name: string
    path: string
    icon: React.ElementType // For Material-UI Icons
    route: AppRoute
    isAuthRequired: boolean
}
import {
    Home,
    Dashboard, // 게시판 아이콘으로 Dashboard 사용
    ShoppingCart,
    Notifications,
    Person,
    ErrorOutline,
    Groups, // 그룹 모집 아이콘 추가
} from "@mui/icons-material"

export const ROUTES = {
    LANDING: "/",
    MY_PAGE: "/my-page",
    BOARDS: "/boards", // 통합 게시판 라우트 추가
    GROUPS: "/groups", // 그룹 모집 라우트 추가
    GROUP_DETAIL: "/groups/:id",
    GROUP_WRITE: "/groups/write",
    COUNSELING_DETAIL: "/counseling/:id",
    BOARD_WRITE: "/write/:type",
    FREE_BOARD_DETAIL: "/board/:id",
    DELIVERY: "/delivery",
    DELIVERY_WRITE: "/delivery/write",
    DELIVERY_DETAIL: "/delivery/:id",
    NOTICES: "/notices",
    LOGIN: "/login",
    ERROR: "/404",
} as const

export const appNavigationItems: AppNavigationItem[] = [
    { name: "홈", path: ROUTES.LANDING, icon: Home, route: "home", isAuthRequired: false },
    { name: "게시판", path: ROUTES.BOARDS, icon: Dashboard, route: "boards", isAuthRequired: false }, // 통합 게시판 항목
    { name: "그룹 모집", path: ROUTES.GROUPS, icon: Groups, route: "groups", isAuthRequired: false }, // 그룹 모집 항목 추가
    { name: "배달주문", path: ROUTES.DELIVERY, icon: ShoppingCart, route: "delivery", isAuthRequired: false },
    { name: "공지사항", path: ROUTES.NOTICES, icon: Notifications, route: "notices", isAuthRequired: false },
    { name: "마이페이지", path: ROUTES.MY_PAGE, icon: Person, route: "mypage", isAuthRequired: true },
    { name: "404 오류", path: ROUTES.ERROR, icon: ErrorOutline, route: "error", isAuthRequired: false },
]
