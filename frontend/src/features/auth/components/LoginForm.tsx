import { Button, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoEyeOffOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa6";
import { loginApiCall } from "../services/login";
import { useDispatch } from "react-redux";
import { setToken } from "../authSlice";

interface ILoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [hidePassword, setHidePassword] = useState(true);

  const [formData, setFormData] = useState<ILoginFormData>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch()

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

    setLoading(true);

    const toastId = toast.loading("Logging in...");

    try {
      const res = await loginApiCall(formData);

      toast.success(res.data.message);

      dispatch(setToken(res.data.accessToken))

      navigate("/");
    } catch (error: any) {
      toast.error(error.response.data.message || "Login failed.");
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler} className="space-y-5">
      {/* Email */}

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

      {/* Password */}

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

      {/* Forgot Password */}

      <div className="flex justify-end">
        <Link
          to="/forgot-password"
          className="text-sm text-indigo-600 hover:underline font-medium"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Login Button */}

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
          marginBottom: 1
        }}
      >
        {loading ? "Signing In..." : "Sign In"}
      </Button>

      {/* Signup Link */}

      <p className="text-center text-gray-500">
        Don't have an account?
        <Link
          to="/signup"
          className="ml-2 text-indigo-600 font-semibold hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
