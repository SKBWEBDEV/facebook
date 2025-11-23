import { data, Link } from "react-router"
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import one from "../../assets/one.png";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const BlockUser = () => {

   const data = useSelector((state) => state.userInfo.value.user);

  const db = getDatabase();
  const blockRef = ref(db,"BlackList/")
  const [blockList,setBlockList] = useState ([])

  useEffect(()=> {
    onValue(blockRef,(snapshot)=> {
      let arr = []
      snapshot.forEach((item)=> {
        console.log( item.val());
        if (data.uid == item.val().blockerId) {
           arr.push(item.val())
        }
       
      })
      setBlockList(arr)
    })
  },[])
  console.log(blockList);


  

  const handleUnblock = (item)=> {
    remove(ref(db,"BlackList/"))
    console.log(item);
    
  }
  


  return (
    <div className="flex justify-center px-4 sm:px-6 md:px-10">
      <div className="mt-8 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white rounded-2xl shadow-md">
        <div className="py-4 px-4 sm:px-6 font-third">
          {/* Header */}
          <div className="flex items-center gap-2 sm:gap-5 font-bold text-base sm:text-lg md:text-xl mb-4">
            <Link to="/user">
              <FaArrowLeft className="text-lg sm:text-2xl" />
            </Link>
            <p>Block User</p>
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-2 sm:gap-4 mb-4">
            <input
              className="border outline-0 pl-3 sm:pl-5 pr-24 sm:pr-40 py-2 sm:py-2.5 md:py-3 rounded-full bg-black/5 font-bold w-full"
              type="text"
              placeholder="Search Friend's"
            />
            <FaSearch className="text-[#1E1E1E] text-lg sm:text-xl md:text-2xl" />
          </div>

          {/* Friend List */}
          <div className="px-2 overflow-y-auto max-h-[400px] sm:max-h-[455px]">

            {
              blockList.map((user)=> (
                 <div
                className="flex flex-row items-center sm:flex-row justify-between sm:items-center mt-4 border-b border-gray-300 pb-3">
                <div className="flex items-center gap-3 sm:gap-6 mb-2 sm:mb-0">
                  <img
                    src={one}
                    alt="#"
                    className="h-12 w-12 sm:h-14 sm:w-14 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-black">
                      {user.blockName}
                    </h3>
                  </div>
                </div>

                <div className=" sm:text-3xl md:text-[20px] font-bold cursor-pointer">
                  <button
                  onClick={()=>handleUnblock(user)}
                  className="bg-black text-white px-5 py-1 rounded-lg hover:bg-amber-500 duration-300 cursor-pointer">
                    unblock
                    </button>
                </div>
                
              </div>
              ))
            }
            
             
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlockUser