import { FaArrowLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import one from "../../assets/one.png"
import { Link } from "react-router";
import { useState } from "react";
import { Slide, toast, ToastContainer } from 'react-toastify';
import { push, ref } from "firebase/database";
import { getDatabase } from "firebase/database";

const Post = () => {
  const data = useSelector((state) => state.userInfo.value.user);
  const db = getDatabase();

  const [postName,setPost] = useState ("");
  const [postError,setErrorPost] = useState ("")

  const handlePost = (event) => {
    setPost(event.target.value)
    setErrorPost("")
  }

  const postOn = () => {
    console.log(postName);
    
    if (!postName) {
      setErrorPost("Please Add Something And Try Again")
      return;
    }

    if (postName && postName.trim() !== "") {
      try {
         push(ref(db, "YourPost/"), {
          post: postName,
          postId: data.uid,
          postMan: data.displayName,
        });
        toast.success("Post uploaded successfully");
      } catch (err) {
        setErrorPost("Failed to upload post");
        console.error(err);
      } finally {
        setPost("");
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#F2F4F7] px-4 sm:px-6 md:px-10 relative">

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

      {/* Header */}
      <div className="flex  sm:flex-row justify-between items-center border-b-2 border-black/20 py-5">
        <div className="flex items-center gap-4 sm:gap-10 text-[20px] font-bold">
          <Link to="/main"><FaArrowLeft /></Link>
          <p>Create Post</p>
        </div>
        <div className="mt-3 sm:mt-0">
          <h3 className="font-bold text-[#0866FF] text-[20px] cursor-pointer" onClick={postOn}>POST</h3>
        </div>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4 py-5">
        <img src={one} alt="" className="h-12 w-12 rounded-full"/>
        <p className="font-bold text-[18px] truncate">{data?.displayName || data?.user?.displayName}</p>
      </div>

      {/* Input */}
      <div className="w-full">
        <textarea
          onChange={handlePost}
          value={postName}
          className="border border-black/20 rounded-2xl w-full p-4 h-40 outline-none resize-none text-left"
          placeholder="What's on your mind"
        />
      </div>

      {/* Error Message */}
      {postError && (
        <div className="my-4">
          <p className="bg-red-500 text-white font-bold text-center py-2 rounded-lg">{postError}</p>
        </div>
      )}

      {/* Post Button */}
      <div className="flex justify-center my-5">
        <button
          onClick={postOn}
          className="bg-[#0866FF] text-white font-bold text-[18px] sm:text-[20px] px-6 sm:px-10 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition"
        >
          POST
        </button>
      </div>
    </div>
  )
}

export default Post;
