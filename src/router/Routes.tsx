import { RouteObject } from "react-router-dom"
import LandingPage from "@/pages/home/LandingPage.tsx"
import MyPage from "@/pages/account/MyPage.tsx"
import BoardsPage from "@/pages/board/BoardsPage.tsx"
import BoardDetailPage from "@/pages/board/BoardDetailPage.tsx"
import BoardWritePage from "@/pages/board/BoardWritePage.tsx"
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
import Posts from "@/components/account/Posts.tsx";
import Comments from "@/components/account/Comments.tsx";
import Bookmarks from "@/components/account/Bookmarks"
import Privacy from "@/components/account/Privacy.tsx";
import ChatRooms from "@/pages/message/ChatRooms.tsx";
import {ROUTES} from "@/router/index.ts";
import Messages from "@/components/message/Messages.tsx";

export const routes: RouteObject[] = [
    { path: ROUTES.LANDING, element: <Layout><LandingPage /></Layout> },
    { path: ROUTES.LOGIN, element: <Layout><SignInPage /></Layout> },
    { path: ROUTES.SIGNUP, element: <Layout><SignupPage /></Layout>},
    { path: ROUTES.AUTH_CALLBACK, element: <Layout><AuthCallback /></Layout>},
    { path: ROUTES.MY_PAGE, element: <Layout><MyPage /></Layout> },
    { path: ROUTES.BOARDS, element: <Layout><BoardsPage /></Layout> },
    { path: ROUTES.BOARD_DETAIL, element: <Layout><BoardDetailPage /></Layout> },
    { path: ROUTES.BOARD_WRITE, element: <Layout><BoardWritePage /></Layout> },
    { path: ROUTES.GROUPS, element: <Layout><GroupsPage /></Layout> },
    { path: ROUTES.GROUP_DETAIL, element: <Layout><GroupDetailPage /></Layout> },
    { path: ROUTES.GROUP_WRITE, element: <Layout><GroupWritePage /></Layout> },
    { path: ROUTES.NOTICES, element: <Layout><NoticesPage /></Layout> },
    { path: ROUTES.SEARCH, element: <Layout><SearchPage /></Layout> },
    { path: ROUTES.MY_PAGE_POSTS, element: <Layout><Posts/></Layout>},
    { path: ROUTES.MY_PAGE_COMMENTS, element: <Layout><Comments/></Layout>},
    { path: ROUTES.MY_PAGE_BOOKMARKS, element: <Layout><Bookmarks/></Layout>},
    { path: ROUTES.MY_PAGE_PRIVACY, element: <Layout><Privacy/></Layout>},
    { path: ROUTES.MY_PAGE_MESSAGES, element: <Layout><ChatRooms/></Layout>},
    { path: ROUTES.MESSAGE_DETAIL, element: <Layout><Messages/></Layout>},
    { path: "*", element: <Layout><ErrorPage /></Layout> },
]
