
import facebook from "../../assets/facebook.png"

import { Link } from "react-router"


const home = () => {
  return (
    <div>
      <div>
        <Link to = "/sign"><img  className="h-100" src={facebook} alt="" /></Link>
        
      </div>
    </div>
  )
}

export default home