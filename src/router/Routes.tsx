import { RouteObject } from "react-router-dom"
import LandingPage from "@/pages/home/LandingPage.tsx"
import MyPage from "@/pages/account/MyPage.tsx"
import BoardsPage from "@/pages/board/BoardsPage.tsx"
import BoardDetailPage from "@/pages/board/BoardDetailPage.tsx"
import BoardWritePage from "@/pages/board/BoardWritePage.tsx"
import DeliveryPage from "@/pages/delivery/DeliveryPage.tsx"
import DeliveryDetailPage from "@/pages/delivery/DeliveryDetailPage.tsx"
import DeliveryWritePage from "@/pages/delivery/DeliveryWritePage.tsx"
import NoticesPage from "@/pages/notice/NoticesPage.tsx"
import SignInPage from "@/pages/auth/SigninPage.tsx"
import GroupsPage from "@/pages/group/GroupsPage.tsx"
import GroupDetailPage from "@/pages/group/GroupDetailPage.tsx"
import GroupWritePage from "@/pages/group/GroupWritePage.tsx"
import ErrorPage from "@/pages/ErrorPage"
import {Layout} from "@/components/Layout.tsx";
import SignupPage from "@/pages/auth/SignupPage.tsx";
import AuthCallback from "@/pages/auth/AuthCallback.tsx";
import SearchPage from "@/pages/SearchPage.tsx";

export const routes: RouteObject[] = [
    { path: "/", element: <Layout><LandingPage /></Layout> },
    { path: "/sign-in", element: <Layout><SignInPage /></Layout> },
    { path: "/sign-up", element: <Layout><SignupPage /></Layout>},
    { path: "/auth/callback", element: <Layout><AuthCallback /></Layout>},
    { path: "/my-page", element: <Layout><MyPage /></Layout> },
    { path: "/boards", element: <Layout><BoardsPage /></Layout> },
    { path: "/board/:id", element: <Layout><BoardDetailPage /></Layout> },
    { path: "/counseling/:id", element: <Layout><BoardDetailPage /></Layout> },
    { path: "/write/:type", element: <Layout><BoardWritePage /></Layout> },
    { path: "/groups", element: <Layout><GroupsPage /></Layout> },
    { path: "/groups/:id", element: <Layout><GroupDetailPage /></Layout> },
    { path: "/groups/write", element: <Layout><GroupWritePage /></Layout> },
    { path: "/delivery", element: <Layout><DeliveryPage /></Layout> },
    { path: "/delivery/:id", element: <Layout><DeliveryDetailPage /></Layout> },
    { path: "/delivery/write", element: <Layout><DeliveryWritePage /></Layout> },
    { path: "/notices", element: <Layout><NoticesPage /></Layout> },
    { path: "/search", element: <Layout><SearchPage /></Layout> },
    { path: "*", element: <Layout><ErrorPage /></Layout> },
]
