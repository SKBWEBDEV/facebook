import facebook from "../../assets/facebook.png";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="text-center">
        <Link to="/sign">
          <img
            className="h-24 sm:h-32 md:h-64 lg:h-72 w-auto mx-auto"
            src={facebook}
            alt="Facebook Logo"
          />
          <p className="font-bold text-3xl sm:text-4xl md:text-5xl mt-4">
            facebook
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
