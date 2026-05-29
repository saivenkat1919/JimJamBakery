import { useEffect, useState } from "react";

import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/config";

import OwnerNavbar from "../components/OwnerNavbar";
import OrderCard from "../components/OrderCard";

function OwnerDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <OwnerNavbar />

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6">
          Orders Dashboard
        </h1>

        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnerDashboard;