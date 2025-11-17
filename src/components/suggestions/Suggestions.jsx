import one from "../../assets/one.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";
import { getDatabase, ref, onValue, push } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Suggestions = () => {
  const data = useSelector((state) => state.userInfo.value.user);
  const db = getDatabase();
  const userRef = ref(db, "users/");
  const [list, setList] = useState([]);

  useEffect(() => {
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid !== item.key) {
          arr.push({ ...item.val(), userid: item.key });
        }
      });
      setList(arr);
    });
  }, [data.uid]);

  const friendRequest = (item) => {
    push(ref(db, "FriendRequest/"), {
      senderName: data?.displayName,
      senderId: data.uid,
      reciverName: item.username,
      reciverId: item.userid,
    });
  };

  const [sentRequest, setSentRequest] = useState([]);
  useEffect(() => {
    const sentRef = ref(db, "FriendRequest/");
    onValue(sentRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().senderId + item.val().reciverId);
      });
      setSentRequest(arr);
    });
  }, []);

  const [friend, setFriend] = useState([]);
  useEffect(() => {
    const sentRef = ref(db, "RequestAccept/");
    onValue(sentRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().senderId + item.val().reciverId);
      });
      setFriend(arr);
    });
  }, []);

  return (
    <div className="flex justify-center px-4 sm:px-6 md:px-10">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mt-8 bg-white rounded-2xl shadow-md">
        <div className="py-4 px-4 sm:px-6 font-third">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="flex items-center gap-2 sm:gap-5 font-bold text-sm sm:text-base">
              <Link to="/user">
                <FaArrowLeft className="text-lg sm:text-2xl" />
              </Link>
              <p>Suggestion</p>
            </div>
            <div className="flex items-center justify-between w-full sm:w-auto">
              <p className="text-base sm:text-lg font-semibold">People you may know</p>
              <BsThreeDotsVertical className="text-xl sm:text-2xl font-bold" />
            </div>
          </div>

          {/* User List */}
          <div className="px-2 overflow-y-auto max-h-[400px] sm:max-h-[455px]">
            {list.map((user, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 border-b border-gray-300 pb-3"
              >
                <div className="flex items-center gap-3 sm:gap-6">
                  <img src={one} alt="" className="h-12 w-12 sm:h-14 sm:w-14 rounded-full" />
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-black">{user.username}</h3>
                  </div>
                </div>

                {/* Buttons */}
                {friend.includes(data.uid + user.userid) || friend.includes(user.userid + data.uid) ? (
                  <div className="flex gap-2 sm:gap-4 mt-2 sm:mt-0 flex-wrap">
                    <button className="py-2 px-4 sm:px-10 rounded-2xl bg-[#0866FF] text-white font-semibold text-sm sm:text-base">
                      Friend
                    </button>
                  </div>
                ) : sentRequest.includes(data.uid + user.userid) || sentRequest.includes(user.userid + data.uid) ? (
                  <div className="flex gap-2 sm:gap-4 mt-2 sm:mt-0 flex-wrap">
                    <button className="py-2 px-4 sm:px-10 rounded-2xl bg-[#0866FF] text-white font-semibold text-sm sm:text-base">
                      Sent Request
                    </button>
                    <button className="py-2 px-4 sm:px-10 rounded-2xl bg-black/10 font-semibold text-sm sm:text-base">
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2 sm:gap-4 mt-2 sm:mt-0 flex-wrap">
                    <button
                      onClick={() => friendRequest(user)}
                      className="py-2 px-4 sm:px-10 rounded-2xl bg-[#0866FF] text-white font-semibold text-sm sm:text-base"
                    >
                      Add Friend
                    </button>
                    <button className="py-2 px-4 sm:px-10 rounded-2xl bg-black/10 font-semibold text-sm sm:text-base">
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
