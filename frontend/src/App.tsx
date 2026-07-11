import MainRoutes from "./app/MainRoutes"
import Footer from "./components/layout/Footer"
import Navbar from "./components/layout/Navbar"

const App = () => {
  return (
    <div className="bg-[#0B0B0F] h-screen text-white w-screen overflow-y-auto">
      <Navbar/>
      <main className="min-h-[calc(100vh-65px)]">
        <MainRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default App