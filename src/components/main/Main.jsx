import { IoSearch } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { RiHome5Fill } from "react-icons/ri";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { LiaFacebookMessenger } from "react-icons/lia";
import { MdOndemandVideo } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdPhotoLibrary } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";
import one from "../../assets/one.png"
const Main = () => {

  const data = useSelector((state)=> (state?.userInfo?.value))
  console.log(data);
  

  
  const navigate = useNavigate ()

  const auth = getAuth();
  const [veryfi, setVeryfi] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.emailVerified) {
        setVeryfi(true);
      }
      setLoading(false);
    });
  }, []);


  useEffect(()=> {
    if (!data) {
      navigate("/login")
    }
  },[])






  if (loading) {
    return null;
  }

  return (
    <div className="text-center">
      {veryfi ? (
        <div>
          <div className="px-20 bg-white shadow-[0_0px_35px_rgba(0,5,2,0.25)] ">
            <div className="flex items-center  py-10 justify-between">
              <div>
                <h2 className="text-[#0866FF] font-bold text-[50px]">
                  facebook
                </h2>
              </div>
              <div className="flex justify-center gap-50">
                <p className="bg-black/20 px-5 py-5 rounded-full cursor-pointer">
                  <IoSearch className="text-[40px]" />
                </p>
                <Link to="/logout">
                  <p className="bg-black/20 px-5 py-5 rounded-full cursor-pointer">
                    <FaBars className="text-[40px]" />
                  </p>
                </Link>
              </div>
            </div>

            <div className="flex justify-between pb-7 ">
              <RiHome5Fill className="text-[50px] hover:text-[#0866FF] duration-500 cursor-pointer" />
              <Link to="/user"><LiaUserFriendsSolid className="text-[50px] hover:text-[#0866FF] duration-500 cursor-pointer" /></Link>
              <LiaFacebookMessenger className="text-[50px] hover:text-[#0866FF] duration-500 cursor-pointer" />
              <MdOndemandVideo className="text-[50px] hover:text-[#0866FF] duration-500 cursor-pointer" />
              <IoIosNotificationsOutline className="text-[50px] hover:text-[#0866FF] duration-500 cursor-pointer" />
            </div>
          </div>

          <div className="flex items-center justify-between py-5 px-20">
            <div>
              <img src={one} alt="" />
            <p>{data?.displayName || data?.user?.displayName}</p>
            </div>
            <input
              type="text"
              placeholder="What's on your mind"
              className="border outline-0 px-72 py-3 rounded-full bg-black/5 text-black"
            />
            <div>
              <MdPhotoLibrary className="text-[40px] cursor-pointer text-green-600" />
              <p>photo</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-black h-screen flex text-center w-full justify-center items-center text-white">
          <div>
            <p className="font-bold text-[50px]">pleaces veryfi your email </p>
            <button
             className="bg-white cursor-pointer mb-4 hover:bg-blue-500 text-black w-60 py-3 mt-7 rounded-lg font-semibold transition">
              <Link to="/login">
                <span className="hover:text-white">go to login</span>
              </Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
