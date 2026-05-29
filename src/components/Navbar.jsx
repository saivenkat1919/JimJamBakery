import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-orange-500 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">
        JimJamBakery
      </h1>

      <div className="flex gap-4">
        <Link to="/customer">
          Menu
        </Link>

        <Link to="/cart">
          Cart
        </Link>
      </div>
    </div>
  );
}

export default Navbar;