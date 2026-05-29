import {
  Link,
  useNavigate,
} from "react-router-dom";

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
    <div className="bg-black text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        JimJamBakery Owner
      </h1>

      <div className="flex gap-4 items-center">
        <Link to="/owner">
          Orders
        </Link>

        <Link to="/owner/products">
          Products
        </Link>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default OwnerNavbar;