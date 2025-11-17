import { ImExit } from "react-icons/im";
import { Link } from "react-router";

const Logout = () => {


  const handleLogout = ()=> {

    localStorage.removeItem("userInfo")
  }


  return (
    <div>
      <div className="text-center py-40 text-[50px]">
        <div className="flex justify-center cursor-pointer">
          <Link to = "/login"><ImExit onClick={handleLogout}/></Link>
        </div>
        <h1>Logout</h1>
        <button className="text-[20px] border px-10 py-2.5 rounded-full bg-black text-white">
          <Link to = "/main"><p>go mainpage</p></Link>
          </button>
      </div>
    </div>
  )
}

export default Logout