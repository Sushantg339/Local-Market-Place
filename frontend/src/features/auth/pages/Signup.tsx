import { Typography } from "@mui/material"
import SignupForm from "../components/SignupForm"

const Signup = () => {
  return (
    <div className="w-[80%] mx-auto mt-1">
        {/* Signup Form */}
        <div className="flex flex-col gap-3">
            <div >
                <Typography variant="h3" sx={{fontWeight: 600}}>
                    Sign up
                </Typography> 
                <p className="text-gray-300 mt-1">Fill the form to create your account</p>
            </div>
            <div className="w-1/2">
                <SignupForm/>
            </div>

        </div>
        {/* Signup Animation */}
        <div className="w-1/2">


        </div>
    </div>
  )
}

export default Signup