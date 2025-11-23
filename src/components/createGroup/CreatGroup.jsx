import { useState } from "react";
import { Link } from "react-router";
import { getDatabase, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import { Slide, ToastContainer, toast } from "react-toastify";

const CreatGroup = () => {
  const data = useSelector((state) => state.userInfo.value.user);
  const db = getDatabase();

  const [groupName, setGroupName] = useState("");
  const [errorGroupName, setErrorGroupName] = useState("");

  const [tagname, setTagName] = useState("");
  const [errorTagName, setErrorTagName] = useState("");

  const handleGroupName = (event) => {
    setGroupName(event.target.value);
    setErrorGroupName("");
  };

  const handleTagName = (event) => {
    setTagName(event.target.value);
    setErrorTagName("");
  };

  const handleCreatGroup = () => {
    if (!groupName) setErrorGroupName("Please write your group name");
    if (!tagname) setErrorTagName("Please write your group tagline");

    if (!groupName || !tagname) return;

    set(push(ref(db, "GroupList/")), {
      groupName: groupName,
      tagname: tagname,
      groupCreator: data.uid,
    }).finally(() => {
      setGroupName("");
      setTagName("");
      setTimeout(() => toast.success("Group created successfully"), 500);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 md:px-10">
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

      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white rounded-2xl shadow-md p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-bold text-lg sm:text-xl md:text-2xl">
            Create Your Group's
          </p>
          <Link to="/maingroup">
            <button className="text-white bg-black py-1 px-4 sm:px-5 rounded-full cursor-pointer hover:bg-gray-800 transition">
              Go Back
            </button>
          </Link>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <div>
            <input
              onChange={handleGroupName}
              value={groupName}
              type="text"
              placeholder="Group Name"
              className="w-full border outline-0 pl-3 sm:pl-5 pr-4 py-2 sm:py-2.5 md:py-3 rounded-lg bg-black/5 font-bold text-sm sm:text-base"
            />
            {errorGroupName && (
              <p className="text-red-500 text-sm mt-1">{errorGroupName}</p>
            )}
          </div>

          <div>
            <input
              onChange={handleTagName}
              value={tagname}
              type="text"
              placeholder="Group Tagline"
              className="w-full border outline-0 pl-3 sm:pl-5 pr-4 py-2 sm:py-2.5 md:py-3 rounded-lg bg-black/5 font-bold text-sm sm:text-base"
            />
            {errorTagName && (
              <p className="text-red-500 text-sm mt-1">{errorTagName}</p>
            )}
          </div>

          <button
            onClick={handleCreatGroup}
            className="bg-black text-white py-2 w-full mt-4 rounded-md text-lg sm:text-xl font-semibold hover:bg-gray-800 transition"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatGroup;
