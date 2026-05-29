import { useNavigate } from "react-router-dom";

function OwnerNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="bg-black text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">
        JimJamBakery Owner
      </h1>

      <button
        onClick={logout}
        className="bg-red-500 px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}

export default OwnerNavbar;