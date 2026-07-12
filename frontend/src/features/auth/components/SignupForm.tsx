import { Button, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signupApiCall } from "../services/signup";
import { IoEyeOffOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa6";

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

  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const navigate = useNavigate();

  const setRoleHandler = (role: ISignupFormData["role"]) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
  };

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    const toastId = toast.loading("Sending OTP...");

    try {
      const res = await signupApiCall(formData);

      toast.success(res.message);


      navigate("/verify-otp", {
        state: formData,
      });
    } catch (error: any) {
      toast.error(error.response.data.message || "Signup failed!");
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler} className="space-y-5">
      <TextField
        fullWidth
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={inputChangeHandler}
        autoComplete="off"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "14px",
          },
          marginBottom: 2
        }}
      />

      <TextField
        fullWidth
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={inputChangeHandler}
        autoComplete="off"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "14px",
          },
          marginBottom: 2
        }}
      />

      <TextField
        fullWidth
        label="Password"
        name="password"
        type={hidePassword ? "password" : "text"}
        value={formData.password}
        onChange={inputChangeHandler}
        autoComplete="off"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "14px",
          },
          marginBottom: 2
        }}
        // InputProps typing mismatch in this project's MUI types — cast to any
        // to allow the endAdornment usage.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <button
                type="button"
                onClick={() => setHidePassword(!hidePassword)}
                className="text-gray-500 hover:text-black transition cursor-pointer"
              >
                {hidePassword ? (
                  <IoEyeOffOutline size={22} />
                ) : (
                  <FaEye size={20} />
                )}
              </button>
            </InputAdornment>
          ),
        } as any}
      />

      {/* Role Selector */}

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Select Role
        </label>

        <div className="flex rounded-xl bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => setRoleHandler("user")}
            className={`flex-1 rounded-lg py-3 font-semibold transition-all cursor-pointer ${
              formData.role === "user"
                ? "bg-white shadow-md text-indigo-600"
                : "text-gray-600"
            }`}
          >
            User
          </button>

          <button
            type="button"
            onClick={() => setRoleHandler("worker")}
            className={`flex-1 rounded-lg py-3 font-semibold transition-all cursor-pointer ${
              formData.role === "worker"
                ? "bg-white shadow-md text-indigo-600"
                : "text-gray-600"
            }`}
          >
            Worker
          </button>
        </div>
      </div>

      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={loading}
        sx={{
          py: 1.7,
          borderRadius: "14px",
          textTransform: "none",
          fontWeight: 700,
          fontSize: 16,
          marginBottom: 2
        }}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </Button>

      <p className="text-center text-gray-500">
        Already have an account?
        <Link
          to="/login"
          className="ml-2 text-indigo-600 font-semibold hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;