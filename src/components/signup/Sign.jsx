import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { Slide, ToastContainer, toast } from "react-toastify";
import { getDatabase, ref, set } from "firebase/database";
const sign = () => {
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
    console.log(email);

    if (!email) {
      setEmailError("right email requerd");
    }

    if (!name) {
      setNameError("right name requerd");
    }

    if (!password) {
      setPasswordError("right password requerd");
    }

    if (email && name && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          console.log(user);
          sendEmailVerification(auth.currentUser)
          updateProfile(auth.currentUser, {
           displayName: name
          })
          toast.success("sign in success fully done & plase veryfi your email");
          set(ref(db, 'users/'+user.user.uid), {
             username: name,
             email: email,
             password: password
             });
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        })
        .finally(() => {
          setEmail("");
          setName("");
          setPassword("");
        })
        .catch((error) => {
          const errorCode = error.code;
          toast.error("this email allready used");
        });
    }
  };

  return (
    <div className="text-center">
      <div>
        <h1 className="text-[#11175D] font-bold text-[34px]">
          Get started with easily register
        </h1>
        <p className="text-[#000000]/25 font-normal text-[20px]">
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

      <div className="mt-5 relative">
        <input
          onChange={handleEmail}
          value={email}
          className="border text-center outline-0 pl-10 pr-38 py-[17px] rounded-2xl"
          type="text"
          placeholder="Email-Address"
        />
        <span className="absolute top-[-13px] left-180 bg-white px-5">
          Email Address
        </span>
        <p className="mt-2">{errorEmail}</p>
      </div>

      <div className="mt-5 relative">
        <input
          onChange={handleName}
          value={name}
          className="border text-center outline-0 pl-10 pr-38 py-[17px] rounded-2xl"
          type="text"
          placeholder="Ful name"
        />
        <span className="absolute top-[-13px] left-185 bg-white px-5">
          Ful name
        </span>
        <p className="mt-2">{errorName}</p>
      </div>

      <div className="mt-5 relative">
        <input
          onChange={handlePassword}
          value={password}
          className="border text-center outline-0 pl-10 pr-38 py-[17px] rounded-2xl"
          type={show ? "text" : "password"}
          placeholder="Password"
        />
        <span className="absolute top-[-13px] left-185 bg-white px-5">
          Password
        </span>
        <p className="mt-2">{errorPassword}</p>

        <div className="absolute top-6 left-[57%]">
          {show ? (
            <FaEyeSlash onClick={() => setShow(!show)} />
          ) : (
            <FaEye onClick={() => setShow(!show)} />
          )}
        </div>
      </div>

      <div className="mt-5">
        <button
          onClick={handleClick}
          className="cursor-pointer bg-black text-white px-[150px] py-5 rounded-full"
        >
          Sign up
        </button>
      </div>

      <div className="mt-5">
        <p className="">
          Already have an account ?{" "}
          <Link to="/login">
            <span className="text-[#EA6C00] cursor-pointer">Sign I n</span>
          </Link>
        </p>
      </div>

      <div className="mt-10 text-rose-700 font-bold">
        <Link to="/">Go to home</Link>
      </div>
    </div>
  );
};

export default sign;
