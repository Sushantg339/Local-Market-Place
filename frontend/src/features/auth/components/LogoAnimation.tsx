
import { motion } from "framer-motion";
import { FaShieldAlt, FaUsers } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const LogoAnimation = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden px-10">
      {/* Background Blur */}
      <div className="absolute w-72 h-72 bg-indigo-400/30 rounded-full blur-3xl -top-10 -left-10" />
      <div className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-3xl -bottom-10 -right-10" />

      <div className="relative z-10 flex flex-col items-center text-white">
        {/* Floating Shield */}
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="w-36 h-36 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl"
        >
          <FaShieldAlt size={72} />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mt-10"
        >
          Welcome!
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-5 max-w-md text-center text-lg leading-8 text-white/80"
        >
          Join a trusted platform where users and workers connect securely,
          verify instantly, and collaborate with confidence.
        </motion.p>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-5 mt-12">
          <motion.div
            whileHover={{
              scale: 1.05,
              y: -6,
            }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-5 py-6 flex flex-col items-center"
          >
            <MdVerified size={34} />
            <p className="mt-3 text-sm font-medium">Verified</p>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.05,
              y: -6,
            }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-5 py-6 flex flex-col items-center"
          >
            <FaUsers size={30} />
            <p className="mt-3 text-sm font-medium">Community</p>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.05,
              y: -6,
            }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-5 py-6 flex flex-col items-center"
          >
            <FaShieldAlt size={30} />
            <p className="mt-3 text-sm font-medium">Secure</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LogoAnimation;