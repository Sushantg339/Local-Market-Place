import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPasswordApiCall } from "../services/forgotPassword";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation()

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();


  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const toastId = toast.loading("Logging in...");

    try {
      const res = await resetPasswordApiCall({
        password: password as string,
        confirmPassword: confirmPassword as string,
        token: location.state.token
      });
      toast.success(res.message);
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
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
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
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
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
        {loading ? "Changing password..." : "Change Password"}
      </Button>

    </form>
  );
};

export default ResetPasswordForm