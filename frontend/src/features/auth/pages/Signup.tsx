import SignupForm from "../components/SignupForm";
import LogoAnimation from "../components/LogoAnimation";

const Signup = () => {
  return (
    <div className="h-[calc(100vh-65px)] bg-linear-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center px-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* Left */}

        <div className="p-12 flex items-center">
          <div className="w-full">
            <h1 className="text-5xl font-bold text-gray-900">
              Create your
              <span className="text-indigo-600"> Account</span>
            </h1>

            <p className="text-gray-500 mt-3 mb-10">
              Join thousands of users and workers already using our platform.
            </p>

            <SignupForm />
          </div>
        </div>

        {/* Right */}

        <div className="hidden lg:flex items-center justify-center bg-linear-to-br from-indigo-600 via-purple-600 to-blue-600">
          <LogoAnimation />
        </div>
      </div>
    </div>
  );
};

export default Signup;