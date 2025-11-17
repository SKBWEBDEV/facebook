import one from "../../assets/one.png"
import { FaSearch  } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
const Friends = () => {


  
const db = getDatabase();
const friendRef = ref(db,"RequestAccept/")
const [friendList,setFriendList] = useState ([])

useEffect(()=> {
  onValue(friendRef,(snapshot)=> {
    let arr = []
    snapshot.forEach((item)=> {
      console.log(item.val());
      arr.push(item.val())
    })
    setFriendList(arr)
  })
},[])






  return (
    <div className="flex justify-center">
      
      
      <div
        className="  mt-[35px] w-[600px]  bg-white rounded-[20px] 
                shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] ">
        <div className="py-[13px] px-[20px] font-third ">

          <div className="flex gap-5 items-center font-bold">
            <Link to = "/user"><p><FaArrowLeft/></p></Link>
            <p>Your friends</p>
          </div>

          <div className="flex justify-between items-center mt-5">
              <input className="border outline-0 pl-5 pr-40 py-2.5 rounded-full bg-black/5 font-bold" type="text" placeholder="Search Friend's " />
            <span>
              <FaSearch  className="text-[#1E1E1E] font-bold text-[25px]" />
            </span>
          </div>

          <div className="px-2 overflow-y-scroll userlist h-[455px]">
          {
            friendList.map((user)=> (
               <div className="flex items-center justify-between mt-[17px] border-b-1 border-[#00000040] border-w-[100px] ">

            <div className="mb-[0px] flex items-center gap-6">
              <div className="mb-[10px]">
                <img src={one} alt="" />
              </div>
              <div>
                <h3 className="font-semibold text-[14px] text-[#000000]">
                  {user.senderName}
                </h3>
                <h6 className="text-[#4D4D4DBF] text-[12px] font-medium">
                  Today, 8:56pm
                </h6>
              </div>
            </div>


            
            <div className="flex gap-10">
              <div>
                <HiOutlineDotsHorizontal className="font-bold text-[35px]"/>
              </div>
            </div>

          </div>
            ))
          }
         </div>

         


        </div>
      </div>
    </div>
  );
};

export default Friends;
