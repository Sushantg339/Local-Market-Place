import MainRoutes from "./app/MainRoutes"
import Navbar from "./components/layout/Navbar"

const App = () => {
  return (
    <div className="bg-[#0B0B0F] h-screen text-white w-screen overflow-y-auto">
      <Navbar/>
      <MainRoutes/>
    </div>
  )
}

export default App