import { lazy } from "react"
import { Route, Routes } from "react-router-dom"

const Home = lazy(()=>import('../pages/Home'))
const Signup = lazy(()=>import("../features/auth/pages/Signup"))
const Login = lazy(()=>import("../features/auth/pages/Login"))

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  )
}

export default MainRoutes