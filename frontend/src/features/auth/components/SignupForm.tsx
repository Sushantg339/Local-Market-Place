import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const SignupForm = () => {
  return (
    <div className="bg-white w-full rounded-md p-4">
      <form className="flex flex-col gap-4">
        <TextField
          fullWidth
          variant="filled"
          placeholder="Full Name"
          required
        />
        <TextField fullWidth variant="filled" placeholder="Email" required />
        <TextField fullWidth variant="filled" placeholder="Password" required />
        <div className="bg-gray-600 flex gap-2 px-6 py-2 w-fit rounded-full">
          <p className="bg-gray-100 px-6 py-2 rounded-full text-black cursor-pointer">
            User
          </p>
          <p className=" p-2 rounded-full px-6 py-2 text-black cursor-pointer">
            Worker
          </p>
        </div>
        <Button variant="contained" size="large">
          Sign up
        </Button>
      </form>

      <p className="text-center text-black mt-2 text-lg">Already have an account? <Link to={"/login"} className="text-blue-500">Log in</Link ></p>
    </div>
  );
};

export default SignupForm;
