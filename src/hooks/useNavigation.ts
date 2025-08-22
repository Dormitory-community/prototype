import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/router/"

export const useNavigation = () => {
    const navigate = useNavigate()

    const goToHome = () => navigate(ROUTES.LANDING)
    const goToMyPage = () => navigate(ROUTES.MY_PAGE)
    const goToMyPosts = () => navigate(ROUTES.MY_PAGE_POSTS)
    const goToMyComments = () => navigate(ROUTES.MY_PAGE_COMMENTS)
    const goToMyBookmarks = () => navigate(ROUTES.MY_PAGE_BOOKMARKS)
    const goToMyPrivacy = () => navigate(ROUTES.MY_PAGE_PRIVACY)
    const goToNotices = () => navigate(ROUTES.NOTICES)

    const goToErrorPage = () => navigate("/404") // Or a specific error route

    // You can add more specific navigation functions as needed
    const goToBoardDetail = (id: string) => navigate(ROUTES.BOARD_DETAIL.replace(":id", id))
    const goToGroupWrite = () => navigate(ROUTES.GROUP_WRITE)
    const goToBoardWrite = (type: "free" | "info" | "counseling" | "study" = "free") =>
        navigate(ROUTES.BOARD_WRITE.replace(":type", type))
    const goToSignUp = () => navigate(ROUTES.SIGNUP)
    const goToSignIn = () => navigate(ROUTES.LOGIN)
    const goToSearch = () => navigate(ROUTES.SEARCH)

    return {
        goToHome,
        goToMyPage,
        goToMyPosts,
        goToMyComments,
        goToMyBookmarks,
        goToMyPrivacy,
        goToNotices,
        goToErrorPage,
        goToBoardDetail,
        goToGroupWrite,
        goToBoardWrite,
        goToSignUp,
        goToSignIn,
        goToSearch,
    }
}
