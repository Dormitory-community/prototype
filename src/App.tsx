import { Layout } from "./components/Layout"
import { AppRouter } from "./router" // Import AppRouter from the router package

function App() {
    return (
        <Layout>
            <AppRouter /> {/* Render the AppRouter component */}
        </Layout>
    )
}

export default App
