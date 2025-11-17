import one from "../../assets/one.png";
import { Link } from "react-router";
import { MdArrowBackIosNew } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
// import { useSelector } from "react-redux";
import { getDatabase, ref, onValue, push, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const UserList = () => {

  const data = useSelector((state)=> state.userInfo.value.user)
  console.log(data);

  const db = getDatabase();
  const requestRef = ref(db,"FriendRequest/")
  const [requestList,setRequestList] = useState ([])

  useEffect(()=> {
    onValue(requestRef,(snapshot)=> {
      let arr = []
      snapshot.forEach((item)=> {
        console.log(item);
        if (data.uid == item.val().reciverId) {
           arr.push(item.val())
        }
       
      })
      setRequestList(arr)
    })
  },[])


  const confromRequest = (item)=> {
    console.log(item,'uiktd');
    
    push(ref(db,"RequestAccept/"),{
      reciverName:item.reciverName,
      reciverId:item.reciverId,
      senderName:item.senderName,
      senderId:item.senderId
    })
    remove(ref(db,"FriendRequest/"))
  }

  
  return (
    <div>
     

       <div className="flex items-center justify-center py-3 gap-5">
        <Link to= "/main"><p className="font-bold text-[30px]"><MdArrowBackIosNew/></p></Link>
        <h3 className="font-bold text-[30px]">Friends</h3>
       </div>

       <div className="flex justify-center gap-10 py-10 items-center">
       <Link to = "/suggestion"><h2 className="bg-black/20 px-14 py-2.5 rounded-full font-bold">Suggestions</h2></Link>        
       <Link to = "/friends"><h1 className="bg-black/20 px-14 py-2.5 rounded-full font-bold">your friend</h1></Link>
       </div>
{/* ---------------------------------------------------friends------------------------------------------------------- */}

       <div className="flex justify-center">
        <div
                className="  mt-[35px] w-[600px]  bg-white rounded-[20px] 
                              shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] ">
                <div className="py-[13px] px-[20px] font-third ">
        
        
                  <div className="flex justify-between mt-5">
                    <p className="text-[20px] font-semibold">People your know may</p>
                    <span>
                      <BsThreeDotsVertical className="text-[#1E1E1E] font-bold" />
                    </span>
                  </div>

                   <div className="px-2 overflow-y-scroll userlist h-[455px]">
                  {
                    requestList.map((user)=> (
                      <div
                    className="flex mt-2.5 items-center justify-between border-b-1 border-[#00000040] 
                                  border-w-[100px] ">
        
        
                    <div className="mb-[0px] flex items-center gap-6">
                      <div className="mb-[10px]">
                        <img src={one} alt="" />
                        
                      </div>
                      <div>
                        <h3 className="font-semibold text-[14px] text-[#000000]">
                          {user.senderName}
                        </h3>
                        {/* <h6 className="text-[#4D4D4DBF] text-[12px] font-medium">
                          Today, 8:56pm
                        </h6> */}
                      </div>
                    </div>
        
        
        
                    <div className="flex gap-10">
                      <div>
                        <button 
                        onClick={()=>confromRequest(user)}
                        className=" cursor-pointer py-2.5 px-14 rounded-2xl bg-[#0866FF] text-white font-semibold">
                          Confrom
                        </button>
                      </div>
                      <div>
                        <button className=" px-14 rounded-2xl py-2.5 bg-black/10 font-semibold cursor-pointer ">
                          Delete
                        </button>
                      </div>
                    </div>
        
        
                  </div>

                    ))
                  }
                 </div>
        
        
                  


                </div>
              </div>
       </div>





    </div>
  )
}

export default UserList