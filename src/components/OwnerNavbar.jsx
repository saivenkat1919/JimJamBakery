import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FiLogOut,
  FiBox,
  FiClipboard,
} from "react-icons/fi";

import { signOut } from "firebase/auth";

import { auth } from "../firebase/config";

function OwnerNavbar() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);

    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="bg-black text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center">
        <h1 className="text-xl font-bold">
          JimJamBakery Owner
        </h1>

        <div className="flex flex-wrap items-center gap-3 md:gap-5">
          <Link
            to="/owner"
            className="flex items-center gap-1"
          >
            <FiClipboard />
            Orders
          </Link>

          <Link
            to="/owner/products"
            className="flex items-center gap-1"
          >
            <FiBox />
            Products
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded-lg flex items-center gap-1"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default OwnerNavbar;