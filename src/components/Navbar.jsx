import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="bg-orange-500 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">
        JimJamBakery
      </h1>

      <div className="flex gap-4 items-center">
        <Link to="/customer">
          Menu
        </Link>

        <Link to="/cart">
          Cart
        </Link>

        <button
          onClick={logout}
          className="bg-white text-orange-500 px-4 py-1 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;