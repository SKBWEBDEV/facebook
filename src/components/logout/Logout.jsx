import { ImExit } from "react-icons/im";
import { Link } from "react-router";

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
  };

  return (
    <div className="flex justify-center px-4 sm:px-6 md:px-10">
      <div className="text-center py-20 sm:py-40">
        {/* Logout Icon */}
        <div className="flex justify-center mb-6 cursor-pointer">
          <Link to="/login">
            <ImExit
              onClick={handleLogout}
              className="text-5xl sm:text-6xl md:text-7xl text-black"
            />
          </Link>
        </div>

        {/* Logout Text */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Logout</h1>

        {/* Go Main Page Button */}
        <Link to="/main">
          <button className="text-base sm:text-lg md:text-xl border px-6 sm:px-10 py-2 sm:py-3 rounded-full bg-black text-white hover:bg-gray-800 transition">
            Go Mainpage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Logout;
