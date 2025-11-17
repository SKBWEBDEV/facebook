import { useState } from "react";
import google from "../../assets/google.png";
import { Link, useNavigate } from "react-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Slide, ToastContainer, toast } from "react-toastify";
import { motion } from "motion/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userInfo } from "../slicess/counterSlice";
const Log = () => {

  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [errorEmail, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [errorPassword, setPasswordError] = useState("");

  const auth = getAuth();
  const navigate = useNavigate ()
    const dispatch = useDispatch()

  const handleEmail = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const handleClick = () => {
    if (!email) {
      setEmailError("right email requerd");
    }

    if (!password) {
      setPasswordError("right password requerd");
    }

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          dispatch(userInfo(user))
          localStorage.setItem("userInfo", JSON.stringify(user))
          toast.success("login successfully done");
          setTimeout(() => {
            navigate('/main')
          }, 3000);
        })
        .finally(() => {
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          if (errorCode.includes("auth/invalid-email")) {
            toast.error("plase give your right email & password");
          }
        });
    }
  };

  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="text-center flex gap-60 items-center mt-20">
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

      <div>
        <h1 className="text-[80px] font-bold text-[#0866FF]">facebook</h1>
        <p className="text-[40px] w-[589px]">Facebook helps you connect and share with the people in your life.</p>
      </div>

      <div>

     

     <div className="shadow-xl/30 py-10 px-20 rounded-4xl">
         <div>
        <img
          onClick={handleGoogle}
          className="mt-10 cursor-pointer "
          src={google}
          alt=""
        />
      </div>

      <div className="mt-15 relative">
        <input
          onChange={handleEmail}
          value={email}
          className="border text-center outline-0 pl-10 pr-38 py-[17px] rounded-2xl"
          type="text"
          placeholder="Email-Address"
        />
        <span className="absolute top-[-13px] left-15 bg-white px-5">
          Email Address
        </span>
        <p className="mt-2">{errorEmail}</p>
      </div>

      <div className="mt-10 relative">
        <input
          onChange={handlePassword}
          value={password}
          className="border text-center outline-0 pl-10 pr-38 py-[17px] rounded-2xl"
          type="text"
          placeholder="Password"
        />
        <span className="absolute top-[-13px] left-20 bg-white px-5">
          Password
        </span>
        <p className="mt-2">{errorPassword}</p>
      </div>

      <div className="mt-5">
        <motion.button
          onClick={handleClick}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.1 },
          }}
          transition={{ duration: 0.5 }}
          className="cursor-pointer bg-black text-white px-[150px] py-5 rounded-2xl"
        >
          Sign up
        </motion.button>
      </div>

      <div className="mt-5">
        <p className="">
          Don’t have an account ?{" "}
          <Link to="/sign">
            <span className="text-[#EA6C00] cursor-pointer">Sign Up</span>
          </Link>
        </p>
        <Link to="/forgote">
          <p className="mt-3 font-bold text-red-500 cursor-pointer">
            forgote password
          </p>
        </Link>
      </div>

      <div className="mt-10 text-rose-700 font-bold">
        <Link to="/">Go to home</Link>
      </div>
     </div>

      
      </div>


    </div>
  );
};

export default Log;
