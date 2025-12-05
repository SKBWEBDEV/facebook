import { BsFillTriangleFill, BsFillSendFill } from "react-icons/bs";
import { MdEmojiEmotions } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import one from "../../assets/one.png";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { massage } from "../massageSlice/MassageSlice";

import moment from "moment"

import EmojiPicker from 'emoji-picker-react';

// --- same imports and logic (UNCHANGED) --- //

const SideBer = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.userInfo.value.user);
  const ratul = useSelector((state) => state?.massage?.value);

  const db = getDatabase();
  const friendRef = ref(db, "RequestAccept/");
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    onValue(friendRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          data.uid == item.val().reciverId ||
          data.uid == item.val().senderId
        ) {
          arr.push({ ...item.val(), acceptId: item.key });
        }
      });
      setFriendList(arr);
    });
  }, []);

  const handleMassage = (item) => {
    let massages;
    if (data.uid == item.senderId) {
      massages = {
        id: item.reciverId,
        name: item.reciverName,
      };
    } else {
      massages = {
        id: item.senderId,
        name: item.senderName,
      };
    }

    dispatch(massage(massages));
    localStorage.setItem("okey", JSON.stringify(massages));
  };

  const [sent, setSent] = useState("");
  const handleMassageSent = (e) => setSent(e.target.value);

  const hanldeSentMassege = () => {
    set(push(ref(db, "massage")), {
      senderName: data.displayName,
      senderId: data.uid,
      reciverId: ratul.id,
      reciverName: ratul.name,
      msg: sent,
      time: moment().format("MMMM Do YYYY, h:mm:ss a"),
    });
    setSent("");
  };

  const [sakib, setSakib] = useState([]);
  const sakibref = ref(db, "massage");

  useEffect(() => {
  const sakibref = ref(db, "massage");

  const unsubscribe = onValue(sakibref, (snapshot) => {
    let arr = [];
    snapshot.forEach((item) => {
      const val = item.val();
      if (
        (data.uid === val.senderId && ratul.id === val.reciverId) ||
        (data.uid === val.reciverId && ratul.id === val.senderId)
      ) {
        arr.push(val);
      }
    });
    setSakib(arr);
  });

  // Cleanup listener to avoid duplicate subscriptions
  return () => unsubscribe();
}, [ratul?.id, data.uid]);



const [emoji,setEmoji] = useState (false)

const hanldeEmoji = (emoji)=> {
      setSent((okey)=> okey + emoji.emoji)
    }


  return (
    <div className="flex flex-col items-center px-2 sm:px-4 lg:px-0">

      {/* Friend List */}
      <div className="bg-amber-400 w-full max-w-[700px] rounded-md mt-5">
        <div className="px-2 overflow-y-scroll max-h-[200px]">
          {friendList.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between mt-4 border-b border-gray-300 pb-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={one}
                  alt=""
                  className="h-10 w-10 sm:h-14 sm:w-14 rounded-full"
                />

                <h3 className="font-semibold text-sm sm:text-base">
                  {data.uid == user.reciverId
                    ? user.senderName
                    : user.reciverName}
                </h3>
              </div>

              <button
                onClick={() => handleMassage(user)}
                className="bg-black text-white hover:text-black px-4 py-1 rounded-lg hover:bg-white duration-300 cursor-pointer text-sm"
              >
                massage
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Box */}
      <div className="mt-8 w-full max-w-[700px] bg-white rounded-2xl shadow-lg px-5 pb-5">
        {/* Header */}
        <div className="flex items-center justify-between mt-4 border-b border-black/20 pb-2">
          <div className="flex items-center gap-4">
            <img src={one} alt="" className="w-10 h-10 sm:w-12 sm:h-12" />
            <div>
              <h3 className="font-semibold text-sm sm:text-base">
                {ratul?.name}
              </h3>
              <p className="text-gray-600 text-xs">Online</p>
            </div>
          </div>

          <Link
            to="/main"
            className="bg-black text-white px-4 py-1 rounded-lg hover:bg-amber-500 duration-300 text-sm"
          >
            mainpage
          </Link>
        </div>

        {/* Chat Messages */}
        <div className="px-2 overflow-y-scroll h-[350px] sm:h-[450px]">
          {sakib.map((user, index) =>
            data?.uid === user?.senderId ? (
              <div key={index} className="mt-6 flex justify-end">
                <div>
                  <div className="relative mr-3">
                    <p className="py-2 px-3 bg-black text-white max-w-[250px] sm:max-w-[300px] rounded-lg text-left break-words">
                      {user?.msg}
                    </p>
                    <div className="absolute bottom-[-1px] right-[-5px]">
                      <BsFillTriangleFill className="text-black" />
                    </div>
                  </div>

                  <p className="text-xs text-black/30 text-right mr-3 mt-1">
                    {user?.time}
                  </p>
                </div>
              </div>
            ) : (
              <div key={index} className="mt-6">
                <div className="relative">
                  <div className="bg-gray-200 max-w-[250px] sm:max-w-[300px] rounded-lg px-3 py-2">
                    <p className="break-words text-left">{user?.msg}</p>
                  </div>
                  <div className="absolute bottom-[-1px] left-[-5px]">
                    <BsFillTriangleFill className="text-gray-200" />
                  </div>
                </div>
                <p className="text-xs text-black/30 mt-1">{user?.time}</p>
              </div>
            )
          )}
        </div>

        {/* Input Box */}
        <div className="relative mt-6 border-t border-black/20 pt-6 flex items-center">
        <div className="absolute md:bottom-[80px]  md:left-60 left-0 w-[50px] bottom-20">
                {
                  emoji && 
            <EmojiPicker onEmojiClick={hanldeEmoji}/>
                }
              </div>
          <input
            onChange={handleMassageSent}
            value={sent}
            className="bg-gray-100 outline-none w-full px-4 py-2 h-[45px] rounded-lg"
            placeholder="Type a message..."/>

          <span
          onClick={()=> setEmoji (!emoji)}
          className="absolute right-28 md:right-35 text-gray-500 text-xl cursor-pointer" >
            <MdEmojiEmotions />
          </span>
          <FaCamera className="absolute right-20 md:right-25 text-gray-500 text-xl cursor-pointer" />

          <button
            onClick={hanldeSentMassege}
            className="ml-4 bg-black text-white px-4 py-3 rounded-lg">
            <BsFillSendFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBer;

