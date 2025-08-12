import { useNavigate } from "react-router-dom"
import { ROUTES } from "../router/routes"

export const useNavigation = () => {
    const navigate = useNavigate()

    const goToHome = () => navigate(ROUTES.LANDING)
    const goToMyPage = () => navigate(ROUTES.MY_PAGE)
    const goToNotices = () => navigate(ROUTES.NOTICES)
    const goToDelivery = () => navigate(ROUTES.DELIVERY)

    const goToErrorPage = () => navigate("/404") // Or a specific error route

    // You can add more specific navigation functions as needed
    const goToDeliveryDetail = (id: string) => navigate(ROUTES.DELIVERY_DETAIL.replace(":id", id))
    const goToFreeBoardDetail = (id: string) => navigate(ROUTES.FREE_BOARD_DETAIL.replace(":id", id))
    const goToDeliveryWrite = () => navigate(ROUTES.DELIVERY_WRITE)
    const goToBoardWrite = (type: "free" | "info" | "counseling" | "study" = "free") =>
        navigate(ROUTES.BOARD_WRITE.replace(":type", type))
    return {
        goToHome,
        goToMyPage,
        goToNotices,
        goToDelivery,
        goToErrorPage,
        goToDeliveryDetail, // Added to return object
        goToFreeBoardDetail,
        goToDeliveryWrite,
        goToBoardWrite,

    }
}
