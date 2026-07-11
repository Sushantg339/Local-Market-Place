import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import OtpInput from "react-otp-input";
import LogoAnimation from "../components/LogoAnimation";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtpApiCall, signupApiCall } from "../services/signup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setToken } from "../authSlice";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Timer State
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()

  // Countdown Timer
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Format Timer
  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Verify OTP
  const submitHandler = async () => {

    if (otp.length !== 4) {
      toast.error("Please enter a valid OTP.");
      return;
    }

    setLoading(true);

    const toastId = toast.loading("Verifying OTP...");

    try {
      const res = await verifyOtpApiCall({
        ...location.state,
        otp,
      });

      toast.success(res.data.message);
      dispatch(setToken(res.data.accessToken))

      navigate("/");
    } catch (error: any) {
      toast.error(error.response.data.message || "Verification failed.");
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  // Resend OTP
  const resendOtpHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!canResend) return;

    setLoading(true);

    const toastId = toast.loading("Sending OTP...");

    try {
      await signupApiCall(location.state);

      toast.success("OTP sent successfully!");

      // Reset timer
      setTimer(120);
      setCanResend(false);
      setOtp("");
    } catch (error: any) {
      toast.error(error.response.data.message || "Unable to resend OTP.");
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-65px)] bg-linear-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center px-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* Left Side */}
        <div className="p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10">
              <h1 className="text-4xl font-bold text-gray-900">
                Verify Email
              </h1>

              <p className="mt-3 text-gray-500 leading-relaxed">
                We've sent a 4-digit verification code to your email - {location.state.email}.
                Enter it below to complete your registration.
              </p>
            </div>

            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span className="w-4"></span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="w-16! h-16! border-2 border-gray-300 rounded-xl text-2xl font-semibold text-center text-black transition-all duration-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none"
                />
              )}
            />

            <Button
              fullWidth
              variant="contained"
              disabled={otp.length !== 4 || loading}
              sx={{
                mt: 4,
                py: 1.5,
                borderRadius: "12px",
                fontSize: "16px",
                textTransform: "none",
                fontWeight: 600,
              }}
              onClick={submitHandler}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>

            <div className="mt-8 text-center">
              {!canResend ? (
                <>
                  <p className="text-gray-500">
                    Didn't receive the code?
                  </p>

                  <p className="mt-1 text-indigo-600 font-semibold">
                    Resend available in {formatTime()}
                  </p>
                </>
              ) : (
                <button
                  onClick={resendOtpHandler}
                  disabled={loading}
                  className="text-indigo-600 font-semibold hover:text-indigo-700 underline transition-colors cursor-pointer"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex bg-linear-to-br from-indigo-500 via-purple-500 to-blue-600 items-center justify-center p-10">
          <div className="w-full max-w-md">
            <LogoAnimation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;