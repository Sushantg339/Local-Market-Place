import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { signupApiCall } from "../services/signup";

export interface ISignupFormData {
  fullName: string;
  email: string;
  password: string;
  role: "user" | "worker";
}

const SignupForm = () => {
  const [formData, setFormData] = useState<ISignupFormData>({
    fullName: "",
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false)

  const setRoleHandler = (data: ISignupFormData["role"]): void => {
    setFormData((prev) => {
      return {
        ...prev,
        role: data,
      };
    });
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>): void =>{
    const {name, value} = e.target

    setFormData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const submitHandler = async (e: React.SubmitEvent)=>{
    e.preventDefault();
    setLoading(true)

    if(formData.password.length < 8){
      toast.error("Password must be of 8 characters")
      return
    }

    const toastId = toast.loading("Sending Otp to mail...")

    try {

      const resData = await signupApiCall(formData)
      console.log(resData);
      toast.success("Otp Sent Successfully")

    } catch (error: any) {

      console.log(error)
      toast.error(error.message)

    }finally{
      toast.dismiss(toastId)
      setLoading(false)
      setFormData({
        fullName: "",
        email: "",
        password: "",
        role: "user",
      })

    }

  }

  return (
    <div className="bg-white w-full rounded-md p-4">
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        {/* Full Name */}

        <TextField
          type="text"
          fullWidth
          variant="filled"
          placeholder="Full Name"
          required
          value={formData.fullName}
          name="fullName"
          onChange={inputChangeHandler}
        />

        {/* Email */}

        <TextField
          type="email"
          fullWidth
          variant="filled"
          placeholder="Email"
          required
          onChange={inputChangeHandler}
          value={formData.email}
          name="email"
        />
        
        {/* Password */}

        <TextField
          type="password"
          fullWidth
          variant="filled"
          placeholder="Password"
          required
          onChange={inputChangeHandler}
          value={formData.password}
          name="password"
        />

        {/* Role */}

        <div className="bg-gray-600 flex gap-2 px-6 py-2 w-fit rounded-full">
          <p
            onClick={() => setRoleHandler("user")}
            className={`${formData.role === "user" ? "bg-gray-100" : ""} px-6 py-2 rounded-full text-black cursor-pointer transition-all duration-400`}
          >
            User
          </p>
          <p
            onClick={() => setRoleHandler("worker")}
            className={`${formData.role === "worker" ? "bg-gray-100" : ""} px-6 py-2 rounded-full text-black cursor-pointer transition-all duration-400`}
          >
            Worker
          </p>
        </div>

        {/* Submit Button */}
        <Button disabled={loading} variant="contained" size="large" type="submit">
          Sign up
        </Button>

      </form>

      {/* Login Page Link */}

      <p className="text-center text-black mt-2 text-lg">
        Already have an account?{" "}
        <Link to={"/login"} className="text-blue-500">
          Log in
        </Link>
      </p>

    </div>
  );
};

export default SignupForm;
