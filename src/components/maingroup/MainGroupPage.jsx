import { FaArrowLeft } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import one from "../../assets/one.png";
import { Link } from "react-router";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import { useSelector } from "react-redux";

const MainGroupPage = () => {
  const data = useSelector((state) => state.userInfo.value.user);

  const [activeTab, setActiveTab] = useState("yourGroup");
  const [groupNameList, setGroupName] = useState([]);
  const [discoverGroup, setDiscoverGroup] = useState([]);

  const db = getDatabase();
  const groupNameRef = ref(db, "GroupList/");

  useEffect(() => {
    onValue(groupNameRef, (snapshot) => {
      let arr = [];
      let discover = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().groupCreator) {
          arr.push({ ...item.val(), discoverId: item.key });
        } else {
          discover.push(item.val());
        }
      });
      setGroupName(arr);
      setDiscoverGroup(discover);
    });
  }, []);

  const remveGroup = (item) => {
    remove(ref(db, "GroupList/" + item.discoverId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex  sm:flex-row items-center justify-between py-5 px-4 sm:px-6 border-b-2 border-b-black/20 gap-3 sm:gap-0">
        <div className="flex items-center gap-4 sm:gap-6 text-2xl sm:text-3xl md:text-4xl">
          <Link to="/main">
            <FaArrowLeft className="cursor-pointer" />
          </Link>
          <p className="font-semibold">Groups</p>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 text-2xl sm:text-3xl md:text-4xl">
          <Link to="/creategroup">
            <MdAdd className="bg-black text-white p-1 rounded-full cursor-pointer" />
          </Link>
          <IoSearch className="cursor-pointer" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center sm:justify-start py-6 gap-4">
        {["yourGroup", "discover", "posts",].map((tab) => (
          <p
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-semibold px-5 py-2 rounded-full cursor-pointer duration-300 text-[18px] sm:text-[20px] ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {tab === "yourGroup"
              ? "Your Group"
              : tab === "discover"
              ? "Discover"
              : tab === "posts"
              ? "Posts"
              : "Invites"}
          </p>
        ))}
      </div>

      {/* Content */}
      <div className="flex justify-center px-4 sm:px-6 md:px-10 pb-10">
        <div className="w-full max-w-3xl">
          {(activeTab === "yourGroup" || activeTab === "discover") && (
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
              {activeTab === "yourGroup" && (
                <div className="flex items-center justify-between mb-4">
                  <p className="font-bold text-lg sm:text-xl">Your Group's</p>
                  <Link to="/creategroup">
                    <button className="bg-black text-white py-1 px-4 sm:px-5 rounded-full text-sm sm:text-base font-semibold hover:bg-amber-500 transition">
                      Create Group
                    </button>
                  </Link>
                </div>
              )}

              {/* Search */}
              <div className="mb-4">
                <input
                  className="w-full border outline-0 pl-3 sm:pl-5 pr-10 py-2 sm:py-2.5 md:py-3 rounded-full bg-black/5 font-bold"
                  type="text"
                  placeholder="Search Groups"
                />
              </div>

              {/* List */}
              <div className="overflow-y-auto max-h-[400px] sm:max-h-[455px]">
                {(activeTab === "yourGroup" ? groupNameList : discoverGroup).map(
                  (user, idx) => (
                    <div
                      key={idx}
                      className="flex  sm:flex-row items-center justify-between mt-4 border-b border-gray-300 pb-3">
                      <div className="flex items-center gap-3 sm:gap-6 mb-2 sm:mb-0">
                        <img
                          src={one}
                          alt="#"
                          className="h-12 w-12 sm:h-14 sm:w-14 rounded-full"/>
                        <h3 className="font-semibold text-sm sm:text-base text-black">
                          {user.groupName}
                        </h3>
                      </div>
                      <button
                        onClick={() =>
                             remveGroup(user)
                        }
                        className="bg-black text-white px-4 sm:px-5 py-1 rounded-lg hover:bg-amber-500 transition text-sm 
                        sm:text-base"
                      >
                        remove
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* {activeTab === "posts" && (
            <div className="text-center text-2xl font-semibold py-20">
              Group Posts Section
            </div>
          )}

          {activeTab === "invites" && (
            <div className="text-center text-2xl font-semibold py-20">
              Group Invites List
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default MainGroupPage;
