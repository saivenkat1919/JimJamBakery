import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Login from "./pages/Login";
import CustomerHome from "./pages/CustomerHome";
import OwnerDashboard from "./pages/OwnerDashboard";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import ProtectedRoute from "./routes/ProtectedRoute";
import ManageProducts from "./pages/ManageProducts";
import MyOrders from "./pages/MyOrders";
import Signup from "./pages/SignUp";
import MyProfile from "./pages/MyProfile";
import { FiUser } from "react-icons/fi";

function App() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <Routes>
      <Route
  path="/"
  element={
    user ? (
      <Navigate
        to={
          user.role === "owner"
            ? "/owner"
            : "/customer"
        }
      />
    ) : (
      <Login />
    )
  }
/>
      
      <Route
        path="/customer"
        element={
          <ProtectedRoute role="customer">
            <CustomerHome />
          </ProtectedRoute>
        }
      />

       <Route
  path="/signup"
  element={<Signup />}
/>

      <Route
        path="/owner"
        element={
          <ProtectedRoute role="owner">
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
  path="/profile"
  element={
    <ProtectedRoute role="customer">
      <MyProfile />
    </ProtectedRoute>
  }
/>

      <Route
        path="/cart"
        element={
          <ProtectedRoute role="customer">
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/products"
        element={
          <ProtectedRoute role="owner">
            <ManageProducts />
          </ProtectedRoute>
        }
      />

      <Route
  path="/my-orders"
  element={
    <ProtectedRoute role="customer">
      <MyOrders />
    </ProtectedRoute>
  }
/>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;