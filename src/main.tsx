import React from "react"
import ReactDOM from "react-dom/client"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { theme } from "./theme/theme"
import "./index.css"
import { AuthProvider } from "./contexts/AuthContext.tsx"
import { routes } from "@/router/Routes"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter(routes, {
    future: { v7_startTransition: true } as any
})

function Main() {
    // Register the service worker
    // usePWA()

    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                    <AuthProvider>
                        <RouterProvider router={router} />
                    </AuthProvider>
            </ThemeProvider>
        </React.StrictMode>
    )
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />)
