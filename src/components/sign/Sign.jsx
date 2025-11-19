import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { Slide, ToastContainer, toast } from "react-toastify";
import { getDatabase, ref, set } from "firebase/database";

const Sign = () => {
  const [email, setEmail] = useState("");
  const [errorEmail, setEmailError] = useState("");

  const [name, setName] = useState("");
  const [errorName, setNameError] = useState("");

  const [password, setPassword] = useState("");
  const [errorPassword, setPasswordError] = useState("");

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getDatabase();

  const handleClick = () => {
    if (!email) setEmailError("Right email required");
    if (!name) setNameError("Right name required");
    if (!password) setPasswordError("Right password required");

    if (email && name && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          sendEmailVerification(auth.currentUser);
          updateProfile(auth.currentUser, { displayName: name });
          toast.success("Sign up successful & please verify your email");
          set(ref(db, "users/" + user.user.uid), { username: name, email, password });
          setTimeout(() => navigate("/login"), 3000);
        })
        .catch(() => toast.error("This email is already used"))
        .finally(() => {
          setEmail("");
          setName("");
          setPassword("");
        });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-5 sm:px-10 lg:px-32 py-10 gap-10">

      {/* Toast */}
      <ToastContainer position="top-center" autoClose={5000} theme="colored" transition={Slide} />

      {/* LEFT SECTION */}
      <div className="text-center md:text-left max-w-md space-y-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0866FF]">
          Facebook
        </h1>

        <p className="text-base sm:text-lg md:text-xl mt-4 leading-relaxed">
          Facebook helps you connect and share with the people in your life.
        </p>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full max-w-md shadow-lg p-6 rounded-2xl border">

        {/* Title */}
        <div className="text-center">
          <h1 className="text-[#11175D] font-bold text-2xl sm:text-3xl">
            Get started with easily register
          </h1>

          <p className="text-black/50 text-base sm:text-lg">
            Free register and you can enjoy it
          </p>
        </div>

        {/* Email */}
        <div className="mt-5 relative">
          <input
            onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
            value={email}
            className="border outline-0 px-4 py-3 rounded-2xl w-full"
            type="text"
            placeholder="Email Address"
          />
          <span className="absolute -top-3 left-3 bg-white px-2 text-sm">Email</span>
          <p className="mt-2 text-red-500 text-sm">{errorEmail}</p>
        </div>

        {/* Full Name */}
        <div className="mt-5 relative">
          <input
            onChange={(e) => { setName(e.target.value); setNameError(""); }}
            value={name}
            className="border outline-0 px-4 py-3 rounded-2xl w-full"
            type="text"
            placeholder="Full Name"
          />
          <span className="absolute -top-3 left-3 bg-white px-2 text-sm">Name</span>
          <p className="mt-2 text-red-500 text-sm">{errorName}</p>
        </div>

        {/* Password */}
        <div className="mt-5 relative">
          <input
            onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
            value={password}
            className="border outline-0 px-4 py-3 rounded-2xl w-full"
            type={show ? "text" : "password"}
            placeholder="Password"
          />
          <span className="absolute -top-3 left-3 bg-white px-2 text-sm">Password</span>

          <div className="absolute top-4 right-4 cursor-pointer text-xl">
            {show ? <FaEyeSlash onClick={() => setShow(!show)} /> : <FaEye onClick={() => setShow(!show)} />}
          </div>

          <p className="mt-2 text-red-500 text-sm">{errorPassword}</p>
        </div>

        {/* Button */}
        <div className="mt-6">
          <button
            onClick={handleClick}
            className="bg-black text-white w-full py-3 rounded-full text-lg"
          >
            Sign Up
          </button>
        </div>

        {/* Login Link */}
        <p className="mt-5 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-[#EA6C00] font-semibold cursor-pointer">Sign In</span>
          </Link>
        </p>

        {/* Home Link */}
        <p className="mt-5 text-center text-rose-700 font-bold text-sm">
          <Link to="/">Go to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Sign;
