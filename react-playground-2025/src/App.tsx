import OwnUseRouter from './components/OwnUseRouter'
import QuickHeader from './components/Shared/QuickHeader'
import AppRoutes from './Routes'

function App() {
  return (
    <main>
      <QuickHeader />
      <AppRoutes />
      <OwnUseRouter />
    </main>
  )
}

export default App
