import { IoSearch } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { RiHome5Fill } from "react-icons/ri";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { LiaFacebookMessenger } from "react-icons/lia";
import { MdOndemandVideo } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi2";
import { MdPhotoLibrary } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";
import one from "../../assets/one.png";

const Main = () => {
  const data = useSelector((state) => state?.userInfo?.value);
  const navigate = useNavigate();
  const auth = getAuth();
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.emailVerified) setVerify(true);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!data) navigate("/login");
  }, [data, navigate]);

  if (loading) return null;

  return (
    <div className="text-center">
      {verify ? (
        <div>
          {/* Header */}
          <div className="px-4 sm:px-6 md:px-10 bg-white shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between py-4 md:py-6 gap-4 md:gap-0">
              <h2 className="text-[#0866FF] font-bold text-3xl sm:text-4xl md:text-5xl">
                Facebook
              </h2>
              <div className="flex justify-center gap-4 md:gap-12">
                <p className="bg-black/20 p-3 sm:p-4 rounded-full cursor-pointer">
                  <IoSearch className="text-2xl sm:text-3xl md:text-4xl" />
                </p>
                <Link to="/logout">
                  <p className="bg-black/20 p-3 sm:p-4 rounded-full cursor-pointer">
                    <FaBars className="text-2xl sm:text-3xl md:text-4xl" />
                  </p>
                </Link>
              </div>
            </div>

            {/* Navigation Icons */}
            <div className="flex justify-between py-4 md:py-6 text-2xl sm:text-3xl md:text-5xl overflow-x-auto">
              <RiHome5Fill className="hover:text-[#0866FF] duration-500 cursor-pointer flex-shrink-0" />
              <Link to="/user">
                <LiaUserFriendsSolid className="hover:text-[#0866FF] duration-500 cursor-pointer flex-shrink-0" />
              </Link>
              <LiaFacebookMessenger className="hover:text-[#0866FF] duration-500 cursor-pointer flex-shrink-0" />
              <MdOndemandVideo className="hover:text-[#0866FF] duration-500 cursor-pointer flex-shrink-0" />
              <Link to="/maingroup">
                <HiUserGroup className="hover:text-[#0866FF] duration-500 cursor-pointer flex-shrink-0" />
              </Link>
              <IoIosNotificationsOutline className="hover:text-[#0866FF] duration-500 cursor-pointer flex-shrink-0" />
            </div>
          </div>

          {/* Post Input Section */}
          <div className="flex flex-col md:flex-row items-center justify-between py-5 px-4 sm:px-6 md:px-10 gap-4 md:gap-6">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <img
                src={one}
                alt=""
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full"
              />
              <p className="text-sm sm:text-base md:text-lg truncate">
                {data?.displayName || data?.user?.displayName}
              </p>
            </div>
            <div className="flex-1 w-full md:w-auto">
              <input
                type="text"
                placeholder="What's on your mind"
                className="border outline-0 py-2 sm:py-3 md:py-4 rounded-full bg-black/5 text-black w-full md:w-[500px] px-4 md:px-8"
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <MdPhotoLibrary className="text-2xl sm:text-3xl md:text-4xl cursor-pointer text-green-600" />
              <p className="text-sm sm:text-base">Photo</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-black h-screen flex justify-center items-center text-white px-4">
          <div className="text-center">
            <p className="font-bold text-2xl sm:text-3xl md:text-4xl">
              Please verify your email
            </p>
            <button className="bg-white hover:bg-blue-500 text-black w-full sm:w-60 py-3 mt-6 rounded-lg font-semibold transition">
              <Link to="/login">
                <span className="hover:text-white">Go to Login</span>
              </Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
