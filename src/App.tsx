import { Layout } from "./components/Layout"

const App: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return <Layout>{children}</Layout>
}

export default App
