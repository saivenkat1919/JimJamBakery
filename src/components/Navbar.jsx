import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FiShoppingCart,
  FiLogOut,
  FiClipboard,
} from "react-icons/fi";

import { signOut } from "firebase/auth";

import { auth } from "../firebase/config";

function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);

    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="bg-orange-500 text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-lg md:text-2xl font-bold">
          JimJamBakery
        </h1>

        <div className="flex items-center gap-3 md:gap-6">
          <Link
            to="/customer"
            className="text-sm md:text-base"
          >
            Menu
          </Link>

          <Link
  to="/my-orders"
  className="flex items-center gap-1 text-sm md:text-base"
>
  <FiClipboard />
  Orders
</Link>

          <Link
            to="/cart"
            className="flex items-center gap-1 text-sm md:text-base"
          >
            <FiShoppingCart />
            Cart
          </Link>

          <button
            onClick={logout}
            className="bg-white text-orange-500 px-3 py-1 rounded-lg flex items-center gap-1 text-sm md:text-base"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;