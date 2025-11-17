import one from "../../assets/one.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";
import { getDatabase, ref, onValue, push } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Suggestions = () => {

  const data = useSelector((state)=> state.userInfo.value.user)
  console.log(data);
  

  const db = getDatabase();
  const userRef = ref(db, "users/");
  const [list, setList] = useState([]);

  useEffect(() => {
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log(item.val());
        console.log(item.key);
        
        if (data.uid !== item.key) {
          arr.push({...item.val(),userid: item.key});
        }
        
      });
      setList(arr);
    });
  }, []);


 const friendRequest = (item)=> {
    console.log(item,'item');
     push(ref(db, 'FriendRequest/'), {
      senderName : data?.displayName,
      senderId: data.uid,
      reciverName : item.username,
      reciverId:item.userid
  });
  }


  const [sentRequest,setSentRequest] = useState ([])

  useEffect(()=> {
    const sentRef = ref(db,"FriendRequest/")
    onValue(sentRef,(snapshot)=> {``
      let arr = []
      snapshot.forEach((item)=> {
        arr.push(item.val().senderId+item.val().reciverId);
      })
      setSentRequest(arr)
    })
  },[])
  console.log(sentRequest);




  const [friend,setFriend] = useState ([])

  useEffect(()=> {
    const sentRef = ref(db,"RequestAccept/")
    onValue(sentRef,(snapshot)=> {``
      let arr = []
      snapshot.forEach((item)=> {
        arr.push(item.val().senderId+item.val().reciverId);
      })
      setFriend(arr)
    })
  },[])
  console.log(friend);
  




  return (
    <div className="flex justify-center">
      <div
        className=" overflow-y-scroll mt-[35px] w-[700px]  bg-white rounded-[20px] 
                      shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] "
      >
        <div className="py-[13px] px-[20px] font-third ">
          <div>
            <div className="flex gap-5 items-center font-bold">
              <Link to="/user">
                <p>
                  <FaArrowLeft />
                </p>
              </Link>
              <p>Suggestion</p>
            </div>

            <div className="flex justify-between">
              <p className="text-[20px] font-semibold">People your know may</p>
              <span>
                <BsThreeDotsVertical className="text-[#1E1E1E] font-bold" />
              </span>
            </div>
          </div>

          <div className="px-2 overflow-y-scroll userlist h-[455px]">
            {list.map((user) => (
              <div className=" flex items-center justify-between mt-[17px] border-b-1 border-[#00000040] border-w-[100px] ">
                <div className="mb-[0px] flex items-center gap-6">
                  <div className="mb-[10px]">
                    <img src={one} alt="" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[14px] text-[#000000]">
                      {user.username}
                    </h3>
                  </div>
                </div>

               {

                friend.includes(data.uid+user.userid) || friend.includes(user.userid+data.uid) ?

                  <div className="flex gap-10">
                  <div>
                    <button
                      className=" cursor-pointer py-2.5 px-10 rounded-2xl bg-[#0866FF] text-white font-semibold">
                      Friend
                    </button>
                  </div>
                  <div>
                    {/* <button className=" px-14 rounded-2xl py-2.5 bg-black/10 font-semibold cursor-pointer ">
                      remove
                    </button> */}
                  </div>
                </div> :
                sentRequest.includes(data.uid+user.userid) || sentRequest.includes(user.userid+data.uid) ?
                 <div className="flex gap-10">
                  <div>
                    <button
                      className=" cursor-pointer py-2.5 px-10 rounded-2xl bg-[#0866FF] text-white font-semibold">
                      sent Request
                    </button>
                  </div>
                  <div>
                    <button className=" px-14 rounded-2xl py-2.5 bg-black/10 font-semibold cursor-pointer ">
                      remove
                    </button>
                  </div>
                </div> : <div className="flex gap-10">
                  <div>
                    <button
                      onClick={()=> friendRequest (user)}
                      className=" cursor-pointer py-2.5 px-10 rounded-2xl bg-[#0866FF] text-white font-semibold">
                      Add friend
                    </button>
                  </div>
                  <div>
                    <button className=" px-14 rounded-2xl py-2.5 bg-black/10 font-semibold cursor-pointer ">
                      remove
                    </button>
                  </div>
                </div>
               }



                


              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
