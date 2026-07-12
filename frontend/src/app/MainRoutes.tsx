import { lazy } from "react"
import { Route, Routes } from "react-router-dom"

const Home = lazy(()=>import('../pages/Home'))
const Signup = lazy(()=>import("../features/auth/pages/Signup"))
const Login = lazy(()=>import("../features/auth/pages/Login"))
const VerifyOtp = lazy(()=>import("../features/auth/pages/VerifyOtp"))
const ForgotPassword = lazy(()=>import("../features/auth/pages/ForgotPassword"))
const VerifyForgotOtp = lazy(()=>import("../features/auth/pages/VerifyForgotOtp"))
const ResetPassword = lazy(()=>import("../features/auth/pages/ResetPassword"))

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/verify-otp" element={<VerifyOtp/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/verify-forgot-otp" element={<VerifyForgotOtp/>} />
      <Route path="/reset-password" element={<ResetPassword/>} />
    </Routes>
  )
}

export default MainRoutes