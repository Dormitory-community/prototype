import type React from "react"
import { Routes, Route } from "react-router-dom"
import LandingPage from "@/pages/home/LandingPage.tsx"
import MyPage from "@/pages/account/MyPage.tsx"
import NoticesPage from "@/pages/notice/NoticesPage.tsx"
import DeliveryPage from "@/pages/delivery/DeliveryPage.tsx"
import DeliveryWritePage from "@/pages/delivery/DeliveryWritePage.tsx"
import BoardWritePage from "@/pages/board/BoardWritePage.tsx" // Import unified write page
import BoardDetailPage from "@/pages/board/BoardDetailPage.tsx"
import ErrorPage from "@/pages/ErrorPage"
import BoardsPage from "@/pages/board/BoardsPage.tsx"
import GroupsPage from "@/pages/group/GroupsPage.tsx"

import { ROUTES } from "./routes"
import DeliveryDetailPage from "@/pages/delivery/DeliveryDetailPage.tsx"
import LoginPage from "@/pages/LoginPage.tsx"
import GroupDetailPage from "@/pages/group/GroupDetailPage.tsx";
import GroupWritePage from "@/pages/group/GroupWritePage.tsx";

export const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path={ROUTES.LANDING} element={<LandingPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.MY_PAGE} element={<MyPage />} />
            <Route path={ROUTES.BOARDS} element={<BoardsPage />} /> {/* 통합 게시판 라우트 */}
            <Route path={ROUTES.GROUPS} element={<GroupsPage />} />
            <Route path={ROUTES.GROUP_DETAIL} element={<GroupDetailPage />} />{" "}
            <Route path={ROUTES.GROUP_WRITE} element={<GroupWritePage />} />{" "}
            <Route path={ROUTES.FREE_BOARD_DETAIL} element={<BoardDetailPage />} />{" "}
            <Route path={ROUTES.COUNSELING_DETAIL} element={<BoardDetailPage />} />{" "}
            <Route path={ROUTES.BOARD_WRITE} element={<BoardWritePage />} />{" "}
            <Route path={ROUTES.DELIVERY} element={<DeliveryPage />} />
            <Route path={ROUTES.DELIVERY_DETAIL} element={<DeliveryDetailPage />} />
            <Route path={ROUTES.NOTICES} element={<NoticesPage />} />
            <Route path={ROUTES.DELIVERY_WRITE} element={<DeliveryWritePage />} />
            {/* 기존 개별 게시판 라우트들은 제거됨 */}
            <Route path="*" element={<ErrorPage />} /> {/* Catch-all for 404 */}
        </Routes>
    )
}
