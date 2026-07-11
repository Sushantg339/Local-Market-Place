import { lazy } from "react"
import { Route, Routes } from "react-router-dom"

const Home = lazy(()=>import('../pages/Home'))
const Signup = lazy(()=>import("../features/auth/pages/Signup"))
const Login = lazy(()=>import("../features/auth/pages/Login"))
const VerifyOtp = lazy(()=>import("../features/auth/pages/VerifyOtp"))

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/verify-otp" element={<VerifyOtp/>} />
    </Routes>
  )
}

export default MainRoutes