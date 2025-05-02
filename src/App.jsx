import { AuthProvider } from './assets/context/AuthContext'
import Layout from '../src/assets/components/Layout'

function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  )
}

export default App