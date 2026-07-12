import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPasswordApiCall } from "../services/forgotPassword";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const toastId = toast.loading("Logging in...");

    try {
      const res = await forgotPasswordApiCall({email: email as string});
      toast.success(res.message);
      navigate("/verify-forgot-otp", {state: {email}});
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
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        autoComplete="off"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "14px",
          },
          marginBottom: 2
        }}
      />

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
        {loading ? "Sending OTP..." : "Send OTP"}
      </Button>

    </form>
  );
};

export default ForgotPasswordForm