import React from "react"
import ReactDOM from "react-dom/client"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { theme } from "./theme/theme"
import App from "./App.tsx"
import "./index.css"
import { AuthProvider } from "./contexts/AuthContext.tsx"
import { BrowserRouter } from "react-router-dom"

function Main() {
    // Register the service worker
    // usePWA()

    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline /> {/* Normalize CSS and apply theme background color */}
                <BrowserRouter>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </BrowserRouter>
            </ThemeProvider>
        </React.StrictMode>
    )
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />)
