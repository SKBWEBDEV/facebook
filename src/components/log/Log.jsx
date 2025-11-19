import { useState } from "react";
import google from "../../assets/google.png";
import { Link, useNavigate } from "react-router";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Slide, ToastContainer, toast } from "react-toastify";
import { motion } from "motion/react";
import { useDispatch } from "react-redux";
import { userInfo } from "../slicess/counterSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Log = () => {
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [errorEmail, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setPasswordError] = useState("");

  const [show, setShow] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmail = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const handleClick = () => {
    if (!email) setEmailError("Right email required");
    if (!password) setPasswordError("Right password required");

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          dispatch(userInfo(user));
          localStorage.setItem("userInfo", JSON.stringify(user));
          toast.success("Login successfully done");
          setTimeout(() => navigate("/main"), 3000);
        })
        .finally(() => {
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          if (error.code.includes("auth/invalid-email")) {
            toast.error("Please give your right email & password");
          }
        });
    }
  };

  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((user) => console.log(user))
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4 sm:px-6 md:px-20 gap-10">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />

      {/* Left Content */}
      <div className="text-center md:text-left max-w-md md:max-w-lg">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0866FF]">
          Facebook
        </h1>
        <p className="text-base sm:text-lg md:text-xl mt-4">
          Facebook helps you connect and share with the people in your life.
        </p>
      </div>

      {/* Right Form */}
      <div className="shadow-xl/30 py-10 px-6 sm:px-12 md:px-20 rounded-3xl w-full max-w-md">
        {/* Google Sign */}
        <div className="flex justify-center">
          <img
            onClick={handleGoogle}
            className="mt-4 cursor-pointer h-12 sm:h-14 md:h-16"
            src={google}
            alt="Google Sign"
          />
        </div>

        {/* Email Input */}
        <div className="mt-6 relative">
          <input
            onChange={handleEmail}
            value={email}
            className="border text-center outline-0 px-4 py-3 sm:py-4 rounded-2xl w-full"
            type="text"
            placeholder="Email-Address"
          />
          <span className="absolute -top-3 left-3 bg-white px-2 text-sm sm:text-base">
            Email Address
          </span>
          <p className="mt-2 text-red-500 text-sm">{errorEmail}</p>
        </div>

        {/* Password Input */}
        <div className="mt-5 relative">
          <input
            onChange={handlePassword}
            value={password}
            className="border text-center outline-0 px-4 py-3 sm:py-4 rounded-2xl w-full"
            type={show ? "text" : "password"}
            placeholder="Password"
          />
          <span className="absolute -top-3 left-3 bg-white px-2 text-sm sm:text-base">
            Password
          </span>
          <p className="mt-2 text-red-500 text-sm">{errorPassword}</p>
           <div className="absolute top-4 right-4 cursor-pointer text-xl">
                      {show ? <FaEyeSlash onClick={() => setShow(!show)} /> : <FaEye onClick={() => setShow(!show)} />}
                    </div>
        </div>

        {/* Sign In Button */}
        <div className="mt-5">
          <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
            className="cursor-pointer bg-black text-white w-full py-3 sm:py-4 rounded-2xl text-base sm:text-lg"
          >
            Sign In
          </motion.button>
        </div>

        {/* Links */}
        <div className="mt-5 text-sm sm:text-base text-center">
          <p>
            Don’t have an account?{" "}
            <Link to="/sign">
              <span className="text-[#EA6C00] cursor-pointer">Sign Up</span>
            </Link>
          </p>
          <Link to="/forgote">
            <p className="mt-3 font-bold text-red-500 cursor-pointer">
              Forgot Password
            </p>
          </Link>
        </div>

        {/* Home Link */}
        <div className="mt-8 text-rose-700 font-bold text-sm sm:text-base text-center">
          <Link to="/">Go to home</Link>
        </div>
      </div>
    </div>
  );
};

export default Log;
