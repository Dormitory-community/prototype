import React from "react"
import ReactDOM from "react-dom/client"
import CssBaseline from "@mui/material/CssBaseline"
import { CustomThemeProvider } from "@/contexts/ThemeContext"
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
            {/*<ThemeProvider theme={theme}>*/}
            <CustomThemeProvider>

                <CssBaseline />
                    <AuthProvider>
                        <RouterProvider router={router} />
                    </AuthProvider>
             </ CustomThemeProvider>

        </React.StrictMode>
    )
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />)
