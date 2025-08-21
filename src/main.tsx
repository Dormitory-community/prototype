import React from "react"
import ReactDOM from "react-dom/client"
import CssBaseline from "@mui/material/CssBaseline"
import { CustomThemeProvider } from "@/contexts/ThemeContext"
import "./index.css"
import { AuthProvider } from "./contexts/AuthContext.tsx"
import { routes } from "@/router/Routes"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { usePWA } from "./hooks/usePWA"

const router = createBrowserRouter(routes, {
    future: { v7_startTransition: true } as any
})

function Main() {
    // Register the service worker
    usePWA()

    // Register service worker for PWA functionality
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch(error => {
                    console.error('Service Worker registration failed:', error);
                });
        });
    }

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
