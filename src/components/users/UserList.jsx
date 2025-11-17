import one from "../../assets/one.png";
import { Link } from "react-router";
import { MdArrowBackIosNew } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, push, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserList = () => {
  const data = useSelector((state) => state.userInfo.value.user);
  const db = getDatabase();
  const requestRef = ref(db, "FriendRequest/");
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    onValue(requestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid === item.val().reciverId) {
          arr.push(item.val());
        }
      });
      setRequestList(arr);
    });
  }, [data.uid]);

  const confirmRequest = (item) => {
    push(ref(db, "RequestAccept/"), {
      reciverName: item.reciverName,
      reciverId: item.reciverId,
      senderName: item.senderName,
      senderId: item.senderId,
    });
    remove(ref(db, "FriendRequest/"));
  };

  return (
    <div className="px-4 sm:px-6 md:px-10">
      {/* Header */}
      <div className="flex justify-center mr-50 gap-4 py-3">
        <Link to="/main">
          <MdArrowBackIosNew className="text-2xl sm:text-3xl" />
        </Link>
        <h3 className="font-bold text-xl sm:text-2xl md:text-3xl">Friends</h3>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 sm:gap-10 py-4 flex-wrap">
        <Link to="/suggestion">
          <h2 className="bg-black/20 px-6 sm:px-14 py-2 rounded-full font-bold text-sm sm:text-base">
            Suggestions
          </h2>
        </Link>
        <Link to="/friends">
          <h1 className="bg-black/20 px-6 sm:px-14 py-2 rounded-full font-bold text-sm sm:text-base">
            Your Friends
          </h1>
        </Link>
      </div>

      {/* Friends List */}
      <div className="flex justify-center">
        <div className="mt-6 w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-2xl shadow-md">
          <div className="py-4 px-4 sm:px-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-base sm:text-lg md:text-xl font-semibold">
                People you may know
              </p>
              <BsThreeDotsVertical className="text-xl sm:text-2xl" />
            </div>

            <div className="px-2 overflow-y-auto max-h-[400px] sm:max-h-[450px]">
              {requestList.map((user, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-3 border-b border-gray-300 pb-3"
                >
                  <div className="flex items-center gap-4">
                    <img src={one} alt="" className="h-12 w-12 sm:h-14 sm:w-14 rounded-full" />
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base">{user.senderName}</h3>
                    </div>
                  </div>

                  <div className="flex gap-2 sm:gap-4 mt-2 sm:mt-0">
                    <button
                      onClick={() => confirmRequest(user)}
                      className="cursor-pointer py-2 px-6 sm:px-10 rounded-2xl bg-[#0866FF] text-white font-semibold text-sm sm:text-base"
                    >
                      Confirm
                    </button>
                    <button className="px-6 sm:px-10 py-2 rounded-2xl bg-black/10 font-semibold text-sm sm:text-base cursor-pointer">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
