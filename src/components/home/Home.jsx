import facebook from "../../assets/facebook.png";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen px-4 sm:px-6">
      <div>
        <Link to="/sign">
          <img
            className="h-24 sm:h-32 md:h-40 w-auto mx-auto"
            src={facebook}
            alt="Facebook Logo"
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
