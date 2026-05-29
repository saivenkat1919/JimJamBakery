import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import CustomerHome from "./pages/CustomerHome";
import OwnerDashboard from "./pages/OwnerDashboard";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/customer"
        element={
          <ProtectedRoute role="customer">
            <CustomerHome />
          </ProtectedRoute>
        }
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
        path="/cart"
        element={
          <ProtectedRoute role="customer">
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;