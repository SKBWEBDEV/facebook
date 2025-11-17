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

  const handleEmail = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const handleName = (event) => {
    setName(event.target.value);
    setNameError("");
  };

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
        .finally(() => {
          setEmail("");
          setName("");
          setPassword("");
        })
        .catch(() => toast.error("This email is already used"));
    }
  };

  return (
    <div className="text-center px-4 sm:px-6 md:px-20 lg:px-40">
      <div>
        <h1 className="text-[#11175D] font-bold text-2xl sm:text-3xl md:text-4xl">
          Get started with easily register
        </h1>
        <p className="text-[#000000]/50 font-normal text-base sm:text-lg md:text-xl">
          Free register and you can enjoy it
        </p>
      </div>

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

      {/* Email */}
      <div className="mt-5 relative">
        <input
          onChange={handleEmail}
          value={email}
          className="border text-center outline-0 px-4 py-3 sm:py-4 rounded-2xl w-full sm:w-96"
          type="text"
          placeholder="Email-Address"
        />
        <span className="absolute -top-3 md:left-165 left-5 bg-white px-2 text-sm sm:text-base">
          Email Address
        </span>
        <p className="mt-2 text-red-500 text-sm">{errorEmail}</p>
      </div>

      {/* Full Name */}
      <div className="mt-5 relative">
        <input
          onChange={handleName}
          value={name}
          className="border text-center outline-0 px-4 py-3 sm:py-4 rounded-2xl w-full sm:w-96"
          type="text"
          placeholder="Full Name"
        />
        <span className="absolute -top-3 md:left-170 left-5 bg-white px-2 text-sm sm:text-base">
          Full Name
        </span>
        <p className="mt-2 text-red-500 text-sm">{errorName}</p>
      </div>

      {/* Password */}
      <div className="mt-5 relative">
        <input
          onChange={handlePassword}
          value={password}
          className="border text-center outline-0 px-4 py-3 sm:py-4 rounded-2xl w-full sm:w-96"
          type={show ? "text" : "password"}
          placeholder="Password"
        />
        <span className="absolute -top-3 md:left-170 left-5 bg-white px-2 text-sm sm:text-base">
          Password
        </span>
        <p className="mt-2 text-red-500 text-sm">{errorPassword}</p>

        <div className="absolute top-3 right-5 cursor-pointer text-lg sm:text-xl">
          {show ? (
            <FaEyeSlash onClick={() => setShow(!show)} />
          ) : (
            <FaEye onClick={() => setShow(!show)} />
          )}
        </div>
      </div>

      {/* Button */}
      <div className="mt-5">
        <button
          onClick={handleClick}
          className="cursor-pointer bg-black text-white w-full sm:w-96 py-3 sm:py-4 rounded-full text-base sm:text-lg"
        >
          Sign up
        </button>
      </div>

      {/* Login Link */}
      <div className="mt-5 text-sm sm:text-base">
        <p>
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-[#EA6C00] cursor-pointer">Sign In</span>
          </Link>
        </p>
      </div>

      {/* Home Link */}
      <div className="mt-10 text-rose-700 font-bold text-sm sm:text-base">
        <Link to="/">Go to home</Link>
      </div>
    </div>
  );
};

export default Sign;
